import { fetchOrderData } from "./fetchData.js";
import { displayProducts } from "./products.js";
import { initializeCart } from "./cart.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const orderData = await fetchOrderData();

    if (
      !orderData ||
      !orderData.order ||
      !Array.isArray(orderData.order.line_items)
    ) {
      throw new Error("Invalid or empty order data.");
    }

    displayProducts(orderData.order.line_items);
    initializeCart();

    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        window.location.href = 'checkout.html';
      });
    } else {
      console.warn("Checkout button not found.");
    }

    // Evento para mostrar/ocultar el carrito
    console.log('Attaching cart toggle event...');
document.getElementById('view-cart')?.addEventListener('click', () => {
  const cartSection = document.getElementById('cart-section');
  cartSection.classList.toggle('cart--hidden');

  // Probar visualmente el estado del carrito
  console.log('Cart toggle triggered', cartSection.classList.contains('cart--hidden') ? 'Hidden' : 'Visible');
});


  } catch (error) {
    console.error("Error al inicializar la aplicación:", error);
  }
});
