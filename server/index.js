import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectDB.js';
import authRoute from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/auth', authRoute);

app.get('/', (req, res) => {
    res.send('Hello from the backend');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});