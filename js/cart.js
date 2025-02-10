let cart = [];

export function initializeCart() {
    const viewCartButton = document.getElementById('view-cart');
    viewCartButton.addEventListener('click', toggleCartView);
}

export function attachAddToCartEvents() {
    document.querySelectorAll('.product-card__btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const product = {
                title: e.target.dataset.title,
                price: e.target.dataset.price,
                img: e.target.dataset.img
            };
            addToCart(product);
        });
    });
}

function addToCart(product) {
    cart.push(product);
    updateCartDisplay();
    updateCartCount();
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart__item');
        cartItem.innerHTML = `
            <img class="cart__item-img" src="${item.img}" alt="${item.title}">
            <p>${item.title} - €${parseFloat(item.price).toFixed(2)}</p>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

function toggleCartView() {
    document.getElementById('cart-section').classList.toggle('cart--hidden');
}

export function proceedToCheckout() {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = './checkout.html';  // Navega al checkout
}
