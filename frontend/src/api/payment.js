import axios from 'axios';

// Create a separate Axios instance for payments with Ngrok URL
const paymentApi = axios.create({
    baseURL: `https://${import.meta.env.VITE_NGROK_URL}`, // Use environment variable
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
    }
});

// In payment.js
export const paymentAPI = {
    createOrder: async (items) => {
        console.log('Payment payload:', { items });
        try {
            const response = await paymentApi.post('/api/orders/create/', { items });
            return response;
        } catch (error) {
            console.error('Error details:', error.response?.data);
            throw error;
        }
    },
    
    processPayment: async (paymentIntentId, paymentMethodId) => {
        try {
            const response = await paymentApi.post('/api/process/', {
                payment_intent_id: paymentIntentId,
                payment_method_id: paymentMethodId
            });
            return response;
        } catch (error) {
            console.error('Error processing payment:', error);
            throw error;
        }
    }
};

export default paymentAPI;