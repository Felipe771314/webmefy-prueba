
import { addToCart } from './cart.js';
import { saveProductToLocalStorage } from './utils.js';

/**
 * Carga los productos desde el mock.json.
 */
export async function loadMockProducts() {
    try {
        const response = await fetch('./js/mock.json');
        const mockData = await response.json();

        if (!mockData || !mockData.order || !Array.isArray(mockData.order.line_items)) {
            throw new Error("El formato del mock es incorrecto o está vacío.");
        }

        console.log("Productos cargados:", mockData.order.line_items);
        displayProducts(mockData.order.line_items);
    } catch (error) {
        console.error("Error al cargar los productos desde el mock:", error);
    }
}

/**
 * @param {Array} products 
 */
export function displayProducts(products) {
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = '';

    products.forEach((product, index) => {
        const productId = product.sku || `product-${index}`;

        const productTitle = product.title || 'Unnamed Product';
        const productPrice = product.price || '0.00';
        const productImage = product.image || 'img/default-product.png';
        const productVendor = product.vendor || 'Unknown Vendor';

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
    document.querySelectorAll('.product-card__btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            const product = products.find((p, index) => p.sku === productId || `product-${index}` === productId);

            if (!product || !product.title || !product.price) {
                return;
            }

            addToCart(product);
            e.target.textContent = 'Added!';
            setTimeout(() => (e.target.textContent = 'Add to Cart'), 1500);
        });
    });

    document.querySelectorAll('.product-detail-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            const product = products.find((p, index) => p.sku === productId || `product-${index}` === productId);
    
            if (!product || !product.title || !product.price || !product.image) {
                return;
            }
    
            saveProductToLocalStorage(product);
        });
    });
}
