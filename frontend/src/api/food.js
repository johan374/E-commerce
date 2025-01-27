// food.js
import frontendInventory from '../pages/categories/frontendInventory';

class FoodService {
    #paginate(items, page = 1, pageSize = 12) {
        const startIndex = (page - 1) * pageSize;
        return {
            results: items.slice(startIndex, startIndex + pageSize),
            count: items.length
        };
    }

    getAllFood(page = 1) {
        return { data: this.#paginate(frontendInventory.food, page) };
    }

    searchFood(query, page = 1) {
        const filtered = frontendInventory.food.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );
        return { data: this.#paginate(filtered, page) };
    }

    getFoodByCategory(subcategory, page = 1) {
        if (subcategory === 'all') return this.getAllFood(page);

        const filtered = frontendInventory.food.filter(
            product => product.subcategory.slug === subcategory
        );
        return { data: this.#paginate(filtered, page) };
    }
}

export const foodAPI = new FoodService();