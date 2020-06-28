const express = require('express');
const app = express();
const port = 5000;
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

dotenv.config();
const connectDB = require('./db');

connectDB();
app.listen(port, () => console.log(`Server running on port:${port}`))

//Middleware
app.use('/api', authRoutes);
