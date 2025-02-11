export function initializeCart() {
    const cart = getCartFromLocalStorage();
    updateCartUI(cart);
  }
  
  export function addToCart(product) {
    let cart = getCartFromLocalStorage();
    cart.push(product);
    saveCartToLocalStorage(cart);
    updateCartUI(cart);
  }
  
  function updateCartUI(cart) {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const checkoutButton = document.getElementById('checkout-btn');
  
    if (!cartItemsContainer || !cartCount || !checkoutButton) {
      console.warn("Some cart UI elements are missing.");
      return;
    }
  
    cartItemsContainer.innerHTML = '';
    cartCount.textContent = cart.length;
    checkoutButton.disabled = cart.length === 0;
  
    cart.forEach((item, index) => {
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
  
  function attachRemoveEvents(cart) {
    document.querySelectorAll('.cart__remove-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        saveCartToLocalStorage(cart);
        updateCartUI(cart);
      });
    });
  }
  
  function getCartFromLocalStorage() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }
  
  function saveCartToLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  