let currentStep = 0;
const steps = document.querySelectorAll('.checkout-step');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const checkoutForm = document.getElementById('checkout-form');

// Cargar datos previos si existen
window.addEventListener('DOMContentLoaded', () => {
  loadFormDataFromLocalStorage();
  showStep(0);
});

function showStep(stepIndex) {
  steps.forEach((step, index) => {
    step.classList.toggle('active', index === stepIndex);
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

nextButton.addEventListener('click', () => {
  if (currentStep < steps.length - 1) {
    if (validateStep(currentStep)) {
      saveFormDataToLocalStorage();
      showStep(currentStep + 1);
    }
  } else {
    alert('Order placed successfully!');
    localStorage.removeItem('cart');
    localStorage.removeItem('checkout-form');
    window.location.href = 'index.html';
  }
});

prevButton.addEventListener('click', () => {
  if (currentStep > 0) showStep(currentStep - 1);
});

function validateStep(stepIndex) {
  const inputs = steps[stepIndex].querySelectorAll('input, select');
  let isValid = true;

  inputs.forEach(input => {
    if (!input.checkValidity()) {
      input.classList.add('input-error');
      isValid = false;
    } else {
      input.classList.remove('input-error');
    }
  });

  return isValid;
}

function saveFormDataToLocalStorage() {
  const formData = new FormData(checkoutForm);
  const dataObject = {};

  formData.forEach((value, key) => {
    dataObject[key] = value;
  });

  localStorage.setItem('checkout-form', JSON.stringify(dataObject));
}

function loadFormDataFromLocalStorage() {
  const savedData = JSON.parse(localStorage.getItem('checkout-form'));
  if (savedData) {
    for (const [key, value] of Object.entries(savedData)) {
      const input = document.querySelector(`[name="${key}"]`);
      if (input) input.value = value;
    }
  }
}

function getCartFromLocalStorage() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}
