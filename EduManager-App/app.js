import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import allRoutes from './routes/allRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/api', allRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));