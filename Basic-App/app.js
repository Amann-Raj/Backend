import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

let students = [
    { id: 1, name: "Rahul", grade: "A"},
    { id: 2, name: "Aman", grade: "B"}
];

app.get('/', (req, res) => {
    res.send("Student API is running!!!");
});

app.get('/api/students', (req, res) => {
    res.status(200).json(students);
});

app.post('/api/add-student', (req, res) => {
    const {name, grade} = req.body;
    const newStudent = {
        id: students.length + 1,
        name: name,
        grade: grade
    };
    students.push(newStudent);
    res.status(201).json({
        message: "Student add ho gya!",
        data: newStudent
    });
});

app.delete('/api/delete-student/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const initialLength = students.length;
    students = students.filter(s => s.id !== studentId);
    if(students.length === initialLength){
        return res.status(404).json({message: "Student nahi mila!"});
    }
    res.json({message: `ID ${studentId} wala student nikaal diya gaya!`});
});

app.listen(PORT, () => {
    console.log(`Server chalu ho gya`);
});