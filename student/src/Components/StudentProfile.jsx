import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentProfile = () => {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudentProfile = async () => {
            try {
                const token = localStorage.getItem('auth-token');
                if (!token) {
                    throw new Error('User not authenticated');
                }
                console.log('Token:', token); // Debugging: Log token

                const response = await axios.get('http://localhost:5000/api/students/profile', {
                    headers: {
                        Authorization: token,
                    },
                });

                console.log('Student Profile Response:', response.data); // Debugging: Log response data

                setStudent(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching student profile:', error.message); // Debugging: Log error
                setError(error.message);
                setLoading(false);
            }
        };

        fetchStudentProfile();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!student) return <div>No student data found.</div>;

    return (
        <div className="container mx-auto p-6 bg-gradient-to-r from-purple-50 to-purple-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">Student Profile</h1>
            <div className="bg-white shadow-xl rounded-lg max-w-xl mx-auto p-6">
                {[
                    { label: 'Name', value: student.name },
                    { label: 'Roll No', value: student.rollNo },
                    { label: 'Email', value: student.email },
                    { label: 'Room No', value: student.roomNo },
                    { label: 'Parent Name', value: student.parentDetails?.name || '' },
                    { label: 'Parent Email', value: student.parentDetails?.email || '' },
                    { label: 'Parent Phone', value: student.parentDetails?.phone || '' }
                ].map((field, index) => (
                    <div key={index} className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">{field.label}</label>
                        <input
                            type="text"
                            value={field.value}
                            className="w-full border border-gray-300 p-3 rounded-md bg-gray-50"
                            readOnly
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentProfile;
