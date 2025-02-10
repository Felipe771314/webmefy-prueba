export async function fetchOrderData() {
    try {
        const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
        const response = isLocal 
            ? await fetch('./mock/mock.json')  // Datos locales desde el mock
            : await fetch('https://technical-test.webmefy.io/webmefy/data', {
                method: 'GET',
                headers: {
                    'X-Webmefy-Token': 'Webmefysupersecretentryleveltoken',
                    'Accept': 'application/json',
                }
            });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching order data:', error);
    }
}
