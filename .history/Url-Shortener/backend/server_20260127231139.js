import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import urlRoutes from './routes/urlRoutes.js';

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/', urlRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("DB Connected"))