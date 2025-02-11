// 1. Cargar datos desde el archivo local `mock.json`
export async function fetchOrderData() {
  try {
      // 2. Obtener los datos del archivo mock.json
      const response = await fetch("/js/mock.json"); 

      if (!response.ok) {
          throw new Error(`❌ Error al cargar el mock: ${response.statusText}`);
      }

      const data = await response.json();

      // 3. Verificación de estructura esperada
      if (!data || !data.order || !Array.isArray(data.order.line_items)) {
          throw new Error("❌ Error: La estructura del mock es incorrecta o no tiene productos.");
      }

      return data;
  } catch (error) {
      return null;
  }
}
