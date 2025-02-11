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
        console.error('Cart elements not found in the DOM.');
        return;
    }
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>No items in cart</p>';
    }
    
    cartItemsContainer.innerHTML = '';
    cartCount.textContent = cart.length;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart__item');
        cartItem.innerHTML = `
            <img class="cart__item-img" src="${item.img}" alt="${item.title}">
            <p>${item.title} - €${parseFloat(item.price).toFixed(2)}</p>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    checkoutButton.disabled = cart.length === 0;
}


export function proceedToCheckout() {
    window.location.href = 'checkout.html';
}

// Almacenar y recuperar carrito del Local Storage
function getCartFromLocalStorage() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCartToLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}
