import { getProductFromLocalStorage, saveProductToLocalStorage } from './utils.js';
import { addToCart } from './cart.js';

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
        <div class="product-detail__wrapper">
            <div class="product-detail__image-container">
                <img src="${product.img}" alt="${product.title}" class="product-detail__img">
            </div>
            <div class="product-detail__info">
                <h1>${product.title}</h1>
                <p><strong>Price:</strong> €${parseFloat(product.price).toFixed(2)}</p>
                <p><strong>Vendor:</strong> ${product.vendor || 'N/A'}</p>
                <p><strong>SKU:</strong> ${product.sku || 'N/A'}</p>
                <button class="product-detail__add-btn" id="add-to-cart-btn">Add to Cart</button>
                <button class="product-detail__btn" onclick="window.location.href='index.html'">Go to Products</button>
            </div>
        </div>
    `;

    // Agregar evento para el botón "Add to Cart"
    document.getElementById('add-to-cart-btn').addEventListener('click', () => {
        addToCart(product);
        alert(`${product.title} has been added to your cart.`);
    });
    
    // Renderizar productos relacionados
    renderCrossSelling([
        { title: "Recommended Product 1", image: "img/recommended1.png" },
        { title: "Recommended Product 2", image: "img/recommended2.png" }
    ]);
});

function renderCrossSelling(products) {
    const crossSellingSection = document.getElementById('cross-selling');
    crossSellingSection.innerHTML = '<h2>You may also like</h2>';

    products.forEach(product => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cross-selling__item');
        itemDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="cross-selling__img">
            <p>${product.title}</p>
        `;
        crossSellingSection.appendChild(itemDiv);
    });
}
