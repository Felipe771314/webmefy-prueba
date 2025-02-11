/**
 * Inicializa el carrito al cargar la aplicación.
 * Obtiene los datos del carrito del localStorage y actualiza la interfaz de usuario.
 */
export function initializeCart() {
  console.log("Inicializando el carrito...");
  const cart = getCartFromLocalStorage();
  console.log("Carrito cargado desde localStorage:", cart);
  updateCartUI(cart);
}

/**
 * Agrega un producto al carrito y actualiza el estado del mismo.
 * @param {Object} product - Producto a agregar al carrito.
 */
export function addToCart(product) {
  console.log("Agregando producto al carrito:", product);
  let cart = getCartFromLocalStorage();
  cart.push(product);
  console.log("Carrito después de agregar producto:", cart);
  saveCartToLocalStorage(cart);
  updateCartUI(cart);
}

/**
 * Actualiza la interfaz de usuario del carrito con los productos actuales.
 * @param {Array} cart - Lista de productos en el carrito.
 */
function updateCartUI(cart) {
  console.log("Actualizando la interfaz de usuario del carrito...");
  const cartItemsContainer = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const checkoutButton = document.getElementById('checkout-btn');

  if (!cartItemsContainer || !cartCount || !checkoutButton) {
    console.warn("Algunos elementos del carrito no se encontraron en el DOM.");
    return;
  }

  // Limpia el contenido actual del carrito
  cartItemsContainer.innerHTML = '';
  cartCount.textContent = cart.length;
  checkoutButton.disabled = cart.length === 0;
  console.log(`Carrito contiene ${cart.length} productos.`);

  // Renderiza cada producto del carrito en la interfaz
  cart.forEach((item, index) => {
    console.log(`Renderizando producto en el carrito: ${item.title}`);
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart__item');
    cartItem.innerHTML = `
      <img class="cart__item-img" src="${item.img}" alt="${item.title}">
      <div class="cart__item-info">
        <p>${item.title} - €${parseFloat(item.price).toFixed(2)}</p>
        <button class="cart__remove-btn" data-index="${index}" aria-label="Remove ${item.title}">
          🗑️ Remove
        </button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  attachRemoveEvents(cart);
}

/**
 * Asigna el evento para eliminar productos del carrito.
 * @param {Array} cart - Lista de productos en el carrito.
 */
function attachRemoveEvents(cart) {
  console.log("Asignando eventos para eliminar productos del carrito...");
  document.querySelectorAll('.cart__remove-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      console.log(`Eliminando producto en la posición ${index} del carrito.`);
      cart.splice(index, 1); // Elimina el producto del array
      saveCartToLocalStorage(cart); // Guarda el estado actualizado del carrito
      updateCartUI(cart); // Refresca la interfaz del carrito
    });
  });
}

/**
 * Recupera el carrito del localStorage.
 * @returns {Array} Lista de productos en el carrito, o un array vacío si no hay datos.
 */
function getCartFromLocalStorage() {
  try {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log("Carrito recuperado del localStorage:", cart);
    return cart;
  } catch (e) {
    console.error("Error al recuperar el carrito del localStorage:", e);
    return [];
  }
}

/**
 * Guarda el carrito actualizado en el localStorage.
 * @param {Array} cart - Lista de productos a guardar.
 */
function saveCartToLocalStorage(cart) {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log("Carrito guardado en localStorage:", cart);
  } catch (e) {
    console.error("Error al guardar el carrito en localStorage:", e);
  }
}

/**
 * Redirige al usuario a la página de checkout.
 */
export function proceedToCheckout() {
  console.log("Redirigiendo al usuario a la página de checkout...");
  window.location.href = 'checkout.html';
}
