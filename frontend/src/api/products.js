// products.js - A service class for managing product-related operations

import frontendInventory from '../pages/categories/frontendInventory';

class FrontendProductService {
    // Private method for pagination (indicated by #)
    // Takes array of items and returns a paginated subset
    #paginate(items, page = 1, pageSize = 12) {
        // Calculate starting index for current page
        // e.g., page 1 starts at 0, page 2 starts at 12, etc.
        const startIndex = (page - 1) * pageSize;
        
        return {
            // Slice the array to get items for current page
            results: items.slice(startIndex, startIndex + pageSize),
            // Total number of items (used for pagination UI)
            count: items.length
        };
    }

    // Method to get random featured products
    // Default count is 12 products
    getRandomFeaturedProducts(count = 12) {
        // Combine electronics and food products into one array
        const allProducts = [...frontendInventory.electronics, ...frontendInventory.food];
        // Filter only products marked as featured
        const featuredProducts = allProducts.filter(product => product.is_featured);
        
        // Create a copy of featured products for shuffling
        const shuffled = [...featuredProducts];
        // Fisher-Yates shuffle implementation
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // Return object matching API response structure
        return { 
            data: {
                // Take only requested number of products
                results: shuffled.slice(0, count),
                // Total count of featured products
                count: featuredProducts.length
            }
        };
    }

    // Get featured products with pagination
    getFeaturedProducts(page = 1) {
        // Combine all products
        const allProducts = [...frontendInventory.electronics, ...frontendInventory.food];
        // Filter featured products
        const featured = allProducts.filter(product => product.is_featured);
        // Return paginated results
        return { data: this.#paginate(featured, page) };
    }

    // Get all products with pagination
    getAllProducts(page = 1) {
        // Combine all products from both categories
        const allProducts = [...frontendInventory.electronics, ...frontendInventory.food];
        // Return paginated results
        return { data: this.#paginate(allProducts, page) };
    }

    // Search products by name or description
    searchProducts(query, page = 1) {
        // Combine all products
        const allProducts = [...frontendInventory.electronics, ...frontendInventory.food];
        // Filter products based on search query
        const filtered = allProducts.filter(product => 
            // Convert both product data and query to lowercase for case-insensitive search
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );
        // Return paginated search results
        return { data: this.#paginate(filtered, page) };
    }
}

// Export a singleton instance of the service
export const productAPI = new FrontendProductService();