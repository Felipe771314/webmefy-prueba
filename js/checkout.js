let currentStep = 0;
const steps = document.querySelectorAll('.checkout-step');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const checkoutForm = document.getElementById('checkout-form');

document.addEventListener('DOMContentLoaded', () => {
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
  const summaryItems = document.getElementById("summary-items");
  const cart = getCartFromLocalStorage();
  const savedData = JSON.parse(localStorage.getItem("checkout-form")) || {};

  summaryItems.innerHTML = "";

  if (cart.length === 0) {
    summaryItems.innerHTML = "<p>Your cart is empty. Please add items before proceeding.</p>";
    nextButton.disabled = true;
    return;
  }

  nextButton.disabled = false;

  summaryItems.innerHTML += `
    <h3 class="summary-item__title">Customer Information</h3>
    <p class="summary-item__subtitle"><strong>Full Name:</strong> ${savedData["full-name"] || "Not provided"}</p>
    <p class="summary-item__subtitle"><strong>Email:</strong> ${savedData["email"] || "Not provided"}</p>
    <h3 class="summary-item__title">Address</h3>
    <p class="summary-item__subtitle"><strong>Street:</strong> ${savedData["street"] || "Not provided"}</p>
    <p class="summary-item__subtitle"><strong>City:</strong> ${savedData["city"] || "Not provided"}</p>
    <h3 class="summary-item__title">Payment Method</h3>
    <p class="summary-item__subtitle"><strong>Method:</strong> ${savedData["payment-method"] || "Not selected"}</p>
    <h3 class="summary-item__title">Order Items</h3>
  `;

  cart.forEach((item) => {
    summaryItems.innerHTML += `
      <div class="summary-item">
        <img src="${item.img}" alt="${item.title}" class="summary-item__img">
        <p><strong>${item.title}</strong> - €${parseFloat(item.price).toFixed(2)}</p>
      </div>
    `;
  });
}


nextButton.addEventListener('click', () => {
  if (currentStep < steps.length - 1) {
    saveFormDataToLocalStorage();
    if (validateStep(currentStep)) {
      showStep(currentStep + 1);
    }
  } else {
    localStorage.removeItem('cart');
    localStorage.removeItem('checkout-form');
    window.location.href = 'index.html';
  }
});

prevButton.addEventListener('click', () => {
  if (currentStep > 0) {
    saveFormDataToLocalStorage(); // Guardar antes de cambiar
    showStep(currentStep - 1);
  }
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

checkoutForm.addEventListener('input', () => {
  saveFormDataToLocalStorage();
});

function saveFormDataToLocalStorage() {
  if (!checkoutForm) return;

  const formData = new FormData(checkoutForm);
  const dataObject = {};

  formData.forEach((value, key) => {
    dataObject[key] = value;
  });

  localStorage.setItem('checkout-form', JSON.stringify(dataObject));
  console.log("Datos guardados en localStorage:", dataObject);
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
