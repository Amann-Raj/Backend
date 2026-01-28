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

// Health Check / Welcome Route
app.get('/', (req, res) => {
    res.status(200).json({
        message: "🚀 URL Shortener API is Live!",
        status: "Healthy",
        documentation: "Use POST /shorten to create links"
    });
});

// Routes
app.use('/', urlRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("DB Connected"))
    .catch(err=>console.log(err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));