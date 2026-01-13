import express from 'express';
import { getAllStudents, addStudent, deleteStudent } from '../controllers/studentController.js';

const router = express.Router();

router.get('/students', getAllStudents);
router.post('/add-student', addStudent);
router.delete('/delete-student/:id', deleteStudent);

export default router;