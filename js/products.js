// ------------ products.js ------------
import { addToCart } from './cart.js';
import { saveProductToLocalStorage } from './utils.js';

export function displayProducts(products) {
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = '';

    products.forEach((product, index) => {
        // Generar un id único para el producto si no hay SKU
        const productId = product.sku || `product-${index}`;

        // Verificación de datos mínimos
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
            <p class="product-card__sku">ID: ${productId}</p>
            <div class="product-card__actions">
                <button class="product-card__btn" data-id="${productId}">Add to Cart</button>
                <a href="product-detail.html" class="product-detail-link" data-id="${productId}">View Details</a>
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
            const productId = e.target.getAttribute('data-id');
            const product = products.find((p, index) => p.sku === productId || `product-${index}` === productId);

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
            const productId = e.target.getAttribute('data-id');
            const product = products.find((p, index) => p.sku === productId || `product-${index}` === productId);
    
            if (!product || !product.title || !product.price || !product.image) {
                console.warn("Product data is incomplete for details view:", product);
                alert("Product data is incomplete. Unable to view details.");
                return;
            }
    
            // Guardar el producto completo en localStorage con su id como clave
            localStorage.setItem('selectedProduct', JSON.stringify(product));
        });
    });
    
}
