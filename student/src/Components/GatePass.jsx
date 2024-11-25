import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GatePass = () => {
  const [formData, setFormData] = useState({
    roomNumber: '',
    studentName: '',
    rollNumber: '',
    reason: '',
    dateFrom: '',
    dateTo: '',
  });
  const [gatePasses, setGatePasses] = useState([]);

  useEffect(() => {
    const fetchGatePasses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/gatePass');
        setGatePasses(response.data);
      } catch (error) {
        console.error('Error fetching gate passes:', error);
      }
    };

    fetchGatePasses();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/gatePass', formData);
      console.log('Gate pass application submitted:', response.data);
      setGatePasses([...gatePasses, response.data]);
      // Reset form fields after submission
      setFormData({
        roomNumber: '',
        studentName: '',
        rollNumber: '',
        reason: '',
        dateFrom: '',
        dateTo: '',
      });
    } catch (error) {
      console.error('Error submitting gate pass application:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Apply for Gate Pass</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block">
              Room Number:
              <input
                type="text"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                required
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Student Name:
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                required
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Roll Number:
              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                required
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Reason:
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Date From:
              <input
                type="date"
                name="dateFrom"
                value={formData.dateFrom}
                onChange={handleChange}
                required
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Date To:
              <input
                type="date"
                name="dateTo"
                value={formData.dateTo}
                onChange={handleChange}
                required
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </label>
          </div>
        </div>
        <div className="mt-4 text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>

      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Previously Applied Gate Passes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Room Number</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Student Name</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Roll Number</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Reason</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Date From</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Date To</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {gatePasses.map((pass) => (
              <tr key={pass._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className="px-6 py-4 text-gray-900">{pass.roomNumber}</td>
                <td className="px-6 py-4 text-gray-900">{pass.studentName}</td>
                <td className="px-6 py-4 text-gray-900">{pass.rollNumber}</td>
                <td className="px-6 py-4 text-gray-900">{pass.reason}</td>
                <td className="px-6 py-4 text-gray-900">{new Date(pass.dateFrom).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-gray-900">{new Date(pass.dateTo).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-gray-900">{pass.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GatePass;
