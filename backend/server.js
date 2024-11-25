import express from 'express';
import cors from 'cors';

import connectDB from './config/db.js';
import foodMenuRoutes from './routes/foodMenu.js';
import complaints from './routes/complaints.js';
import studentRoutes from './routes/students.js';
import gatePass from './routes/gatePass.js';



const PORT = 5000;
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/foodMenu',foodMenuRoutes);
app.use('/api/complaints',complaints);
app.use('/api/students',studentRoutes);
app.use('/api/gatePass',gatePass);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});