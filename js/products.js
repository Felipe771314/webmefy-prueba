import { attachAddToCartEvents } from './cart.js';

export function displayProducts(products) {
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = '';  // Limpiar lista antes de agregar

    products.forEach(product => {
        const productCard = createProductCard(product);
        productsList.appendChild(productCard);
    });

    attachAddToCartEvents();  // Maneja el botón 'Add to Cart'
}

function createProductCard(product) {
    const productTitle = product.title || 'Unnamed Product';
    const productPrice = parseFloat(product.price).toFixed(2) || '0.00';
    const productImage = product.image || 'img/default-product.png';

    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
        <img class="product-card__img" src="${productImage}" alt="${productTitle}">
        <h3 class="product-card__title">${productTitle}</h3>
        <p class="product-card__price">Price: €${productPrice}</p>
        <button class="product-card__btn" data-title="${productTitle}" data-price="${productPrice}" data-img="${productImage}">Add to Cart</button>
    `;
    return card;
}
