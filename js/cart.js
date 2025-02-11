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
    cartItemsContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart__item');
        cartItem.innerHTML = `
            <img class="cart__item-img" src="${item.img}" alt="${item.title}">
            <div class="cart__item-info">
                <p>${item.title} - €${parseFloat(item.price).toFixed(2)}</p>
                <button class="cart__remove-btn" data-index="${index}">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    document.querySelectorAll('.cart__remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            saveCartToLocalStorage(cart);
            updateCartUI(cart);
        });
    });
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
