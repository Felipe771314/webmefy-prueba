document.addEventListener('DOMContentLoaded', () => {
    const product = JSON.parse(localStorage.getItem('selectedProduct'));

    const productDetailContainer = document.getElementById('product-detail');

    if (!product) {
        productDetailContainer.innerHTML = `
            <p class="error-message">Product details are not available. Please return to the product list.</p>
            <button class="product-detail__btn" onclick="window.location.href='index.html'">Go to Products</button>
        `;
        return;
    }

    // Renderiza el detalle del producto
    productDetailContainer.innerHTML = `
        <div class="product-detail__wrapper">
            <div class="product-detail__image-container">
                <img src="${product.image}" alt="${product.title}" class="product-detail__img">
            </div>
            <div class="product-detail__info">
                <h1>${product.title}</h1>
                <p><strong>Price:</strong> €${parseFloat(product.price).toFixed(2)}</p>
                <p><strong>Vendor:</strong> ${product.vendor}</p>
                <p><strong>SKU:</strong> ${product.sku || 'N/A'}</p>
                <button class="product-detail__add-btn" onclick="addToCartFromDetail()">Add to Cart</button>
                <button class="product-detail__btn" onclick="window.location.href='index.html'">Go to Products</button>
            </div>
        </div>
    `;
});

function addToCartFromDetail() {
    const product = JSON.parse(localStorage.getItem('selectedProduct'));
    if (product) {
        import('./cart.js').then(({ addToCart }) => {
            addToCart(product);
            alert(`${product.title} has been added to the cart.`);
        });
    }
}
