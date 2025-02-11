// ------------ utils.js ------------
// Utility to get product from localStorage
export function getProductFromLocalStorage() {
    return JSON.parse(localStorage.getItem('selectedProduct')) || null;
}

// Utility to save product to localStorage
export function saveProductToLocalStorage(product) {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
}