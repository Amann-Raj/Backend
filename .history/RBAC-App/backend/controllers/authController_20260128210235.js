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
        const userExists = await User.findOne({email});
        if(userExists) return res.status(400).json({message: "User already exists"});

        const user = await User.create({name, email, password});
        
    }
}