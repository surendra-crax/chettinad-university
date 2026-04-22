
// Vercel Serverless Function
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer re_N6CE3L7h_5jh3GEsTnvEMDx49Xvd1M2MZ`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();

        if (response.ok) {
            return res.status(200).json(data);
        } else {
            console.error('Resend Error:', data);
            return res.status(response.status).json(data);
        }
    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}
