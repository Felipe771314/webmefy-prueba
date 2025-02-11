let currentStep = 0;
const steps = document.querySelectorAll('.checkout-step');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const checkoutForm = document.getElementById('checkout-form');

// 1. Cargar datos previos si existen y mostrar el primer paso
window.addEventListener('DOMContentLoaded', () => {
  console.log("Cargando datos previos del formulario desde localStorage...");
  loadFormDataFromLocalStorage();
  showStep(0);
});

/**
 * 2. Muestra el paso actual del formulario
 * @param {number} stepIndex - Índice del paso a mostrar
 */
function showStep(stepIndex) {
  console.log(`Mostrando el paso: ${stepIndex}`);
  steps.forEach((step, index) => {
    step.classList.toggle('active', index === stepIndex);
  });
  currentStep = stepIndex;
  updateNavigationButtons();

  // Si es el último paso, muestra el resumen del carrito
  if (currentStep === steps.length - 1) {
    console.log("Mostrando el resumen del pedido...");
    displaySummary();
  }
}

/**
 * 3. Actualiza los botones de navegación
 */
function updateNavigationButtons() {
  console.log(`Actualizando los botones de navegación, paso actual: ${currentStep}`);
  prevButton.disabled = currentStep === 0;
  nextButton.textContent = currentStep === steps.length - 1 ? 'Place Order' : 'Next';
}

/**
 * 4. Muestra el resumen del carrito en el último paso
 */
function displaySummary() {
  console.log("Generando el resumen del carrito...");
  const summaryItems = document.getElementById('summary-items');
  const cart = getCartFromLocalStorage();
  summaryItems.innerHTML = '';

  if (cart.length === 0) {
    console.warn("El carrito está vacío.");
    summaryItems.innerHTML = '<p>Your cart is empty. Please add items before proceeding.</p>';
    nextButton.disabled = true;
    return;
  }

  nextButton.disabled = false;

  cart.forEach(item => {
    console.log(`Añadiendo al resumen: ${item.title} - €${item.price}`);
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('summary-item');
    itemDiv.innerHTML = `<p><strong>${item.title}</strong> - €${parseFloat(item.price).toFixed(2)}</p>`;
    summaryItems.appendChild(itemDiv);
  });
}

// 5. Manejo del botón "Next"
nextButton.addEventListener('click', () => {
  console.log("Botón 'Next' presionado.");
  if (currentStep < steps.length - 1) {
    if (validateStep(currentStep)) {
      saveFormDataToLocalStorage();
      showStep(currentStep + 1);
    }
  } else {
    console.log("Orden completada. Limpiando localStorage y redirigiendo...");
    alert('Order placed successfully!');
    localStorage.removeItem('cart');
    localStorage.removeItem('checkout-form');
    window.location.href = 'index.html';
  }
});

// 6. Manejo del botón "Previous"
prevButton.addEventListener('click', () => {
  console.log("Botón 'Previous' presionado.");
  if (currentStep > 0) showStep(currentStep - 1);
});

/**
 * 7. Valida los campos del formulario del paso actual
 * @param {number} stepIndex - Índice del paso a validar
 * @returns {boolean} - True si todos los campos son válidos
 */
function validateStep(stepIndex) {
  console.log(`Validando el paso: ${stepIndex}`);
  const inputs = steps[stepIndex].querySelectorAll('input, select');
  let isValid = true;

  inputs.forEach(input => {
    if (!input.checkValidity()) {
      console.warn(`Campo inválido: ${input.name}`);
      input.classList.add('input-error');
      isValid = false;
    } else {
      input.classList.remove('input-error');
    }
  });

  return isValid;
}

/**
 * 8. Guarda los datos del formulario en localStorage
 */
function saveFormDataToLocalStorage() {
  console.log("Guardando los datos del formulario en localStorage...");
  const formData = new FormData(checkoutForm);
  const dataObject = {};

  formData.forEach((value, key) => {
    dataObject[key] = value;
  });

  localStorage.setItem('checkout-form', JSON.stringify(dataObject));
}

/**
 * 9. Carga los datos guardados previamente en el formulario
 */
function loadFormDataFromLocalStorage() {
  console.log("Cargando los datos guardados del formulario desde localStorage...");
  const savedData = JSON.parse(localStorage.getItem('checkout-form'));
  if (savedData) {
    for (const [key, value] of Object.entries(savedData)) {
      const input = document.querySelector(`[name="${key}"]`);
      if (input) {
        console.log(`Cargando valor: ${key} = ${value}`);
        input.value = value;
      }
    }
  }
}

/**
 * 10. Obtiene el carrito de compras del localStorage
 * @returns {Array} - Array de productos en el carrito
 */
function getCartFromLocalStorage() {
  try {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log("Carrito recuperado del localStorage:", cart);
    return cart;
  } catch (e) {
    console.error("Error al recuperar el carrito del localStorage:", e);
    return [];
  }
}
