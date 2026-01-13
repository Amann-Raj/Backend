import Student from '../models/studentModel.js';

export const getAllStudents = async (requestAnimationFrame, res) => {
    try{
        const students = await Student.find();
        res.status(200).json(students);
    } catch(error){
        res.status(500).json({message: error.message });
    }
};

export const addStudent = async (req, res) => {
    try{
        const {name, grade} = req.body;
        const newStudent = await Student.create({name, grade});
        res.status(201).json(newStudent);
    } catch(error){
        res.status(400).json({message: error.message});
    }
};

export const deleteStudent = async (req, res) => {
    try{
        await Student.dindByIdAndDelete(req.params.id);
        res.json({message: "Student deleted Successfully!"});
    } catch(error){
        res.status(404).json({message: "Student not find!"});
    }
};