import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { getNotes, addNote, deleteNote, updateNote } from './controllers/noteController.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/quicknotes');

// Routes
app.get('/notes', getNotes);
app.post('/notes', addNote);
app.delete('/notes/:id', deleteNote);
app.put('/notes/:id', updateNote);

app.listen(5000, () => console.log("Backend running on port 5000"));