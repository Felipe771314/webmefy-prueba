// ------------ products.js ------------
import { addToCart } from './cart.js';
import { saveProductToLocalStorage } from './utils.js';

export function displayProducts(products) {
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = '';

    products.forEach(product => {
        if (!product.title || !product.price || !product.image) {
            console.warn('Skipping product with missing details:', product);
            return;
        }

        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img class="product-card__img" src="${product.image}" alt="Image of ${product.title}">
            <h3 class="product-card__title">${product.title}</h3>
            <p class="product-card__price">Price: €${parseFloat(product.price).toFixed(2)}</p>
            <p class="product-card__vendor">Vendor: ${product.vendor || 'Unknown Vendor'}</p>
            <div class="product-card__actions">
                <button class="product-card__btn" aria-label="Add ${product.title} to cart" data-product-id="${product.id}">Add to Cart</button>
                <a href="product-detail.html" class="product-detail-link" data-product-id="${product.id}">View Details</a>
            </div>
        `;
        productsList.appendChild(productCard);
    });

    attachProductEvents(products);
}

function attachProductEvents(products) {
    document.querySelectorAll('.product-card__btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-product-id');
            const product = products.find(p => p.id.toString() === productId);
            if (product) {
                addToCart(product);
            } else {
                console.error('Product not found for cart:', productId);
            }
        });
    });

    document.querySelectorAll('.product-detail-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-product-id');
            const product = products.find(p => p.id.toString() === productId);
            if (product) {
                saveProductToLocalStorage(product);
            } else {
                console.error('Product not found for details:', productId);
            }
        });
    });
}
