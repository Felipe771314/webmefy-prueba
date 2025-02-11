import { addToCart } from './cart.js';
import { saveProductToLocalStorage } from './utils.js';

/**
 * 1. Renderiza la lista de productos en la interfaz de usuario.
 * @param {Array} products - Lista de productos a mostrar.
 */
export function displayProducts(products) {
  const productsList = document.getElementById('products-list');
  productsList.innerHTML = ''; // Limpia la lista antes de renderizar

  products.forEach((product, index) => {
    // 2. Asignar un ID único al producto (usando SKU si está disponible)
    const productId = product.sku || `product-${index}`;

    // 3. Validación y asignación de valores predeterminados
    const productTitle = product.title || 'Unnamed Product';
    const productPrice = product.price || '0.00';
    const productImage = product.image || 'img/default-product.png';
    const productVendor = product.vendor || 'Unknown Vendor';

    // 4. Creación de la tarjeta de producto
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

  // 5. Asignar eventos a los botones de "Add to Cart" y "View Details"
  attachProductEvents(products);
}

/**
 * 6. Asigna eventos para agregar productos al carrito y mostrar detalles.
 * @param {Array} products - Lista de productos disponibles.
 */
function attachProductEvents(products) {
  // Evento "Add to Cart"
  document.querySelectorAll('.product-card__btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const productId = e.target.getAttribute('data-id');
      const product = products.find((p, index) => p.sku === productId || `product-${index}` === productId);

      // 7. Verificar si los datos del producto son válidos
      if (!product || !product.title || !product.price) {
        console.warn("Product data is incomplete:", product);
        alert("Product data is incomplete. Unable to add to cart.");
        return;
      }

      // 8. Agregar el producto al carrito
      addToCart(product);

      // Mensaje de confirmación temporal
      e.target.textContent = 'Added!';
      setTimeout(() => (e.target.textContent = 'Add to Cart'), 1500);
    });
  });

  // Evento "View Details"
  document.querySelectorAll('.product-detail-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const productId = e.target.getAttribute('data-id');
      const product = products.find((p, index) => p.sku === productId || `product-${index}` === productId);

      // 9. Verificar si los datos del producto son válidos para mostrar los detalles
      if (!product || !product.title || !product.price || !product.image) {
        console.warn("Product data is incomplete for details view:", product);
        alert("Product data is incomplete. Unable to view details.");
        return;
      }

      // 10. Guardar los detalles del producto en localStorage
      localStorage.setItem('selectedProduct', JSON.stringify(product));
    });
  });
}
