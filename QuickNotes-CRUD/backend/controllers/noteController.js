import Note from '../models/noteModel.js';

// Saare notes lana
export const getNotes = async(req, res) => {
    const notes = await Note.find();
    res.json(notes);
}

// Naya note save karna
export const addNote = async(req, res) => {
    const newNote = new Note({content: req.body.content});
    await newNote.save();
    res.json(newNote);
};