import api from './index';

export const productAPI = {
  getFeaturedProducts: () => {
    return api.get('/products/featured/');
  },
  
  // You can add more product-related API methods here
  getAllProducts: () => {
    return api.get('/products/');
  },
};