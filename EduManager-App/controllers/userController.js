import User from '../models/userModel.js';

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