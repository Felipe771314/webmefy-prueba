export async function fetchOrderData() {
  try {
      const response = await fetch('/api/proxy');

      if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
  } catch (error) {
      console.error('Error fetching order data:', error);
  }
}