import Student from '../models/studentModel.js';

export const getStudents = async(req, res) => {
    const students = await Student.find();
    res.json(students);
};

export const addStudent = async(req, res) => {
    try{
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch(error){
        res.status(400).json({message: "Duplicate Roll No or Invalid Data"});
    }
};