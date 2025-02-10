import { fetchOrderData } from './fetchData.js';
import { displayProducts } from './products.js';
import { initializeCart, proceedToCheckout } from './cart.js';

// Cargar datos y renderizar
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const orderData = await fetchOrderData();
        displayProducts(orderData.line_items);
        initializeCart();

        // Navegación al checkout
        const checkoutButton = document.getElementById('checkout-btn');
        checkoutButton.addEventListener('click', proceedToCheckout);
    } catch (error) {
        console.error('Error al inicializar la app:', error);
    }
});
