import { addToCart } from './cart.js';
import { saveProductToLocalStorage } from './utils.js';

export function displayProducts(products) {
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = '';

    products.forEach((product, index) => {
        // Generar un ID único solo si el producto no tiene SKU
        if (!product.sku) {
            product.sku = `product-${index}`;
        }

        // Verificación y asignación de valores predeterminados
        const productTitle = product.title || 'Unnamed Product';
        const productPrice = product.price || '0.00';
        const productImage = product.image || 'img/default-product.png';
        const productVendor = product.vendor || 'Unknown Vendor';

        // Creación de la tarjeta de producto
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img class="product-card__img" src="${productImage}" alt="${productTitle}">
            <h3 class="product-card__title">${productTitle}</h3>
            <p class="product-card__price">Price: €${parseFloat(productPrice).toFixed(2)}</p>
            <p class="product-card__vendor">Vendor: ${productVendor}</p>
            <p class="product-card__sku">ID: ${product.sku}</p>
            <div class="product-card__actions">
                <button class="product-card__btn" data-index="${index}">Add to Cart</button>
                <a href="product-detail.html" class="product-detail-link" data-index="${index}">View Details</a>
            </div>
        `;
        productsList.appendChild(productCard);
    });

    attachProductEvents(products);
}

function attachProductEvents(products) {
    // Manejar "Add to Cart"
    document.querySelectorAll('.product-card__btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productIndex = e.target.getAttribute('data-index');
            const product = products[productIndex];

            if (!product || !product.title || !product.price) {
                console.warn("Product data is incomplete:", product);
                alert("Product data is incomplete. Unable to add to cart.");
                return;
            }

            addToCart(product);

            // Mensaje visual opcional (feedback)
            e.target.textContent = 'Added!';
            setTimeout(() => (e.target.textContent = 'Add to Cart'), 1500);
        });
    });

    // Manejar "View Details"
    document.querySelectorAll('.product-detail-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const productIndex = e.target.getAttribute('data-index');
            const product = products[productIndex];

            if (!product || !product.title || !product.price || !product.img) {
                console.warn("Product data is incomplete for details view:", product);
                alert("Product data is incomplete. Unable to view details.");
                return;
            }

            saveProductToLocalStorage(product);
        });
    });
}
