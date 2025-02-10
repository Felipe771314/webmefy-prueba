let cart = [];

export function initializeCart() {
    document.getElementById('view-cart').addEventListener('click', () => {
        document.getElementById('cart-section').classList.toggle('cart--hidden');
    });
}

export function proceedToCheckout() {
    location.href = './checkout.html';  // Navegar a la página de checkout
}
