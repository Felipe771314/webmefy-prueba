document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const customer = getCustomerInfo();  // Simularemos los datos del cliente desde el JSON

    displayOrderSummary(cart);
    displayCustomerInfo(customer);
    displayCrossSellingProducts(cart);

    document.getElementById('confirm-order-btn').addEventListener('click', () => {
        alert('Thank you! Your order has been placed.');
        localStorage.clear();  // Limpiamos el carrito
        window.location.href = './index.html';  // Regresar a la tienda principal
    });
});

function getCustomerInfo() {
    // Simulando que obtenemos los datos del cliente desde el JSON (o API real)
    return {
        firstName: "dfgfg",
        lastName: "sdgfsdg",
        email: "test@webmefy.com",
        address: "sdfgsdfg, madrid, Spain"
    };
}

function displayOrderSummary(cart) {
    const orderSummary = document.getElementById('order-summary');
    orderSummary.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += parseFloat(item.price);
        const itemElement = document.createElement('div');
        itemElement.classList.add('order-item');
        itemElement.innerHTML = `
            <p><strong>${item.title}</strong> - €${parseFloat(item.price).toFixed(2)}</p>
        `;
        orderSummary.appendChild(itemElement);
    });

    const totalElement = document.createElement('p');
    totalElement.innerHTML = `<strong>Total: €${totalPrice.toFixed(2)}</strong>`;
    orderSummary.appendChild(totalElement);
}

function displayCustomerInfo(customer) {
    const customerDetails = document.getElementById('customer-details');
    customerDetails.innerHTML = `
        <p><strong>Name:</strong> ${customer.firstName} ${customer.lastName}</p>
        <p><strong>Email:</strong> ${customer.email}</p>
        <p><strong>Address:</strong> ${customer.address}</p>
    `;
}

function displayCrossSellingProducts(cart) {
    const crossSellingContainer = document.getElementById('cross-selling-products');
    crossSellingContainer.innerHTML = '';

    // Filtramos productos sugeridos (puede ser en base al carrito)
    const suggestedProducts = getSuggestedProducts(cart);

    suggestedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-card__img">
            <h3>${product.title}</h3>
            <p>€${parseFloat(product.price).toFixed(2)}</p>
            <button class="product-card__btn" data-title="${product.title}" data-price="${product.price}" data-img="${product.image}">Add to Cart</button>
        `;
        crossSellingContainer.appendChild(productCard);
    });

    attachAddToCartEvents();
}

function getSuggestedProducts(cart) {
    // Sugerir productos que no estén en el carrito (simple simulación)
    const allProducts = [
        {
            title: "Premium Snowboard Wax",
            price: "29.99",
            image: "https://cdn.shopify.com/s/files/1/0818/9083/6769/products/snowboard_wax.png"
        },
        {
            title: "Snowboard Boots Pro",
            price: "199.99",
            image: "https://cdn.shopify.com/s/files/1/0818/9083/6769/products/Main_d624f226-0a89-4fe1-b333-0d1548b43c06.jpg"
        },
        {
            title: "Winter Sports Helmet",
            price: "79.99",
            image: "https://cdn.shopify.com/s/files/1/0818/9083/6769/products/Main_0a40b01b-5021-48c1-80d1-aa8ab4876d3d.jpg"
        }
    ];

    // Excluir productos ya en el carrito
    return allProducts.filter(product => !cart.some(cartItem => cartItem.title === product.title));
}

function attachAddToCartEvents() {
    document.querySelectorAll('.product-card__btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const product = {
                title: e.target.dataset.title,
                price: e.target.dataset.price,
                img: e.target.dataset.img
            };
            addToCart(product);
        });
    });
}

function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.title} has been added to your cart!`);
}
