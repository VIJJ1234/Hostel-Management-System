import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GatePass = () => {
  const [gatePasses, setGatePasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGatePasses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/gatePass');
        setGatePasses(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchGatePasses();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/gatePass/${id}`, { status: newStatus });
      setGatePasses((prev) =>
        prev.map((pass) => (pass._id === id ? { ...pass, status: newStatus } : pass))
      );
    } catch (error) {
      setError('Error updating status');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Gate Passes</h1>
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
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {gatePasses.map((gatePass) => (
              <tr key={gatePass._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className="px-6 py-4 text-gray-900">{gatePass.roomNumber}</td>
                <td className="px-6 py-4 text-gray-900">{gatePass.studentName}</td>
                <td className="px-6 py-4 text-gray-900">{gatePass.rollNumber}</td>
                <td className="px-6 py-4 text-gray-900">{gatePass.reason}</td>
                <td className="px-6 py-4 text-gray-900">{new Date(gatePass.dateFrom).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-gray-900">{new Date(gatePass.dateTo).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-gray-900">{gatePass.status}</td>
                <td className="px-6 py-4 text-gray-900">
                  <select
                    value={gatePass.status}
                    onChange={(e) => handleStatusChange(gatePass._id, e.target.value)}
                    className="border border-gray-300 p-2 rounded-md"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GatePass;
