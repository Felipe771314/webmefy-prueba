import { fetchOrderData } from './fetchData.js';
import { displayProducts } from './products.js';
import { initializeCart, proceedToCheckout } from './cart.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const orderData = await fetchOrderData();
        displayProducts(orderData.order.line_items);
        initializeCart();

        // Evento para el botón de checkout
        document.getElementById('checkout-btn').addEventListener('click', proceedToCheckout);
    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
    }
});
