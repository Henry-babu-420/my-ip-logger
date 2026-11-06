const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('trust proxy', true);

// DHYAN DEIN: Humne static serve hata diya hai taaki route trigger ho sake
app.get('/', async (req, res) => {
    try {
        let userIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        
        if (userIP && userIP.includes(',')) {
            userIP = userIP.split(',')[0].trim();
        }

        if (userIP === '::1' || userIP === '127.0.0.1') {
            userIP = '8.8.8.8'; 
        }

        const userAgent = req.headers['user-agent'];
        const clickTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

        // TERMINAL LOGS
        console.log("\n📡 === NEW TARGET LOGGED ===");
        console.log(`[TIME]      : ${clickTime}`);
        console.log(`[IP]        : ${userIP}`);
        console.log(`[DEVICE]    : ${userAgent}`);
        console.log("=============================\n");

        // Yahan se direct html file send hogi
        res.sendFile(path.join(__dirname, 'public', 'index.html'));

    } catch (error) {
        console.error("Error:", error);
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
});

app.listen(PORT, () => {
    console.log(`Server live ho gaya hai port ${PORT} par`);
});
