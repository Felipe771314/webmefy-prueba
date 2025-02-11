import { addToCart } from './cart.js';

// Función para renderizar los productos
export function displayProducts(products) {
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = '';

    products.forEach(product => {
        const productTitle = product.title || 'Unnamed Product';
        const productPrice = product.price || '0.00';
        const productImage = product.image || 'img/default-product.png';
        const productVendor = product.vendor || 'Unknown Vendor';
        const productSKU = product.sku || 'N/A';

        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img class="product-card__img" src="${productImage}" alt="${productTitle}">
            <h3 class="product-card__title">${productTitle}</h3>
            <p class="product-card__price">Price: €${parseFloat(productPrice).toFixed(2)}</p>
            <p class="product-card__vendor">Vendor: ${productVendor}</p>
            <p class="product-card__sku">SKU: ${productSKU}</p>
            <button class="product-card__btn" data-title="${productTitle}" data-price="${productPrice}" data-img="${productImage}" data-vendor="${productVendor}" data-sku="${productSKU}">Add to Cart</button>
        `;
        productsList.appendChild(productCard);
    });

    attachAddToCartEvents();
}

// Adjunta eventos a los botones para añadir productos al carrito
function attachAddToCartEvents() {
    document.querySelectorAll('.product-card__btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const product = {
                title: e.target.getAttribute('data-title'),
                price: e.target.getAttribute('data-price'),
                img: e.target.getAttribute('data-img'),
                vendor: e.target.getAttribute('data-vendor'),
                sku: e.target.getAttribute('data-sku')
            };
            addToCart(product);
        });
    });
}
