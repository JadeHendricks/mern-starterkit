const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute');

dotenv.config();
const connectDB = require('./db');

connectDB();
app.listen(port, () => console.log(`Server running on port:${port}`))

//Middleware
app.use(morgan('dev'));
app.use(express.json());
if (process.env.NODE_ENV = 'development') { app.use(cors({ origin: `http://localhost:3000` })) }

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
