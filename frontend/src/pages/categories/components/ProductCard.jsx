// Importing necessary React hooks and dependencies
import React, { useState } from 'react';
// Importing icons from Lucide React library
import { Heart, ShoppingCart } from 'lucide-react';
// Importing custom components and context
import ProductRating from './ProductRating';
import ImageCarousel from './ImageCarousel';
import ProductDetailModal from './ProductDetailModal';
import { useCart } from '../../../context/CartContext';

const ProductCard = ({ 
    product,           // The product object containing all product details
    currentImageIndex, // Current index of the displayed image in the carousel
    onUpdateImageIndex // Callback to update the image index
}) => {
    // Destructure addItem method from the cart context hook
    const { addItem } = useCart();

    // State to control the visibility of the product detail modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handler for adding the product to the cart
    const handleAddToCart = (e) => {
        e.stopPropagation(); // Prevent the modal from opening when clicking the cart button
        addItem(product);     // Add the product to the cart using the cart context
    };

    // Prepare an array of images for the carousel
    const allImages = [
        // Primary product image
        {
            image_url: product.image_url,
            alt_text: product.name
        },
        // Additional images (if any)
        ...(product.additional_images?.map(img => ({
            image_url: img, // Use the image path directly
            alt_text: `${product.name} additional view`
        })) || []) // Fallback to an empty array if no additional images
    ];

    return (
        <>
            {/* Main product card container */}
            <div 
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 cursor-pointer"
                onClick={() => setIsModalOpen(true)} // Open modal when card is clicked
            >
                {/* Product image section */}
                <div className="relative">
                    {/* Image Carousel component */}
                    <ImageCarousel
                        images={allImages}
                        currentIndex={currentImageIndex}
                        onUpdateIndex={(index) => {
                            onUpdateImageIndex(index);
                            // Stop propagation to prevent modal from opening when changing images
                            event.stopPropagation();
                        }}
                    />

                    {/* Wishlist/Favorite button */}
                    <button
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent modal from opening when clicking the heart button
                            // Placeholder for future wishlist functionality
                        }}
                    >
                        <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                    </button>
                </div>

                {/* Product details section */}
                <div className="p-6">
                    {/* Product category */}
                    <div className="text-sm text-blue-600 font-semibold mb-2">
                        {product.category}
                    </div>

                    {/* Product name */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {product.name}
                    </h3>

                    {/* Product rating component */}
                    <ProductRating rating={product.rating} />

                    {/* Price and Add to Cart section */}
                    <div className="mt-4 flex items-center justify-between">
                        {/* Product price */}
                        <span className="text-2xl font-bold text-gray-900">
                            ${product.price}
                        </span>

                        {/* Add to Cart button */}
                        <button
                            onClick={handleAddToCart}
                            className="flex items-center justify-center p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                        >
                            <ShoppingCart className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Detail Modal */}
            <ProductDetailModal
                product={product}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                currentImageIndex={currentImageIndex}
                onUpdateImageIndex={onUpdateImageIndex}
            />
        </>
    );
};

export default ProductCard;