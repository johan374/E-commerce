from rest_framework import serializers
from .models import Product, ProductImage

# Serializer for handling product images
class ProductImageSerializer(serializers.ModelSerializer):
    # Custom field that generates a full URL for the image
    # SerializerMethodField allows us to define custom logic for the field
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage  # Specifies which model to serialize
        fields = ['id', 'image_url', 'is_primary', 'alt_text']  # Fields to include in serialization

    # Custom method to generate the full image URL
    def get_image_url(self, obj):  # obj is the ProductImage instance
        try:
            # Get the request object from serializer context
            request = self.context.get('request')
            # Build absolute URI if request exists and image is present
            return request.build_absolute_uri(obj.image.url) if request and obj.image else None
        except Exception as e:
            print(f"Error getting image URL for product image {obj.id}: {e}")
            return None

# Main product serializer
class ProductSerializer(serializers.ModelSerializer):
    # Custom fields that require special handling
    image_url = serializers.SerializerMethodField()  # For main product image
    additional_images = serializers.SerializerMethodField()  # For additional product images
    is_in_stock = serializers.SerializerMethodField()  # For stock status

    class Meta:
        model = Product  # Specifies the Product model for serialization
        fields = [
            # All fields that should be included in the API response
            'id', 'name',              # Basic product identification
            'category',                # Product categorization
            'price',                   # Product pricing
            'description',             # Full product description
            'short_description',       # Brief product description
            'meta_description',        # SEO description
            'image_url',              # Main product image URL
            'additional_images',       # Additional product images
            'rating',                 # Product rating
            'is_featured',            # Featured status
            'created_at',             # Creation timestamp
            'updated_at',             # Last update timestamp
            'is_in_stock'             # Stock availability
        ]

    # Method to get the main product image URL
    def get_image_url(self, obj):  # obj is the Product instance
        try:
            if obj.image:
                request = self.context.get('request')
                # Generate full URL including domain
                return request.build_absolute_uri(obj.image.url) if request else None
            return None
        except Exception as e:
            print(f"Error getting image URL for product {obj.id}: {e}")
            return None

    # Method to get all additional product images
    def get_additional_images(self, obj):
        try:
            # Get all additional images for the product
            additional_images = obj.images.all()  # Use 'images' instead of get_additional_images()
            # Serialize them using ProductImageSerializer
            serializer = ProductImageSerializer(
                additional_images, 
                many=True,  # Indicates we're serializing multiple objects
                context=self.context  # Pass the context (contains request object)
            )
            return serializer.data
        except Exception as e:
            print(f"Error getting additional images for product {obj.id}: {e}")
            return []

    # Method to check product stock status
    def get_is_in_stock(self, obj):
        try:
            return obj.is_in_stock()  # Calls the model method to check stock
        except Exception as e:
            print(f"Error checking stock for product {obj.id}: {e}")
            return False