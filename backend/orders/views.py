from decimal import Decimal

import stripe
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from products.models import Product

from .models import Order, OrderItem
from .serializers import CheckoutSessionSerializer


@api_view(['POST'])
def create_checkout_session(request):
    serializer = CheckoutSessionSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    data = serializer.validated_data

    slugs = [item['slug'] for item in data['items']]
    products = {p.slug: p for p in Product.objects.filter(slug__in=slugs)}

    missing = [s for s in slugs if s not in products]
    if missing:
        return Response(
            {'detail': f'Unknown products: {missing}'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    total = Decimal('0')
    line_items = []
    order_items_data = []
    for item in data['items']:
        product = products[item['slug']]
        qty = item['quantity']
        total += product.price * qty
        order_items_data.append((product, qty))
        line_items.append({
            'price_data': {
                'currency': 'usd',
                'unit_amount': int(product.price * 100),
                'product_data': {
                    'name': product.name,
                    'images': [product.image_url],
                },
            },
            'quantity': qty,
        })

    customer = data['customer']
    order = Order.objects.create(total=total, **customer)
    for product, qty in order_items_data:
        OrderItem.objects.create(
            order=order,
            product=product,
            quantity=qty,
            price_at_purchase=product.price,
        )

    if not settings.STRIPE_SECRET_KEY:
        return Response(
            {
                'url': f'{settings.FRONTEND_URL}/checkout/success?order_id={order.id}&demo=1',
                'order_id': str(order.id),
                'demo_mode': True,
                'detail': 'Stripe key not configured — returning demo success URL.',
            }
        )

    stripe.api_key = settings.STRIPE_SECRET_KEY
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            mode='payment',
            line_items=line_items,
            customer_email=customer['email'],
            success_url=f'{settings.FRONTEND_URL}/checkout/success?session_id={{CHECKOUT_SESSION_ID}}',
            cancel_url=f'{settings.FRONTEND_URL}/cart',
            metadata={'order_id': str(order.id)},
        )
    except stripe.error.StripeError as exc:
        return Response(
            {'detail': str(exc)},
            status=status.HTTP_400_BAD_REQUEST,
        )

    order.stripe_session_id = session.id
    order.save(update_fields=['stripe_session_id'])

    return Response({'url': session.url, 'order_id': str(order.id)})


@csrf_exempt
@api_view(['POST'])
def stripe_webhook(request):
    if not settings.STRIPE_WEBHOOK_SECRET:
        return Response(
            {'detail': 'Webhook secret not configured.'},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )

    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE', '')

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except (ValueError, stripe.error.SignatureVerificationError):
        return Response({'detail': 'Invalid signature.'},
                        status=status.HTTP_400_BAD_REQUEST)

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        order_id = (session.get('metadata') or {}).get('order_id')
        if order_id:
            Order.objects.filter(id=order_id).update(status='paid')

    return Response({'received': True})
