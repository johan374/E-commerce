// electronics.js
import frontendInventory from '../pages/categories/frontendInventory';

class ElectronicsService {
    #paginate(items, page = 1, pageSize = 12) {
        const startIndex = (page - 1) * pageSize;
        return {
            results: items.slice(startIndex, startIndex + pageSize),
            count: items.length
        };
    }

    getAllElectronics(page = 1) {
        return { data: this.#paginate(frontendInventory.electronics, page) };
    }

    searchElectronics(query, page = 1) {
        const filtered = frontendInventory.electronics.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );
        return { data: this.#paginate(filtered, page) };
    }

    getElectronicsBySubcategory(subcategory, page = 1) {
        if (subcategory === 'all') return this.getAllElectronics(page);

        const filtered = frontendInventory.electronics.filter(
            product => product.subcategory.slug === subcategory
        );
        return { data: this.#paginate(filtered, page) };
    }
}

export const electronicsAPI = new ElectronicsService();