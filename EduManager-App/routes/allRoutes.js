import express from 'express';
import { getStudents, addStudent } from '../controllers/studentController.js';
import { registerUser, loginUser } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Student Routes
// Protected Routes (Sirf Token wale access karenge)
// Humne 'protect' middleware beech mein laga diya
router.get('/students', protect, getStudents);
router.post('/add-student', protect, addStudent);

// User Routes
// Public Routes (Koi bhi access kar sakta hai)
router.post('/signup', registerUser);
router.post('/login', loginUser);

export default router;