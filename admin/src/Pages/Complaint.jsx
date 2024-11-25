import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Complaint = () => {
    const [complaints, setComplaints] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/complaints');
                setComplaints(response.data);
            } catch (error) {
                setMessage('Error fetching complaints');
            }
        };

        fetchComplaints();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/complaints/${id}`, { status: newStatus });
            setComplaints((prev) =>
                prev.map((complaint) =>
                    complaint._id === id ? { ...complaint, status: newStatus } : complaint
                )
            );
            setMessage('Complaint status updated successfully');
        } catch (error) {
            setMessage('Error updating complaint status');
        }
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Manage Complaints</h2>
            {message && <div className="mb-4 text-center text-red-500">{message}</div>}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-gray-700 font-semibold">Room No</th>
                            <th className="px-6 py-3 text-left text-gray-700 font-semibold">Complaint</th>
                            <th className="px-6 py-3 text-left text-gray-700 font-semibold">Status</th>
                            <th className="px-6 py-3 text-left text-gray-700 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map((complaint) => (
                            <tr key={complaint._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                <td className="px-6 py-4 text-gray-900">{complaint.roomNo}</td>
                                <td className="px-6 py-4 text-gray-900">{complaint.complaint}</td>
                                <td className="px-6 py-4 text-gray-900">{complaint.status}</td>
                                <td className="px-6 py-4">
                                    <select
                                        value={complaint.status}
                                        onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                                        className="border border-gray-300 p-2 rounded-md"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Resolved">Resolved</option>
                                        <option value="Dismissed">Dismissed</option>
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

export default Complaint;
