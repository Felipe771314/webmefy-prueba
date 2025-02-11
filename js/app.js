import { fetchOrderData } from "./fetchData.js";
import { displayProducts } from "./products.js";
import { initializeCart, proceedToCheckout } from "./cart.js";

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
      checkoutBtn.addEventListener("click", proceedToCheckout);
    } else {
      console.warn("Checkout button not found.");
    }

    // Agregar eventos adicionales al cargar productos
  } catch (error) {
    console.error("Error al inicializar la aplicación:", error);
  }
});
