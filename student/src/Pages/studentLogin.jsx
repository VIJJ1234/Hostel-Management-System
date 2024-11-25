import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem('auth-token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/students/login', {
        email,
        password,
      });
      localStorage.setItem('auth-token', response.data.token);
      setIsAuthenticated(true);
      navigate('/student-dashboard');
    } catch (error) {
      console.error('Login error', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900">{isAuthenticated ? 'Welcome' : 'Login'}</h1>
        {isAuthenticated ? (
          <div className="space-y-6">
            <div>
              <button
                onClick={handleLogout}
                className="w-full py-2 text-white bg-violet-600 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-600 focus:border-violet-600 sm:text-sm"
                placeholder="Your Email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-600 focus:border-violet-600 sm:text-sm"
                placeholder="Password"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 text-white bg-violet-600 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Login
              </button>
            </div>
          </form>
        )}
        {!isAuthenticated && (
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account? <span onClick={() => navigate('/register')} className="text-violet-600 cursor-pointer hover:underline">Register here</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentLogin;
