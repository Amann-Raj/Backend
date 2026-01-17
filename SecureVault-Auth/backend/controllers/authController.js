import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// signup logic
export const signup = async(req, res) => {
    try{
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({error: "All feilds required!"});
        }
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({error: "Email alraedy registered!"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ username, email, passowrd: hashedPassword});
        res.status(201).json({message: "User Created!"});
    } catch(err){
        res.status(400).json({error: "Email already exists!"});
    }
};

// login logic
export const login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        const token = jwt.sign({id: user._id}, 'SECRET_KEY_123', {expiresIn: '1h'});
        res.json({token, username: user.username});
    } else{
        res.status(401).json({error: "Invalid Credentials"});
    }
};