import { nanoid } from 'nanoid';
import { url } from '../models/Url.js';

export const shortenUrl = async (req, res) => {
    try{
        const { fullUrl } = req.body;

        // check agar URL valid hai ya nahi
        if(!fullUrl) return res.status(400).json({})
    }
}