import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { signup, login } from './controllers/authController.js';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/secureValut');

app.post('/api/signup', signup);
app.post('/api/login', login);

app.listen(5000, () => console.log("Auth Backend running on 5000"));