import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <div className='flex justify-around p-3 shadow-[0px_1px_3px_-2px_rgb(0,0,0)] w-full'>
      <div className="flex items-center gap-3">
        {/* <img src={logo} alt="Logo" /> */}
        <p className='text-violet-900 text-4xl font-semibold'>Admin</p>
      </div>
      <ul className="flex items-center gap-12 list-none text-gray-700 text-xl font-normal">
        <li className='flex flex-col items-center justify-center gap-1 cursor-pointer'>
          <Link to='/' className={location.pathname === '/' ? 'text-red-700' : ''}>Home</Link>
          {location.pathname === '/' && <hr className="border-none w-4/5 h-1 rounded-lg bg-red-700"></hr>}
        </li>
        <li className='flex flex-col items-center justify-center gap-1 cursor-pointer'>
          <Link to='/complaint' className={location.pathname === '/contact' ? 'text-red-700' : ''}>Complaints</Link>
          {location.pathname === '/contact' && <hr className="border-none w-4/5 h-1 rounded-lg bg-red-700"></hr>}
        </li>
        <li className='flex flex-col items-center justify-center gap-1 cursor-pointer'>
          <Link to='/food' className={location.pathname === '/about' ? 'text-red-700' : ''}>Food Menu</Link>
          {location.pathname === '/about' && <hr className="border-none w-4/5 h-1 rounded-lg bg-red-700"></hr>}
        </li>
        <li className='flex flex-col items-center justify-center gap-1 cursor-pointer'>
          <Link to='/student-list' className={location.pathname === '/student-login' ? 'text-red-700' : ''}>Student List</Link>
          {location.pathname === '/student-login' && <hr className="border-none w-4/5 h-1 rounded-lg bg-red-700"></hr>}
        </li>
        <li className='flex flex-col items-center justify-center gap-1 cursor-pointer'>
          <Link to='/gatepass' className={location.pathname === '/admin-login' ? 'text-red-700' : ''}>Gate Pass</Link>
          {location.pathname === '/admin-login' && <hr className="border-none w-4/5 h-1 rounded-lg bg-red-700"></hr>}
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
