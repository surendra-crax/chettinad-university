const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the current directory (HTML, CSS, Assets)
app.use(express.static(path.join(__dirname)));

// API endpoint to send emails securely
app.post('/api/send-email', async (req, res) => {
    try {
        // We use the built-in fetch (available in Node.js 18+)
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer re_N6CE3L7h_5jh3GEsTnvEMDx49Xvd1M2MZ`, // Hidden API Key
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();

        if (response.ok) {
            res.status(200).json(data);
        } else {
            console.error('Resend Error:', data);
            res.status(response.status).json(data);
        }
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`🚀 Server running perfectly!`);
    console.log(`👉 Open your browser to: http://localhost:${PORT}`);
    console.log(`=========================================`);
});
