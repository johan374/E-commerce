// Import core React library and its hooks (useState for state management, useEffect for side effects)
import React, { useState, useEffect} from 'react';
// Import the product API service for fetching product data
import { productAPI } from '../../api/products';
// Import the ProductCard component that will display individual products
import ProductCard from '../../pages/categories/components/ProductCard';
// Import Link component from React Router for navigation
import { Link } from 'react-router-dom';

// Define the FeaturedProducts component
const FeaturedProducts = () => {
    // State Declarations using useState hook:
    // State to store the list of featured products
    const [featuredProducts, setFeaturedProducts] = useState([]);
    // State to track loading status
    const [isLoading, setIsLoading] = useState(true);
    // State to store any error messages
    const [error, setError] = useState(null);
    // State to track current image index for each product's gallery
    const [productImageIndices, setProductImageIndices] = useState({});

    // useEffect hook to fetch data when component mounts
    useEffect(() => {
        // Define async function to fetch featured products
        const fetchFeaturedProducts = async () => {
            try {
                // Set loading state to true before fetching
                setIsLoading(true);
                // Make API call to get featured products
                const response = await productAPI.getFeaturedProducts();
                // Extract products data from response, handling different possible response structures
                const productsData = response.data.data?.results || response.data.results || response.data;
                
                // First, verify that productsData is actually an array before processing
                if (Array.isArray(productsData)) {
                    // Create a new array by spreading productsData into it
                    // We do this to avoid mutating the original array
                    // [...productsData] creates a shallow copy of the array
                    const shuffled = [...productsData];

                    // FISHER-YATES SHUFFLE ALGORITHM
                    // This is a well-known algorithm that gives an unbiased shuffle
                    // It works by going backwards through the array and swapping each element
                    // with a random element that comes before it (including itself)
                    for (let i = shuffled.length - 1; i > 0; i--) {
                        // For each position i, generate a random index j that's between 0 and i (inclusive)
                        // Math.random() generates a number between 0 and 1
                        // Multiply by (i + 1) to get a number between 0 and i
                        // Math.floor() rounds down to the nearest integer
                        const j = Math.floor(Math.random() * (i + 1));

                        // Swap elements at positions i and j using array destructuring
                        // This is equivalent to:
                        // let temp = shuffled[i];
                        // shuffled[i] = shuffled[j];
                        // shuffled[j] = temp;
                        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                    }

                    // After shuffling, take only the first 12 products
                    // slice(0, 12) returns a new array with elements from index 0 to 11
                    // This ensures we display a consistent number of featured products
                    const randomProducts = shuffled.slice(0, 12);

                    // Process each product in the randomProducts array using map()
                    // This ensures each product has a valid image_url
                    const processedProducts = randomProducts.map(product => ({
                        // ...product spreads all existing properties of the product object
                        // This copies over all current properties like id, name, price, etc.
                        ...product,

                        // Set image_url to either:
                        // - The existing image_url if it exists, OR
                        // - "default-image.png" if image_url is undefined/null
                        // This prevents broken images in the UI
                        image_url: product.image_url || "default-image.png"
                    }));

                    // Finally, update the component's state with the processed products
                    // This will trigger a re-render with the new shuffled and processed products
                    setFeaturedProducts(processedProducts);
                } else {
                    // Throw error if data isn't in expected format
                    throw new Error('Unable to parse product data');
                }
            } catch (error) {
                // Log error to console and update error state
                console.error('Error fetching featured products:', error);
                setError('Failed to load featured products');
            } finally {
                // Set loading to false regardless of success/failure
                setIsLoading(false);
            }
        };
        
        // Execute the fetch function
        fetchFeaturedProducts();
    }, []); // Empty dependency array means this runs once when component mounts

    // Show loading state while fetching data
    if (isLoading) {
        return (
            <div className="relative bg-gray-900 flex justify-center items-center h-96">
                <p className="text-white">Loading featured products...</p>
            </div>
        );
    }
    
    // Show error state if there was an error
    if (error) {
        return (
            <div className="relative bg-gray-900 flex justify-center items-center h-96">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="relative bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-75" />
            
            <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">
                        Featured Products
                    </h2>
                    <p className="mt-4 text-lg text-gray-300">
                        Discover our most popular and trending items
                    </p>
                </div>
    
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            currentImageIndex={productImageIndices[product.id] || 0}
                            onUpdateImageIndex={(newIndex) => {
                                setProductImageIndices(prev => ({
                                    ...prev,
                                    [product.id]: newIndex
                                }));
                            }}
                        />
                    ))}
                </div>
    
                <div className="mt-12 text-center">
                    <Link 
                        to="/shop" 
                        className="inline-block bg-white text-gray-900 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-all transform hover:scale-105"
                    >
                        View All Products
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProducts;