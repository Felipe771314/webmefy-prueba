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
            return res.status(response.status).json({ error: 'Error fetching data' });
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}
