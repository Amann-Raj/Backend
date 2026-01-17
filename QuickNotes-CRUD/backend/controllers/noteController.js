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

// Notes delete karne ka logic
export const deleteNote = async(req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({message: "Notes Deleted!"});
}

// Note edit karne ka logic
export const updateNote = async(req, res) => {
    const { content } = req.body;
    const updateNote = await Note.findByIdAndUpdate(
        req.params.id,
        { content },
        { new: true}
    );
    res.json(updateNote);
};