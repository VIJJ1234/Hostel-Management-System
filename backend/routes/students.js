import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';

const router = express.Router();

const JWT_SECRET = 'HOSTEL'; // Use a strong secret key in production

// Registration route
router.post('/signup', async (req, res) => {
  const { name, rollNo, email, password, roomNo, parentDetails } = req.body;
  try {
    let student = await Student.findOne({ rollNo });
    if (student) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newStudent = new Student({
      name,
      rollNo,
      email,
      password: hashedPassword,
      roomNo,
      parentDetails,
    });

    await newStudent.save();

    const payload = {
      student: {
        id: newStudent.id,
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.status(201).json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const payload = {
      student: {
        id: student.id,
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Authorization denied' });
  }
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
    req.student = decoded.student;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Fetch student profile (protected)
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select('-password');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    const { name, rollNo, email, roomNo, parentDetails, id } = student;
    res.status(200).json({ name, rollNo, email, roomNo, parentDetails, id });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Fetch all students (for admin)
router.get('/all', async (req, res) => {
  try {
    const students = await Student.find().select('-password');
    if (!students || students.length === 0) {
      return res.status(404).json({ message: 'Students not found' });
    }
    res.status(200).json(students);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
