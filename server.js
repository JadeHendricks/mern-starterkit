const express = require('express');
const app = express();
const port = 5000;
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./db');

app.get('/api/signup', (req, res) => {
    res.json({
        data: 'You hit the signup endpoint'
    });
});

connectDB();
app.listen(port, () => console.log(`Server running on port:${port}`))