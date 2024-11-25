import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ComplaintForm = () => {
  const [complaint, setComplaint] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [studentId, setStudentId] = useState('');

  useEffect(() => {
    const fetchStudentId = async () => {
      try {
        const token = localStorage.getItem('auth-token');
        if (!token) {
          throw new Error('User not authenticated');
        }

        const response = await axios.get('http://localhost:5000/api/students/profile', {
          headers: {
            Authorization: token
          }
        });

        setStudentId(response.data.id); // Assuming the backend sends student id in response
      } catch (error) {
        console.error('Error fetching student id:', error);
        setError('Failed to fetch student id. Please try again.');
      }
    };

    fetchStudentId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('auth-token');
      if (!token) {
        throw new Error('User not authenticated');
      }

      const response = await axios.post('http://localhost:5000/api/complaints', {
        studentId,
        complaint,
        roomNo
      }, {
        headers: {
          Authorization: token
        }
      });

      setMessage(response.data.message);
      setComplaint('');
      setRoomNo('');
      setError('');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Unauthorized. Please log in again.');
      } else {
        setError('Error submitting complaint. Please try again later.');
      }
      setMessage('');
    }
  };

  return (
    <div className="max-w-md mx-auto my-4 p-4 border border-gray-300 rounded">
      <h2 className="text-xl font-bold mb-4">File a Complaint</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Complaint</label>
          <textarea
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md bg-gray-50"
            rows="4"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Room No</label>
          <input
            type="text"
            value={roomNo}
            onChange={(e) => setRoomNo(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md bg-gray-50"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit Complaint
          </button>
        </div>
      </form>
      {message && <div className="mt-4 text-center text-green-500">{message}</div>}
      {error && <div className="mt-4 text-center text-red-500">{error}</div>}
    </div>
  );
};

export default ComplaintForm;
