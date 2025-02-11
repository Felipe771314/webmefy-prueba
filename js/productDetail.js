import { getProductFromLocalStorage } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const product = getProductFromLocalStorage();
    const productDetailContainer = document.getElementById('product-detail');

    if (!product || !product.title || !product.price || !product.img) {
        productDetailContainer.innerHTML = `
            <p class="error-message">Product details are not available. Please return to the product list.</p>
            <button class="product-detail__btn" onclick="window.location.href='index.html'">Go to Products</button>
        `;
        return;
    }

    productDetailContainer.innerHTML = `
        <div class="product-detail__content">
            <img src="${product.img}" alt="${product.title}" class="product-detail__img">
            <h1>${product.title}</h1>
            <p>Price: €${parseFloat(product.price).toFixed(2)}</p>
            <p><strong>Vendor:</strong> ${product.vendor || 'N/A'}</p>
            <p><strong>SKU:</strong> ${product.sku || 'N/A'}</p>
            <button class="product-detail__btn" onclick="window.location.href='index.html'">Go to Products</button>
        </div>
    `;
});
function renderCrossSelling(products) {
    const crossSellingSection = document.getElementById('cross-selling');
    crossSellingSection.innerHTML = '<h2>You may also like</h2>';
    products.forEach(product => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cross-selling__item');
        itemDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <p>${product.title}</p>
        `;
        crossSellingSection.appendChild(itemDiv);
    });
}

// Llamar esta función con productos mock
renderCrossSelling([
    { title: "Recommended Product 1", image: "img/recommended1.png" },
    { title: "Recommended Product 2", image: "img/recommended2.png" }
]);
