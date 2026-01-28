import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Level 1: Check if user is logged in (Token Validation)
export const protect = async(req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1];

    if(!token) return res.status(401).json({message: "Not Authorized, no token"});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).selsct('-password');
        next();
    } catch(error){
        
    }
}