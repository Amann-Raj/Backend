import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';


dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
