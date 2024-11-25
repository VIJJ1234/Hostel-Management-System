import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNo: '',
    password: '',
    roomNo: '',
    parentDetails: {
      name: '',
      email: '',
      phone: '',
    },
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('parentDetails')) {
      const [parent, field] = name.split('.');
      setFormData((prevData) => ({
        ...prevData,
        parentDetails: {
          ...prevData.parentDetails,
          [field]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/students/signup', formData);
      navigate('/student-login');
    } catch (error) {
      console.error('Registration error', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900">Register</h1>
        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-600 focus:border-violet-600 sm:text-sm"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-600 focus:border-violet-600 sm:text-sm"
              placeholder="Your Email"
              required
            />
          </div>
          <div>
            <label htmlFor="rollNo" className="block text-sm font-medium text-gray-700">Roll Number</label>
            <input
              id="rollNo"
              name="rollNo"
              type="text"
              value={formData.rollNo}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-600 focus:border-violet-600 sm:text-sm"
              placeholder="Roll Number"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-600 focus:border-violet-600 sm:text-sm"
              placeholder="Password"
              required
            />
          </div>
          <div>
            <label htmlFor="roomNo" className="block text-sm font-medium text-gray-700">Room Number</label>
            <input
              id="roomNo"
              name="roomNo"
              type="text"
              value={formData.roomNo}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-600 focus:border-violet-600 sm:text-sm"
              placeholder="Room Number"
              required
            />
          </div>
          <div>
            <label htmlFor="parentDetails.name" className="block text-sm font-medium text-gray-700">Parent's Name</label>
            <input
              id="parentDetails.name"
              name="parentDetails.name"
              type="text"
              value={formData.parentDetails.name}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-600 focus:border-violet-600 sm:text-sm"
              placeholder="Parent's Name"
              required
            />
          </div>
          <div>
            <label htmlFor="parentDetails.email" className="block text-sm font-medium text-gray-700">Parent's Email</label>
            <input
              id="parentDetails.email"
              name="parentDetails.email"
              type="email"
              value={formData.parentDetails.email}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-600 focus:border-violet-600 sm:text-sm"
              placeholder="Parent's Email"
              required
            />
          </div>
          <div>
            <label htmlFor="parentDetails.phone" className="block text-sm font-medium text-gray-700">Parent's Phone</label>
            <input
              id="parentDetails.phone"
              name="parentDetails.phone"
              type="text"
              value={formData.parentDetails.phone}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-600 focus:border-violet-600 sm:text-sm"
              placeholder="Parent's Phone"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-violet-600 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Register
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account? <span onClick={() => navigate('/login')} className="text-violet-600 cursor-pointer hover:underline">Login here</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
