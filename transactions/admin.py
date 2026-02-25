from django.contrib import admin

from .models import Transaction


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ("user", "transaction_type", "category", "amount", "date", "created_at")
    list_filter = ("transaction_type", "category", "date")
    search_fields = ("user__username", "description")
    ordering = ("-date", "-created_at")