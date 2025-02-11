import { getProductFromLocalStorage } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const product = getProductFromLocalStorage();
  const productDetailContainer = document.getElementById('product-detail');

  if (!product) {
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
      <p><strong>Description:</strong> ${product.description || 'No description available.'}</p>
      <button class="product-detail__btn">Add to Cart</button>
    </div>
  `;
});
