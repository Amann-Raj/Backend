import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async(reqq, res) => {
    const { username, email, password} = req.body;
    try{
        const userExists = await User.findOne({email});
        if(userExists) return res.status(400).json({msg: "User already exists"});

        const user = await User.create({username, email, password});
        res.status(201).json
    } catch(err){
        res.status(500).json({error: err.message});
    }
};

export const loginUser = async(req, res) => {
    const {email, password} = req.body;
    try{
        // 1. Check karo user exists hai ya nhi
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({msg: "User nahi mila!!!"});
        // 2. Password match karo (Encrypted vs Plain)
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: "Galat Password!"});
        // 3. Agar sb sahi hai toh Token (Entry pass) banao
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({
            msg: "Login Success!",
            token: token, user: {id: user._id, username: user.username}
        });
    } catch(err){
        res.status(500).json({error: err.message});
    }
};