from rest_framework import serializers

from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_image = serializers.CharField(source='product.image_url', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'product_image',
                  'quantity', 'price_at_purchase']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'email', 'full_name', 'address', 'city', 'country',
            'postal_code', 'total', 'status', 'items', 'created_at',
        ]


class CheckoutItemSerializer(serializers.Serializer):
    slug = serializers.SlugField()
    quantity = serializers.IntegerField(min_value=1)


class CustomerSerializer(serializers.Serializer):
    email = serializers.EmailField()
    full_name = serializers.CharField(max_length=160)
    address = serializers.CharField(max_length=255)
    city = serializers.CharField(max_length=120)
    country = serializers.CharField(max_length=120)
    postal_code = serializers.CharField(max_length=30)


class CheckoutSessionSerializer(serializers.Serializer):
    items = CheckoutItemSerializer(many=True)
    customer = CustomerSerializer()
