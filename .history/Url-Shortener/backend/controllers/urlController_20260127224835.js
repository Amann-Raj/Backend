import { nanoid } from 'nanoid';
import { url } from '../models/Url.js';

export const shortenUrl = async (req, res) => {
    try{
        const { fullUrl } = req.body;

        // check agar URL valid hai ya nahi
        if(!fullUrl) return res.status(400).json({error: "URL is required"});

        // Naya short ID generate karein
        const shortId = nanoid(8);

        const newUrl = await Url.create({ fullUrl, shortId});
        res.status(201).json(newUrl);
    } catch(err){
        res.status(500).json({ error: "Server Error"});
    }
}

export const redirectUrl = async(req, res) =>{
    try{
        const {shortId} = req.params;
        const urlEntry = await Url.findOne({shortId});

        if(urlEntry){
            urlEntry.clicks++; 
            await urlEntry.save();
            return res.redirect(urlEntry.fullUrl);
        } else{
            return res.status(404).send("URL Not Found");
        }
    } catch(err){
        res.status(500).json({error})
    }
}