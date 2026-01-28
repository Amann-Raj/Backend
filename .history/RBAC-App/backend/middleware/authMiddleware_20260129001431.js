import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Level 1: Check if user is logged in (Token Validation)
export const protect = async(req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1];

    if(!token) return res.status(401).json({messa})
}