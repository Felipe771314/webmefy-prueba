export async function fetchOrderData() {
    try {
        const response = await fetch('https://technical-test.webmefy.io/webmefy/data', {
            method: 'GET',
            headers: {
                'X-Webmefy-Token': 'Webmefysupersecretentryleveltoken',
                'Accept': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Datos obtenidos del servidor:', data);  // Verifica la estructura aquí
        return data;
    } catch (error) {
        console.error('Error fetching order data:', error);
        throw error;
    }
}
