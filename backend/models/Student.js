import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    rollNo:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    roomNo:{
        type:String,
        required:true
    },
    parentDetails:{
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
        }
    },
});

const Student = mongoose.model('Student',studentSchema);
export default Student;