// ------------ products.js ------------
import { addToCart } from './cart.js';
import { saveProductToLocalStorage } from './utils.js';

export function displayProducts(products) {
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img class="product-card__img" src="${product.image || 'img/default-product.png'}" alt="${product.title}">
            <h3 class="product-card__title">${product.title}</h3>
            <p class="product-card__price">Price: €${parseFloat(product.price).toFixed(2)}</p>
            <p class="product-card__vendor">Vendor: ${product.vendor}</p>
            <button class="product-card__btn" data-product='${JSON.stringify(product)}'>Add to Cart</button>
            <a href="product-detail.html" class="product-detail-link" data-product='${JSON.stringify(product)}'>View Details</a>
        `;
        productsList.appendChild(productCard);
    });

    attachProductEvents();
}

function attachProductEvents() {
    document.querySelectorAll('.product-card__btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const product = JSON.parse(e.target.getAttribute('data-product'));
            addToCart(product);
        });
    });

    document.querySelectorAll('.product-detail-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const product = JSON.parse(e.target.getAttribute('data-product'));
            saveProductToLocalStorage(product);
        });
    });
}