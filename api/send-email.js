export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { from, subject, html } = req.body;

        // Account 1 — only sends to its own verified email
        const res1 = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer re_N6CE3L7h_5jh3GEsTnvEMDx49Xvd1M2MZ`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ from, to: ['jagadeeshgelivi@gmail.com'], subject, html })
        });

        // Account 2 — only sends to its own verified email
        const res2 = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer re_W4fbnyou_F35YKDLrRPjbmJf9ZvzGD1Hf`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ from, to: ['spirahworks@gmail.com'], subject, html })
        });

        const data1 = await res1.json();
        const data2 = await res2.json();

        console.log('Account 1 result:', data1);
        console.log('Account 2 result:', data2);

        // Succeed if at least one delivery worked
        if (!res1.ok && !res2.ok) {
            return res.status(500).json({ error: 'Both email sends failed', data1, data2 });
        }

        return res.status(200).json({ success: true, data1, data2 });

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
