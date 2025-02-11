import { fetchOrderData } from "./fetchData.js";
import { displayProducts } from "./products.js";
import { initializeCart } from "./cart.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    console.log("Iniciando la aplicación...");

    // 1. Obtener los datos del pedido mediante fetchOrderData()
    const orderData = await fetchOrderData();
    console.log("Datos del pedido obtenidos:", orderData);

    // 2. Verificar si los datos del pedido son válidos
    if (
      !orderData ||
      !orderData.order ||
      !Array.isArray(orderData.order.line_items)
    ) {
      console.error("Datos del pedido inválidos o vacíos:", orderData);
      throw new Error("Invalid or empty order data.");
    }

    console.log("Datos del pedido validados correctamente.");

    // 3. Mostrar los productos y configurar el carrito
    console.log("Mostrando productos...");
    displayProducts(orderData.order.line_items);
    console.log("Productos mostrados correctamente.");

    console.log("Inicializando el carrito...");
    initializeCart();
    console.log("Carrito inicializado correctamente.");

    // 4. Asignar evento al botón de "Checkout"
    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
      console.log("Botón de checkout encontrado.");
      checkoutBtn.addEventListener("click", () => {
        console.log("Redirigiendo a la página de checkout...");
        window.location.href = "checkout.html";
      });
    } else {
      console.warn("Checkout button not found.");
    }

    // 5. Evento para mostrar/ocultar el carrito
    console.log("Adjuntando evento para alternar el carrito...");
    document.getElementById("view-cart")?.addEventListener("click", () => {
      const cartSection = document.getElementById("cart-section");
      cartSection.classList.toggle("cart--hidden");

      // Probar visualmente el estado del carrito
      console.log(
        "Estado del carrito:",
        cartSection.classList.contains("cart--hidden") ? "Oculto" : "Visible"
      );
    });

  } catch (error) {
    console.error("Error al inicializar la aplicación:", error);
  }
});
