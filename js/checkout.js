// ------------ checkout.js ------------
let currentStep = 0;
const steps = document.querySelectorAll('.checkout-step');

function showStep(stepIndex) {
    steps.forEach((step, index) => {
        step.style.display = stepIndex === index ? 'block' : 'none';
    });
    currentStep = stepIndex;
    displaySummary();
}

function displaySummary() {
    if (currentStep === steps.length - 1) {
        const summaryItems = document.getElementById('summary-items');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        summaryItems.innerHTML = '';

        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `<p>${item.title} - €${parseFloat(item.price).toFixed(2)}</p>`;
            summaryItems.appendChild(itemDiv);
        });
    }
}

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentStep < steps.length - 1) showStep(currentStep + 1);
});

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentStep > 0) showStep(currentStep - 1);
});

showStep(0); // Mostrar primer paso al cargar la página.