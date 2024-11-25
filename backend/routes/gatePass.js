import express from 'express';
import GatePass from '../models/GatePass.js';

const router = express.Router();

// Route: GET /api/gatepasses
// Description: Get all gate passes
router.get('/', async (req, res) => {
  try {
    const gatePasses = await GatePass.find();
    res.json(gatePasses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route: POST /api/gatepasses
// Description: Create a new gate pass
router.post('/', async (req, res) => {
  const { roomNumber, studentName, rollNumber, reason, dateFrom, dateTo } = req.body;

  try {
    const newGatePass = new GatePass({
      roomNumber,
      studentName,
      rollNumber,
      reason,
      dateFrom,
      dateTo,
    });

    const savedGatePass = await newGatePass.save();
    res.status(201).json(savedGatePass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route: PUT /api/gatepasses/:id
// Description: Update a gate pass status by ID
router.put('/:id', async (req, res) => {
  const { status } = req.body;

  try {
    const updatedGatePass = await GatePass.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedGatePass) {
      return res.status(404).json({ message: 'Gate pass not found' });
    }

    res.json(updatedGatePass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add other routes like deleting gate passes as needed

export default router;
