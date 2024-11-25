import express from 'express';
const router = express.Router();
import Complaint from '../models/Complaint.js';

// Route to register a new complaint
router.post('/', async (req, res) => {
    const { studentId, complaint, roomNo } = req.body;
    try {
        const newComplaint = new Complaint({
            studentId,
            complaint,
            roomNo,
            status: 'Pending' // Default status when a new complaint is registered
        });
        await newComplaint.save();
        res.status(201).json({ message: 'Complaint registered successfully', complaint: newComplaint });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to fetch all complaints, populated with student details
router.get('/', async (req, res) => {
    try {
        const complaints = await Complaint.find().populate('studentId', 'name'); // Populating with student name
        res.status(200).json(complaints);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to update a complaint status
router.put('/:id', async (req, res) => {
    const { status } = req.body;
    try {
        let complaint = await Complaint.findById(req.params.id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
        complaint.status = status;
        await complaint.save();
        res.status(200).json({ message: 'Complaint updated successfully', complaint });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
