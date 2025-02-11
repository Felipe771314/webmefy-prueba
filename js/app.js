// ------------ utils.js ------------

/**
 * 1. Verifica si `localStorage` está disponible.
 * @returns {boolean} Indica si `localStorage` se puede usar.
 */
function isLocalStorageAvailable() {
  try {
    const testKey = "__test__";
    localStorage.setItem(testKey, "test");
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    console.warn("LocalStorage is not available:", e);
    return false;
  }
}

/**
 * 2. Recupera un elemento del `localStorage` y lo convierte a JSON.
 * @param {string} key - Clave del elemento a recuperar.
 * @returns {Object|null} - Objeto recuperado o null si no existe o hay un error.
 */
function getFromLocalStorage(key) {
  if (!isLocalStorageAvailable()) return null;

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error(
      `Error retrieving item with key "${key}" from localStorage:`,
      e
    );
    return null;
  }
}

/**
 * 3. Guarda un objeto en el `localStorage` como JSON.
 * @param {string} key - Clave donde se guardará el objeto.
 * @param {Object} value - Objeto a guardar.
 */
function saveToLocalStorage(key, value) {
  if (!isLocalStorageAvailable()) return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving item with key "${key}" to localStorage:`, e);
  }
}

/**
 * 4. Elimina un elemento del `localStorage`.
 * @param {string} key - Clave del elemento a eliminar.
 */
function removeFromLocalStorage(key) {
  if (!isLocalStorageAvailable()) return;

  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error(
      `Error removing item with key "${key}" from localStorage:`,
      e
    );
  }
}

/**
 * 5. Recupera el producto seleccionado del `localStorage`.
 * @returns {Object|null} - Objeto del producto o null si no se encuentra.
 */
export function getProductFromLocalStorage() {
  return getFromLocalStorage("selectedProduct");
}

/**
 * 6. Guarda un producto en el `localStorage`.
 * @param {Object} product - Producto a guardar.
 */
export function saveProductToLocalStorage(product) {
  if (!isLocalStorageAvailable()) return;

  try {
    localStorage.setItem(
      "selectedProduct",
      JSON.stringify({
        title: product.title,
        price: product.price,
        img: product.img,
        vendor: product.vendor || "Unknown Vendor",
      })
    );
  } catch (e) {
    console.error("Failed to save product to localStorage:", e);
  }
}

/**
 * 7. Elimina el producto seleccionado del `localStorage`.
 */
export function clearProductFromLocalStorage() {
  removeFromLocalStorage("selectedProduct");
}
