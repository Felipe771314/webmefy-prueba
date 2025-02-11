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
    document.querySelectorAll('.product-detail-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            const product = products.find((p, index) => p.sku === productId || `product-${index}` === productId);

            // Ajustar acceso a las propiedades según la estructura real del JSON
            const productTitle = product.title || product.name || 'Unnamed Product';
            const productPrice = product.price || product.base_price || 0;
            const productImage = product.image || product.featured_image?.src || 'img/default-product.png';

            if (!productTitle || !productPrice || !productImage) {
                console.warn("Product data is incomplete for details view:", product);
                alert("Product data is incomplete. Unable to view details.");
                return;
            }

            saveProductToLocalStorage({
                id: productId,
                title: productTitle,
                price: productPrice,
                img: productImage,
                vendor: product.vendor || 'Unknown Vendor',
            });
        });
    });
}

