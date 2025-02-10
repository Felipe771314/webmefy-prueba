import { fetchOrderData } from './fetchData.js';
import { displayProducts } from './products.js';
import { initializeCart, proceedToCheckout } from './cart.js';

// Cargar datos y renderizar
document.addEventListener('DOMContentLoaded', async () => {
    const orderData = await fetchOrderData();  // Fetch desde API o mock.json
    displayProducts(orderData.line_items);
    initializeCart();  // Inicia los eventos del carrito

    // Navegación al checkout
    const checkoutButton = document.getElementById('checkout-btn');
    checkoutButton.addEventListener('click', proceedToCheckout);
});
