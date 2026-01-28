import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// RBAC Route: Sirf admins dekh sakte hai
router.get('/admin-dashboard', protect, adminOnly, (req, res) => )

export default router;