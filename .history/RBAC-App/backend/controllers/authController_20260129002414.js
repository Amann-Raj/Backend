import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Token generator function
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'});
};

export const registerUser = async(req, res) => {
    try{
        const {name, email, password, role} = req.body;
        const userExists = await User.findOne({email});

        if(userExists) return res.status(400).json({message: "User already exists"});

        const user = await User.create({name, email, password, role});
        res.status(201).json({
            _id: user._id,
            name: user.name,
            role: user.role,
            token: generateToken(user._id) // Account bante hi login
        });
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

export const loginUser = async(req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        // Password compare logic
        if(user && (await bcrypt.compare(password, user.password))){
            res.json({name: user.name, role: user.role, token: generateToken(user._id)});
        } else{
            res.status(401).json({message: "Invalid email or password"});
        }
    } catch(error){
        res.status(500).json({message: error.message});
    }
};