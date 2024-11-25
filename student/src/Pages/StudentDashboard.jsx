import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FoodMenu from '../Components/FoodMenu';
import StudentProfile from '../Components/StudentProfile';
import GatePass from '../Components/GatePass'; // Assuming GatePassForm component is imported

const StudentDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const complaintsContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem('auth-token');
        if (!token) {
          throw new Error('User not authenticated');
        }

        const profileResponse = await axios.get('http://localhost:5000/api/students/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const studentId = profileResponse.data.id;
        if (!studentId) {
          throw new Error('Student ID not found');
        }

        const complaintsResponse = await axios.get(`http://localhost:5000/api/complaints?id=${studentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setComplaints(complaintsResponse.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleAddComplaint = () => {
    navigate('/complaint-form');
  };

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-center mt-4">Error: {error}</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      <div className="flex flex-1">
        {/* Left Side: Student Profile */}
        <div className="flex-1 bg-white shadow-xl rounded-lg p-6 border-t-4 border-blue-500 mr-4">
          <StudentProfile />
        </div>

        {/* Center: Food Menu */}
        <div className="flex-1 bg-white shadow-xl rounded-lg p-6 border-t-4 border-green-500 mx-4">
          <FoodMenu />
        </div>

        {/* Right Side: Complaints */}
        <div className="flex-1 bg-white shadow-xl rounded-lg p-6 border-t-4 border-red-500 ml-4">
          <div
            ref={complaintsContainerRef}
            className="h-96 overflow-auto"
          >
            <h2 className="text-2xl font-bold mb-4">Complaints</h2>
            {complaints.length === 0 ? (
              <div className="text-center">
                <p className="mb-4">No complaints filed yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <ul>
                  {complaints.map((complaint) => (
                    <li key={complaint._id} className="bg-gray-100 p-4 rounded-md shadow-sm">
                      <p><strong>Complaint:</strong> {complaint.complaint}</p>
                      <p><strong>Status:</strong> {complaint.status}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="text-center mt-4">
              <button
                onClick={handleAddComplaint}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Add New Complaint
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Gate Pass Form */}
      <div className="bg-white shadow-xl rounded-lg p-6 border-t-4 border-yellow-500 mt-4">
        <h2 className="text-2xl font-bold mb-4">Apply for Gate Pass</h2>
        <GatePass />
      </div>
    </div>
  );
};

export default StudentDashboard;
