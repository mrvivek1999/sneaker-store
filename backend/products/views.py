from django.db.models import Q
from rest_framework import generics

from .models import Product
from .serializers import ProductSerializer


class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        qs = Product.objects.all()
        params = self.request.query_params
        category = params.get('category')
        featured = params.get('featured')
        search = params.get('search')

        if category:
            qs = qs.filter(category=category)
        if featured and featured.lower() in ('1', 'true', 'yes'):
            qs = qs.filter(is_featured=True)
        if search:
            qs = qs.filter(
                Q(name__icontains=search)
                | Q(brand__icontains=search)
                | Q(description__icontains=search)
            )
        return qs


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'slug'
