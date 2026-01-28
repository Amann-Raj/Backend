import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// RBAC Route: Sirf admins dekh sakte hai
router.get('/admin-dashboard', protect, adminOnly, (req, res) => {
    res.json({message: "Welcome to Admin Dashboard! Secret data unlocked."})
})

export default router;