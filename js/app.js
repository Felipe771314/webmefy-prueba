import { fetchOrderData } from "./fetchData.js";
import { displayProducts } from "./products.js";
import { initializeCart, proceedToCheckout } from "./cart.js";
import { attachCartPreview } from "./utils.js"; // Si necesitas mostrar la vista del carrito
import { handleProductDetails } from "./productDetail.js"; // Si gestionamos eventos del detalle del producto

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
    attachCartPreview(); // Función para mostrar carrito en tiempo real
    handleProductDetails(); // Maneja clics en productos y redirección al detalle
  } catch (error) {
    console.error("Error al inicializar la aplicación:", error);
    alert("There was a problem loading the products. Please try again later.");
  }
});
