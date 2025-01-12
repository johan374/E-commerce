// Import necessary dependencies from React
import React, { useState, useEffect } from 'react';  
// Import icon components from lucide-react library
import { ShoppingCart, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
// Import custom API service for products
import { productAPI } from '../../api/products'; 

function FeaturedProducts() {
    // State for storing the list of featured products
    const [featuredProducts, setFeaturedProducts] = useState([]);
    // State for tracking loading status
    const [isLoading, setIsLoading] = useState(true);
    // State for storing any error messages
    const [error, setError] = useState(null);
    // State for tracking current image index in product galleries
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    // Have an object tracking indices for each product
    const [productImageIndices, setProductImageIndices] = useState({});

    // useEffect hook to fetch data when component mounts
    useEffect(() => {
        // Async function to fetch featured products
        const fetchFeaturedProducts = async () => {
            try {
                // Set loading state to true before fetching
                setIsLoading(true);
                // Make API call to get featured products
                const response = await productAPI.getFeaturedProducts();
                // Debug logs to understand API response structure
                console.log('Full API Response:', response);
                console.log('Response Type:', typeof response);
                console.log('Response Data:', response.data);

                // Initialize an empty array to store product data that can be modified
                // This variable needs to be 'let' because it will be reassigned based on the API response structure
                // We initialize it as an empty array so we have a valid fallback if none of the if conditions match
                let productsData = [];
                
                // Handle different possible response structures
                if (Array.isArray(response)) {
                    // Case 1: API returns data directly as an array
                    // Example: [{ id: 1, name: "Product 1" }, { id: 2, name: "Product 2" }]
                    productsData = response;
                } 
                else if (Array.isArray(response.data)) {
                    // Case 2: API returns data in a .data property
                    // Example: { data: [{ id: 1, name: "Product 1" }, { id: 2, name: "Product 2" }] }
                    productsData = response.data;
                } 
                else if (response.data && Array.isArray(response.data.data)) {
                    // Case 3: API returns data nested deeper (common in some APIs like Axios)
                    // Example: { data: { data: [{ id: 1, name: "Product 1" }, { id: 2, name: "Product 2" }] } }
                    productsData = response.data.data;
                } else {
                    // Throw error if response structure is unexpected
                    console.error('Unexpected response structure:', response);
                    throw new Error('Unable to parse product data');
                }

                // Process products to ensure each has an image property
                const processedProducts = productsData.map(product => ({
                    ...product,  // Spread operator: copies all existing properties id, name, price, category, image_url, from the product object
                    image: product.image_url || "/path/to/default/image.png"  // Use image_url if exists, otherwise use default
                }));
                
                // Update state with processed products
                setFeaturedProducts(processedProducts);
                setIsLoading(false);
            } catch (error) {
                // Handle any errors that occur during fetch
                console.error('Error fetching featured products:', error);
                setError('Failed to load featured products');
                setIsLoading(false);
            }
        };
        
        // Execute the fetch function
        fetchFeaturedProducts();
    }, []); // Empty dependency array means this runs once on mount
    
    // Show loading state while data is being fetched
    if (isLoading) {
        return (
            <div className="relative bg-gray-900 flex justify-center items-center h-96">
                <p className="text-white">Loading featured products...</p>
            </div>
        );
    }
    
    // Show error state if something went wrong
    if (error) {
        return (
            <div className="relative bg-gray-900 flex justify-center items-center h-96">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }
    
    // Helper function to render star ratings
    const renderRating = (rating) => {
        return (
            <div className="flex items-center">
                {/* Create array of 5 elements for stars */}
                {[...Array(5)].map((_, index) => (
                    <svg
                        key={index}
                        className={`w-4 h-4 ${
                            // Color stars based on rating value
                            index < Math.floor(rating)
                                ? "text-yellow-400"  // Filled star
                                : "text-gray-300"    // Empty star
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        {/* SVG path for star shape */}
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
                {/* Display numerical rating */}
                <span className="ml-2 text-gray-400">({rating})</span>
            </div>
        );
    };

    return (
        // Main container with dark background
        <div className="relative bg-gray-900">
            {/* Gradient overlay background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-75" />
            
            {/* Content container with responsive padding and max width */}
            <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                {/* Header section */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">
                        Featured Products
                    </h2>
                    <p className="mt-4 text-lg text-gray-300">
                        Discover our most popular and trending items
                    </p>
                </div>
    
                {/* Products grid - responsive columns: 1 on mobile, 2 on tablet, 4 on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                   {/* Products grid - this maps over ALL products */}
                   {featuredProducts.map((product) => {
                    // Get this product's current image index (or 0 if not set)
                    const currentIndex = productImageIndices[product.id] || 0;
                    
                    const allImages = [
                        { 
                            image_url: product.image,
                            alt_text: product.name
                        },
                        ...(product.additional_images || [])
                    ];
                    
                    // Function to update just this product's index
                    const updateIndex = (newIndex) => {
                        setProductImageIndices(prev => ({
                            ...prev,
                            [product.id]: newIndex
                        }));
                    };
                    
                    return (
                        <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
                            <div className="relative w-full h-64">
                                <img
                                    // Use currentIndex instead of currentImageIndex
                                    src={allImages[currentIndex]?.image_url}
                                    alt={allImages[currentIndex]?.alt_text}
                                    className="w-full h-full object-contain object-center"
                                />
                            
                                {allImages.length > 1 && (
                                    <>
                                        <button 
                                            onClick={() => {
                                                updateIndex(
                                                    currentIndex === 0 ? 
                                                    allImages.length - 1 : 
                                                    currentIndex - 1
                                                );
                                            }} 
                                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>

                                        <button 
                                            onClick={() => {
                                                updateIndex(
                                                    currentIndex === allImages.length - 1 ? 
                                                    0 : 
                                                    currentIndex + 1
                                                );
                                            }} 
                                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </button>

                                        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                                            {/* Use currentIndex instead of currentImageIndex */}
                                            {currentIndex + 1} / {allImages.length}
                                        </div>
                                    </>
                                )}

                                {/* Rest of the code remains the same */}
                                <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
                                    <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                                </button>
                            </div>

                            {/* Product details section stays exactly the same */}
                            <div className="p-6">
                                <div className="text-sm text-blue-600 font-semibold mb-2">
                                    {product.category}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {product.name}
                                </h3>
                                {renderRating(product.rating)}
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-2xl font-bold text-gray-900">
                                        ${product.price}
                                    </span>
                                    <button className="flex items-center justify-center p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                                        <ShoppingCart className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}

                </div>
    
                {/* View all products button */}
                <div className="mt-12 text-center">
                    <button className="bg-white text-gray-900 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-all transform hover:scale-105">
                        View All Products
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FeaturedProducts;