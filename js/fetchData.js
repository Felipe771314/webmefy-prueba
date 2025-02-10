export async function fetchOrderData() {
    try {
        const response = await fetch('/api/proxy', {
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
        throw error;
    }
}
