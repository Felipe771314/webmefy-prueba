export default async function handler(req, res) {
    const apiUrl = 'https://technical-test.webmefy.io/webmefy/data';

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-Webmefy-Token': 'Webmefysupersecretentryleveltoken',
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: `Failed to fetch: ${response.statusText}` });
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error en el proxy:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
}
