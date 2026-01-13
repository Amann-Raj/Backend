// Dummy Data yahan le aaye
let students = [
    { id: 1, name: "Rahul", grade: "A" },
    { id: 2, name: "Sana", grade: "B" }
];

// Saare logic wale functions
export const getAllStudents = (req, res) => {
    res.status(200).json(students);
};

export const addStudent = (req, res) => {
    const { name, grade } = req.body;
    const newStudent = { id: students.length + 1, name, grade };
    students.push(newStudent);
    res.status(201).json({ message: "Student add ho gaya!", data: newStudent });
};

export const deleteStudent = (req, res) => {
    const studentId = parseInt(req.params.id);
    students = students.filter(s => s.id !== studentId);
    res.json({ message: `ID ${studentId} deleted!` });
};