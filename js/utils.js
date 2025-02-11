// ------------ utils.js ------------

/**
 * Check if localStorage is available and accessible.
 * @returns {boolean}
 */
function isLocalStorageAvailable() {
    try {
        const testKey = '__test__';
        localStorage.setItem(testKey, 'test');
        localStorage.removeItem(testKey);
        return true;
    } catch (e) {
        console.warn('LocalStorage is not available:', e);
        return false;
    }
}

/**
 * Retrieve the selected product from localStorage.
 * @returns {Object|null} The selected product or null if not found or corrupt.
 */
export function getProductFromLocalStorage() {
    if (!isLocalStorageAvailable()) return null;
    
    try {
        const product = localStorage.getItem('selectedProduct');
        return product ? JSON.parse(product) : null;
    } catch (e) {
        console.error('Failed to parse product from localStorage:', e);
        return null;
    }
}

/**
 * Save the selected product to localStorage.
 * @param {Object} product The product object to save.
 */
export function saveProductToLocalStorage(product) {
    if (!isLocalStorageAvailable()) return;
    
    try {
        localStorage.setItem('selectedProduct', JSON.stringify(product));
    } catch (e) {
        console.error('Failed to save product to localStorage:', e);
    }
}
