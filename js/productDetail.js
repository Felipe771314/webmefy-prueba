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

    const productImage = product.img || 'img/default-product.png';

    productDetailContainer.innerHTML = `
        <div class="product-detail__wrapper">
            <div class="product-detail__image-container">
                <img src="${productImage}" alt="${product.title}" class="product-detail__img">
            </div>
            <div class="product-detail__info">
                <h1>${product.title}</h1>
                <p><strong>Price:</strong> €${parseFloat(product.price).toFixed(2)}</p>
                <p><strong>Vendor:</strong> ${product.vendor}</p>
                <p><strong>SKU:</strong> ${product.sku || 'N/A'}</p>
                <button id="add-to-cart-btn" class="product-detail__add-btn">Add to Cart</button>
                <button class="product-detail__btn" onclick="window.location.href='index.html'">Go to Products</button>
            </div>
        </div>
    `;

    document.getElementById("add-to-cart-btn").addEventListener("click", addToCartFromDetail);
    document.getElementById("view-cart")?.addEventListener("click", () => {
        const cartSection = document.getElementById("cart-section");
        cartSection.classList.toggle("cart--hidden");
    });
});

function addToCartFromDetail() {
    const product = JSON.parse(localStorage.getItem('selectedProduct'));

    if (!product) {
        proceedToCheckout();
        return;
    }
    
    import('./cart.js').then(({ addToCart }) => {
        addToCart(product);
    }).catch(error => {
        console.error("Error al importar `cart.js`:", error);
    });
}
