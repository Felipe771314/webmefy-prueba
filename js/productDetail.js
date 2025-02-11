import { getProductFromLocalStorage } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const product = getProductFromLocalStorage();

    if (!product) {
        document.getElementById('product-detail').innerHTML = '<p>Product not found.</p>';
        return;
    }

    document.getElementById('product-detail').innerHTML = `
        <div class="product-detail__content">
            <img src="${product.img}" alt="${product.title}" class="product-detail__img">
            <h1>${product.title}</h1>
            <p>Price: €${parseFloat(product.price).toFixed(2)}</p>
            <button class="product-detail__btn" onclick="history.back()">Go Back</button>
        </div>
    `;
});
