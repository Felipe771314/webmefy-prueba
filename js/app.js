import { fetchOrderData } from './fetchData.js';
import { displayProducts } from './products.js';
import { initializeCart, proceedToCheckout } from './cart.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const orderData = await fetchOrderData();
        if (orderData && orderData.order.line_items) {
            displayProducts(orderData.order.line_items);
            initializeCart();
        } else {
            console.error('No se encontraron productos en la respuesta.');
        }

        // Navegación al checkout
        const checkoutButton = document.getElementById('checkout-btn');
        checkoutButton.addEventListener('click', proceedToCheckout);
    } catch (error) {
        console.error('Error al inicializar la app:', error);
    }
});
