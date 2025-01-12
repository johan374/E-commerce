from django.urls import path
from .views import (
    FeaturedProductsView,
    ProductListView,
    ProductDetailView,
    ProductSearchView
)

urlpatterns = [
    # Featured products endpoint
    path('featured/', FeaturedProductsView.as_view(), name='featured-products'),
    
    # Main product list endpoint
    path('', ProductListView.as_view(), name='product-list'),
    
    # Product search endpoint
    path('search/', ProductSearchView.as_view(), name='product-search'),
    
    # Individual product detail endpoint
    path('<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
]