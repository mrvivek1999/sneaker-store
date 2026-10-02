from django.contrib import admin

from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('price_at_purchase',)


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'full_name', 'email', 'total', 'status', 'created_at')
    list_filter = ('status', 'country', 'created_at')
    search_fields = ('email', 'full_name', 'stripe_session_id', 'id')
    readonly_fields = ('stripe_session_id', 'created_at')
    inlines = [OrderItemInline]
