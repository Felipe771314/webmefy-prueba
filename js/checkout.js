let currentStep = 0;
const steps = document.querySelectorAll(".checkout-step");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const checkoutForm = document.getElementById("checkout-form");

// 1. Cargar datos previos del formulario y mostrar el primer paso
window.addEventListener("DOMContentLoaded", () => {
  loadFormDataFromLocalStorage();
  showStep(0);
});

/**
 * 2. Muestra el paso actual del formulario
 * @param {number} stepIndex - Índice del paso a mostrar
 */
function showStep(stepIndex) {
  steps.forEach((step, index) => {
    step.classList.toggle("active", index === stepIndex);
  });
  currentStep = stepIndex;
  updateNavigationButtons();

  // Si es el último paso, muestra el resumen del carrito
  if (currentStep === steps.length - 1) {
    displaySummary();
  }
}

/**
 * 3. Actualiza los botones de navegación
 */
function updateNavigationButtons() {
  prevButton.disabled = currentStep === 0;
  nextButton.textContent =
    currentStep === steps.length - 1 ? "Place Order" : "Next";
}

/**
 * 4. Muestra el resumen del carrito en el último paso
 */
function displaySummary() {
  const summaryItems = document.getElementById("summary-items");
  const cart = getCartFromLocalStorage();
  summaryItems.innerHTML = "";

  // Mensaje si el carrito está vacío
  if (cart.length === 0) {
    summaryItems.innerHTML =
      "<p>Your cart is empty. Please add items before proceeding.</p>";
    nextButton.disabled = true;
    return;
  }

  nextButton.disabled = false;

  // Mostrar los productos del carrito
  cart.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("summary-item");
    itemDiv.innerHTML = `
      <p><strong>${item.title}</strong> - €${parseFloat(item.price).toFixed(
      2
    )}</p>
    `;
    summaryItems.appendChild(itemDiv);
  });
}

// 5. Evento al hacer clic en "Next"
nextButton.addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    if (validateStep(currentStep)) {
      saveFormDataToLocalStorage();
      showStep(currentStep + 1);
    }
  } else {
    // Al completar la orden, limpiar el almacenamiento local y redirigir
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    localStorage.removeItem("checkout-form");
    window.location.href = "index.html";
  }
});

// 6. Evento al hacer clic en "Previous"
prevButton.addEventListener("click", () => {
  if (currentStep > 0) showStep(currentStep - 1);
});

/**
 * 7. Valida los campos del formulario del paso actual
 * @param {number} stepIndex - Índice del paso a validar
 * @returns {boolean} - True si todos los campos son válidos
 */
function validateStep(stepIndex) {
  const inputs = steps[stepIndex].querySelectorAll("input, select");
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.checkValidity()) {
      input.classList.add("input-error");
      isValid = false;
    } else {
      input.classList.remove("input-error");
    }
  });

  return isValid;
}

/**
 * 8. Guarda los datos del formulario en localStorage
 */
function saveFormDataToLocalStorage() {
  const formData = new FormData(checkoutForm);
  const dataObject = {};

  formData.forEach((value, key) => {
    dataObject[key] = value;
  });

  localStorage.setItem("checkout-form", JSON.stringify(dataObject));
}

/**
 * 9. Carga los datos guardados previamente en el formulario
 */
function loadFormDataFromLocalStorage() {
  const savedData = JSON.parse(localStorage.getItem("checkout-form"));
  if (savedData) {
    for (const [key, value] of Object.entries(savedData)) {
      const input = document.querySelector(`[name="${key}"]`);
      if (input) input.value = value;
    }
  }
}

/**
 * 10. Obtiene el carrito de compras del localStorage
 * @returns {Array} - Array de productos en el carrito
 */
function getCartFromLocalStorage() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}
