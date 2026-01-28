import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// signup logic
export const signup = async(req, res) => {
    try{
        console.log("Full Body Received:", req.body);
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({error: "All feilds required!"});
        }
        const userExists = await User.findOne({email: email.toLowerCase()});
        if(userExists){
            return res.status(400).json({error: "Email alraedy registered!"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ username, email: email.toLowerCase(), passowrd: hashedPassword});
        res.status(201).json({message: "User Created!"});
    } catch(err){
        console.log("❌ ASLI ERROR YEH HAI:", err.message); 
        res.status(400).json({ error: err.message });
    }
};

// login logic
export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("Login Attempt for:", email);

    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            console.log("User nahi mila database mein!");
            return res.status(401).json({ error: "User exist nahi karta!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password Match Status:", isMatch);

        if (!isMatch) {
            return res.status(401).json({ error: "Password galat hai!" });
        }

        const token = jwt.sign({ id: user._id }, 'SECRET_KEY_123', { expiresIn: '1h' });
        res.json({ token, username: user.username });

    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
};