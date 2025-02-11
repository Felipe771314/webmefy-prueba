export async function fetchOrderData() {
    try {
      console.log("Intentando obtener datos desde /api/proxy...");
      const response = await fetch("/api/proxy");
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      console.log("Respuesta obtenida:", response);
      return await response.json();
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  }
  