export function displayProducts(products) {
    if (!products || products.length === 0) {
        console.warn('No hay productos para mostrar.');
        return;
    }

    const productsList = document.getElementById('products-list');
    productsList.innerHTML = '';

    products.forEach(product => {
        const productTitle = product.title || 'Unnamed Product';
        const productPrice = product.price || '0.00';
        const productImage = product.image || 'img/default-product.png';

        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img class="product-card__img" src="${productImage}" alt="${productTitle}">
            <h3 class="product-card__title">${productTitle}</h3>
            <p class="product-card__price">Price: €${parseFloat(productPrice).toFixed(2)}</p>
            <button class="product-card__btn" data-title="${productTitle}" data-price="${productPrice}" data-img="${productImage}">Add to Cart</button>
        `;
        productsList.appendChild(productCard);
    });
}
