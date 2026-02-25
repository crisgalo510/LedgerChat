from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),

    # Login for the DRF browsable API
    path("api-auth/", include("rest_framework.urls")),

    # Your API
    path("api/", include("transactions.urls")),
]