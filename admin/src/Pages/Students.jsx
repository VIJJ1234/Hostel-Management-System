import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      if (!token) {
        throw new Error('User not authenticated');
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        },
      };
      const res = await axios.get('http://localhost:5000/api/students/all', config);
      setStudents(res.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Student Details</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              {['Name', 'Email', 'Roll No', 'Room No', 'Parent Name', 'Parent Email', 'Parent Phone'].map((header) => (
                <th key={header} className="py-3 px-6 text-left text-gray-700 font-semibold tracking-wide">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className="py-3 px-6 text-gray-900">{student.name}</td>
                <td className="py-3 px-6 text-gray-900">{student.email}</td>
                <td className="py-3 px-6 text-gray-900">{student.rollNo}</td>
                <td className="py-3 px-6 text-gray-900">{student.roomNo}</td>
                <td className="py-3 px-6 text-gray-900">{student.parentDetails.name}</td>
                <td className="py-3 px-6 text-gray-900">{student.parentDetails.email}</td>
                <td className="py-3 px-6 text-gray-900">{student.parentDetails.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
