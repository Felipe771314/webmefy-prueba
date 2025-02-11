import { fetchOrderData } from "./fetchData.js";
import { displayProducts } from "./products.js";
import { initializeCart } from "./cart.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // 1. Obtener datos del pedido desde el mock
    const orderData = await fetchOrderData();

    // 2. Verificar si los datos del pedido son válidos
    if (!orderData || !orderData.order || !Array.isArray(orderData.order.line_items)) {
      throw new Error("Invalid or empty order data.");
    }

    // 3. Mostrar productos y configurar carrito
    displayProducts(orderData.order.line_items);
    initializeCart();

    // 4. Asignar evento al botón de checkout
    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        window.location.href = "checkout.html";
      });
    }

    // 5. Evento para mostrar/ocultar el carrito
    document.getElementById("view-cart")?.addEventListener("click", () => {
      const cartSection = document.getElementById("cart-section");
      cartSection.classList.toggle("cart--hidden");
    });
  } catch (error) {
  }
});
