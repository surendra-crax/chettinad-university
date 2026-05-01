export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const payload = req.body;

        // First account
        const res1 = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer re_N6CE3L7h_5jh3GEsTnvEMDx49Xvd1M2MZ`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        // Second account
        const res2 = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer re_W4fbnyou_F35YKDLrRPjbmJf9ZvzGD1Hf`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data1 = await res1.json();
        const data2 = await res2.json();

        return res.status(200).json({ first: data1, second: data2 });

    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
