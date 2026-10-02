from rest_framework import serializers

from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    discount_percent = serializers.SerializerMethodField()
    gallery = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 'price', 'compare_at_price',
            'category', 'brand', 'image_url', 'gallery', 'stock',
            'is_featured', 'rating', 'review_count', 'discount_percent',
            'created_at',
        ]

    def get_discount_percent(self, obj):
        if obj.compare_at_price and obj.compare_at_price > obj.price:
            return int(round((1 - float(obj.price) / float(obj.compare_at_price)) * 100))
        return 0

    def get_gallery(self, obj):
        base = obj.image_url.split('?')[0]
        return [
            f'{base}?auto=format&fit=crop&w=1200&q=80',
            f'{base}?auto=format&fit=crop&w=1000&q=80',
            f'{base}?auto=format&fit=crop&w=900&q=80',
        ]
