document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    displayCheckoutSummary(cart);
});

function displayCheckoutSummary(cart) {
    const summaryContainer = document.getElementById('order-summary');
    summaryContainer.innerHTML = '';

    let totalAmount = 0;

    cart.forEach(item => {
        const itemTotal = parseFloat(item.price);
        totalAmount += itemTotal;

        const summaryItem = document.createElement('div');
        summaryItem.classList.add('order-summary__item');
        summaryItem.innerHTML = `
            <p>${item.title} (SKU: ${item.sku})</p>
            <p>Vendor: ${item.vendor}</p>
            <p>Price: €${itemTotal.toFixed(2)}</p>
        `;
        summaryContainer.appendChild(summaryItem);
    });

    const totalElement = document.createElement('div');
    totalElement.classList.add('order-summary__total');
    totalElement.innerHTML = `<p>Total: €${totalAmount.toFixed(2)}</p>`;
    summaryContainer.appendChild(totalElement);
}
