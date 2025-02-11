// ------------ checkout.js ------------
let currentStep = 0;
const steps = document.querySelectorAll('.checkout-step');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');

function showStep(stepIndex) {
    steps.forEach((step, index) => {
        step.style.display = stepIndex === index ? 'block' : 'none';
    });
    currentStep = stepIndex;

    updateNavigationButtons();
    if (currentStep === steps.length - 1) {
        displaySummary();
    }
}

function updateNavigationButtons() {
    prevButton.disabled = currentStep === 0;
    nextButton.textContent = currentStep === steps.length - 1 ? 'Place Order' : 'Next';
}

function displaySummary() {
    const summaryItems = document.getElementById('summary-items');
    const cart = getCartFromLocalStorage();
    summaryItems.innerHTML = '';

    if (cart.length === 0) {
        summaryItems.innerHTML = '<p>Your cart is empty. Please add items before proceeding.</p>';
        nextButton.disabled = true;
        return;
    }

    nextButton.disabled = false;

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('summary-item');
        itemDiv.innerHTML = `
            <p><strong>${item.title}</strong> - €${parseFloat(item.price).toFixed(2)}</p>
        `;
        summaryItems.appendChild(itemDiv);
    });
}

// Event listeners for navigation buttons
nextButton.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
        showStep(currentStep + 1);
    } else {
        // Aquí puedes manejar la lógica de finalización del pedido
        alert('Order placed successfully!');
        localStorage.removeItem('cart');
        window.location.href = 'index.html'; // Volver a la tienda principal
    }
});

prevButton.addEventListener('click', () => {
    if (currentStep > 0) showStep(currentStep - 1);
});

function getCartFromLocalStorage() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

showStep(0); // Mostrar el primer paso al cargar la página.
