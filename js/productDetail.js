// 1. Carga y renderiza los detalles del producto al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  const productDetailContainer = document.getElementById("product-detail");

  // 2. Verifica si hay datos del producto disponibles
  if (!product) {
    productDetailContainer.innerHTML = `
        <p class="error-message">Product details are not available. Please return to the product list.</p>
        <button class="product-detail__btn" onclick="window.location.href='index.html'">Go to Products</button>
      `;
    return;
  }

  // 3. Renderiza los detalles del producto en la interfaz de usuario
  productDetailContainer.innerHTML = `
      <div class="product-detail__wrapper">
        <div class="product-detail__image-container">
          <img src="${product.image}" alt="${
    product.title
  }" class="product-detail__img">
        </div>
        <div class="product-detail__info">
          <h1>${product.title}</h1>
          <p><strong>Price:</strong> €${parseFloat(product.price).toFixed(
            2
          )}</p>
          <p><strong>Vendor:</strong> ${product.vendor}</p>
          <p><strong>SKU:</strong> ${product.sku || "N/A"}</p>
          <button class="product-detail__add-btn" onclick="addToCartFromDetail()">Add to Cart</button>
          <button class="product-detail__btn" onclick="window.location.href='index.html'">Go to Products</button>
        </div>
      </div>
    `;
});

// 4. Agrega el producto al carrito desde la página de detalles
function addToCartFromDetail() {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));

  // 5. Verifica si el producto es válido antes de agregarlo al carrito
  if (product) {
    import("./cart.js").then(({ addToCart }) => {
      addToCart(product);
      alert(`${product.title} has been added to the cart.`);
    });
  }
}
