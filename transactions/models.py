from django.db import models
from django.contrib.auth.models import User


class Transaction(models.Model):
    """
    Represents a single financial transaction belonging to a user.
    Can be either an income or an expense, categorized for analysis.
    """

    CATEGORY_CHOICES = [
        ("income", "Income"),
        ("housing", "Housing"),
        ("food", "Food"),
        ("transport", "Transport"),
        ("entertainment", "Entertainment"),
        ("savings", "Savings"),
        ("investment", "Investment"),
        ("other", "Other"),
    ]

    TYPE_CHOICES = [
        ("income", "Income"),
        ("expense", "Expense"),
    ]

    # The user this transaction belongs to.
    # If the user is deleted, all their transactions are deleted too.
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="transactions",
    )

    # Core transaction fields
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    transaction_type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    description = models.CharField(max_length=255, blank=True, default="")
    date = models.DateField()

    # Automatically set when the transaction is first created. Never edited.
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-date"]  # Most recent transactions appear first

    def __str__(self):
        return f"{self.user.username} | {self.category} | ${self.amount} on {self.date}"