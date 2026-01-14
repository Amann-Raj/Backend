import express from 'express';
import { getStudents, addStudent } from '../controllers/studentController.js';
import { registerUser } from '../controllers/userController.js';

const router = express.Router();

// Student Routes
router.get('/students', getStudents);
router.post('/add-student', addStudent);

// User Routes
router.post('/signup', registerUser);

export default router;