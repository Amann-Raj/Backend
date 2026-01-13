import express from 'express';
import connectDB from './config/db.js';
import studentRoutes from './routes/studentRoutes.js';

const app = express();

connectDB();

app.use(express.json());

app.use('/api', studentRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));