from rest_framework import generics, permissions, filters, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import Product
from .serializers import ProductSerializer
import traceback
import logging
from .pagination import StandardResultsSetPagination

# Set up logging for the module
logger = logging.getLogger(__name__)

# View for featured products - uses basic APIView as it has custom logic
class FeaturedProductsView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        try:
            # Add more detailed logging
            featured_products = Product.objects.filter(is_featured=True).order_by('-rating')
            
            # Print out detailed information about featured products
            print("Number of featured products:", featured_products.count())
            for product in featured_products:
                print(f"Product: {product.name}, Featured: {product.is_featured}, Image: {product.image}")
            
            serializer = ProductSerializer(
                featured_products, 
                many=True, 
                context={'request': request}
            )
            
            return Response({
                'status': 'success',
                'count': featured_products.count(),
                'data': serializer.data
            })
        except Exception as e:
            print(f"Error in featured products view: {e}")
            return Response({
                'status': 'error',
                'message': 'Unable to retrieve featured products',
                'detail': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Main product listing view with filtering and pagination
class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = StandardResultsSetPagination  # Use custom pagination
    
    # Set up filtering, searching, and ordering capabilities
    filter_backends = [
        DjangoFilterBackend,      # For exact matching filters
        filters.SearchFilter,      # For text search
        filters.OrderingFilter    # For sorting
    ]
    
    # Define fields for filtering and searching
    filterset_fields = ['category', 'is_featured']  # Fields for exact matching
    search_fields = ['name', 'description', 'short_description']  # Fields for text search
    ordering_fields = ['price', 'rating', 'created_at']  # Fields that can be sorted
    
    def get_queryset(self):
        queryset = Product.objects.all()
        # Get price range parameters from query string
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        
        # Apply price range filters if provided
        if min_price:
            queryset = queryset.filter(price__gte=min_price)  # Greater than or equal to
        if max_price:
            queryset = queryset.filter(price__lte=max_price)  # Less than or equal to
        
        return queryset

# Detail view for single product
class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    
    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()  # Get the product instance
            serializer = self.get_serializer(instance, context={'request': request})
            return Response(serializer.data)
        except Product.DoesNotExist:
            # Log warning if product not found
            logger.warning(f"Product not found with pk: {kwargs.get('pk')}")
            return Response({
                'error': 'Product not found'
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            # Log error for any other exceptions
            logger.error(f"Error in ProductDetailView: {traceback.format_exc()}")
            return Response({
                'error': 'Unable to retrieve product details',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Advanced search view with multiple filters
class ProductSearchView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = StandardResultsSetPagination
    
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description', 'short_description', 'category']
    ordering_fields = ['price', 'rating', 'created_at']
    
    def get_queryset(self):
        queryset = Product.objects.all()
        
        # Get search query parameter
        query = self.request.query_params.get('q', None)
        if query:
            # Search across multiple fields using Q objects for OR conditions
            queryset = queryset.filter(
                Q(name__icontains=query) | 
                Q(description__icontains=query) | 
                Q(short_description__icontains=query)
            )
        
        # Apply price range filters
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        
        # Apply category filter
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)
        
        return queryset