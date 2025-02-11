// 1. Inicializa el carrito al cargar la aplicación
export function initializeCart() {
  const cart = getCartFromLocalStorage();
  updateCartUI(cart);
}

// 2. Agrega un producto al carrito y actualiza el estado
export function addToCart(product) {
  let cart = getCartFromLocalStorage();
  cart.push(product);
  saveCartToLocalStorage(cart);
  updateCartUI(cart);
}

// 3. Actualiza la interfaz de usuario del carrito con los productos actuales
function updateCartUI(cart) {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const checkoutButton = document.getElementById("checkout-btn");

  // Verifica si los elementos del DOM necesarios están presentes
  if (!cartItemsContainer || !cartCount || !checkoutButton) {
    console.warn("Some cart UI elements are missing.");
    return;
  }

  // Limpia el contenido actual del carrito
  cartItemsContainer.innerHTML = "";
  cartCount.textContent = cart.length;
  checkoutButton.disabled = cart.length === 0;

  // Renderiza cada producto del carrito en la interfaz
  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart__item");
    cartItem.innerHTML = `
      <img class="cart__item-img" src="${item.img}" alt="${item.title}">
      <div class="cart__item-info">
        <p>${item.title} - €${parseFloat(item.price).toFixed(2)}</p>
        <button class="cart__remove-btn" data-index="${index}" aria-label="Remove ${
      item.title
    }">
          🗑️ Remove
        </button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  // Asigna eventos a los botones de eliminación
  attachRemoveEvents(cart);
}

// 4. Asigna eventos para eliminar productos del carrito
function attachRemoveEvents(cart) {
  document.querySelectorAll(".cart__remove-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cart.splice(index, 1); // Elimina el producto del array
      saveCartToLocalStorage(cart); // Guarda el carrito actualizado
      updateCartUI(cart); // Refresca la interfaz del carrito
    });
  });
}

// 5. Recupera el carrito almacenado en localStorage
function getCartFromLocalStorage() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// 6. Guarda el carrito actualizado en localStorage
function saveCartToLocalStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// 7. Redirige al usuario a la página de checkout
export function proceedToCheckout() {
  window.location.href = "checkout.html";
}
