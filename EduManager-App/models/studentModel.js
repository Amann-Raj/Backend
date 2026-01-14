import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true},
    grade: { type: String, required: true},
    rollNo: { type:Number, unique: true}
}, { timestamps: true});

export default mongoose.model('Student', studentSchema);