import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import foodMenuRoutes from './routes/foodMenu.js';
import complaints from './routes/complaints.js';
import studentRoutes from './routes/students.js';
import gatePass from './routes/gatePass.js';

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "*",  // Allow frontend URL in production
  credentials: true
}));

app.use(express.json());

// API Routes
app.use('/api/foodMenu', foodMenuRoutes);
app.use('/api/complaints', complaints);
app.use('/api/students', studentRoutes);
app.use('/api/gatePass', gatePass);

// Test Route (Health Check)
app.get('/', (req, res) => {
  res.status(200).json({ message: "Server is running successfully" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

// Port Configuration
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
