
/**
 * Verifica si `localStorage` está disponible.
 * @returns {boolean}
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
* Recupera un elemento del `localStorage` y lo convierte a objeto JSON.
* @param {string} key La clave del elemento.
* @returns {Object|null} El objeto almacenado o null si no se encuentra o hay un error.
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
* Guarda un objeto en el `localStorage` como una cadena JSON.
* @param {string} key La clave donde se guardará.
* @param {Object} value El objeto a guardar.
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
* Elimina un elemento del `localStorage`.
* @param {string} key La clave del elemento a eliminar.
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

// Exportar funciones específicas para productos
export function getProductFromLocalStorage() {
  return getFromLocalStorage("selectedProduct");
}

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

export function clearProductFromLocalStorage() {
  removeFromLocalStorage("selectedProduct");
}
