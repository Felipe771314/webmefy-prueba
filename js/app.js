import { fetchOrderData } from "./fetchData.js";
import { displayProducts } from "./products.js";
import { initializeCart } from "./cart.js";



document.addEventListener("DOMContentLoaded", async () => {
  try {
    // 1. Obtener los datos del pedido mediante fetchOrderData()
    const orderData = await fetchOrderData();

    // 2. Verificar si los datos del pedido son válidos
    if (
      !orderData ||
      !orderData.order ||
      !Array.isArray(orderData.order.line_items)
    ) {
      throw new Error("Invalid or empty order data.");
    }

    // 3. Mostrar los productos y configurar el carrito
    displayProducts(orderData.order.line_items);
    initializeCart();

    // 4. Asignar evento al botón de "Checkout"
    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        window.location.href = "checkout.html"; // Redirige a la página de checkout
      });
    } else {
      console.warn("Checkout button not found.");
    }

    // 5. Evento para mostrar/ocultar el carrito
    console.log("Attaching cart toggle event...");
    document.getElementById("view-cart")?.addEventListener("click", () => {
      const cartSection = document.getElementById("cart-section");
      cartSection.classList.toggle("cart--hidden");

      // Probar visualmente el estado del carrito
      console.log(
        "Cart toggle triggered",
        cartSection.classList.contains("cart--hidden") ? "Hidden" : "Visible"
      );
    });
  } catch (error) {
    console.error("Error al inicializar la aplicación:", error);
  }
});
