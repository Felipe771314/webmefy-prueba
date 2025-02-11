// 1. Realiza una solicitud para obtener los datos del pedido desde el servidor
export async function fetchOrderData() {
  try {
    const response = await fetch("/api/proxy");

    // 2. Verifica si la respuesta es válida
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    // 3. Retorna los datos en formato JSON
    return await response.json();
  } catch (error) {
    // 4. Muestra un mensaje de error en la consola si ocurre un problema
    console.error("Error fetching order data:", error);
  }
}
