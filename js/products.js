export function displayProducts(products) {
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = '';  // Limpiar la lista antes de agregar productos

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img class="product-card__img" src="${product.image || 'img/default-product.png'}" alt="${product.title || 'Unnamed Product'}">
            <h3 class="product-card__title">${product.title}</h3>
            <p class="product-card__price">Price: €${parseFloat(product.price).toFixed(2)}</p>
            <button class="product-card__btn" data-title="${product.title}" data-price="${product.price}" data-img="${product.image}">Add to Cart</button>
        `;
        productsList.appendChild(productCard);
    });
}
