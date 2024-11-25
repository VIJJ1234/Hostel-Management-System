
import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student',
    },
    complaint:{
        type:String,
        required:true
    },
    roomNo: {
        type: String,
        required: true
    },
    status:{
        type:String,
        enum:['Pending','Resolved','Dismissed'],
        default:'Pending'
    },
});
 const Complaint = mongoose.model('Complaint',complaintSchema);
 export default Complaint;