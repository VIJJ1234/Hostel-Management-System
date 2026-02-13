import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('auth-token');

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    navigate('/');
  };

  return (
    <div className="flex justify-around p-1 shadow-[0px_1px_3px_-2px_rgb(0,0,0)] w-screen">
      
      {/* Logo */}
      <div className="flex items-center gap-3">
        <p className="text-violet-900 text-4xl font-semibold">NRI Hostel</p>
      </div>

      {/* Menu */}
      <ul className="flex items-center gap-12 list-none text-gray-700 text-xl font-normal">

        <li className="flex flex-col items-center gap-1">
          <Link to="/" className={location.pathname === '/' ? 'text-red-700' : ''}>Home</Link>
          {location.pathname === '/' && <hr className="w-4/5 h-1 bg-red-700 rounded-lg" />}
        </li>

        <li className="flex flex-col items-center gap-1">
          <Link to="/contact" className={location.pathname === '/contact' ? 'text-red-700' : ''}>Contact Us</Link>
          {location.pathname === '/contact' && <hr className="w-4/5 h-1 bg-red-700 rounded-lg" />}
        </li>

        <li className="flex flex-col items-center gap-1">
          <Link to="/about" className={location.pathname === '/about' ? 'text-red-700' : ''}>About Us</Link>
          {location.pathname === '/about' && <hr className="w-4/5 h-1 bg-red-700 rounded-lg" />}
        </li>

        {/* Student Dashboard Button (NEW) */}
        {isLoggedIn && (
          <li>
            <button
              onClick={() => navigate('/student-dashboard')}
              className="h-14 w-44 text-black "
            >
              Student Dashboard
            </button>
          </li>
        )}

        {/* Login / Logout */}
        <li>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="h-14 w-40 rounded-3xl border-2 text-slate-600 bg-white hover:bg-orange-500 font-medium"
            >
              Logout
            </button>
          ) : (
            <Link to="/student-login">
              <button className="h-14 w-40 rounded-3xl border-2 text-slate-600 bg-white hover:bg-orange-500 font-medium">
                Login
              </button>
            </Link>
          )}
        </li>

        <li className="flex flex-col items-center gap-1">
          <Link to="/register" className={location.pathname === '/register' ? 'text-red-700' : ''}>Register</Link>
          {location.pathname === '/register' && <hr className="w-4/5 h-1 bg-red-700 rounded-lg" />}
        </li>

      </ul>
    </div>
  );
};

export default Navbar;
