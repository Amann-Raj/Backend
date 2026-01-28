import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Token generator function
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'});
};

export const registerUser = async(req, res) => {
    const {name, email, password} = req.body;
    try{
        const userExists = await User.
    }
}