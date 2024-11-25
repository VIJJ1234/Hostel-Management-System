import React, { useState, useEffect } from 'react';
import './Admin.css';

import photo1 from '/Images/hostel2.webp';
import photo2 from '/Images/hostel1.jpg';
import photo3 from '/Images/hostel3.png';
import photo4 from '/Images/hostel4.png';
import photo5 from '/Images/hostel5.jpeg';
const photos = [photo1, photo2, photo3, photo4, photo5];

const AdminDasboard = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) =>
        prevIndex === photos.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="home-container "
      style={{ backgroundImage: `url(${photos[currentPhotoIndex]})` }}
    >
      <header className="home-header">
        <h1>WELCOME WARDEN</h1>
      </header>
      {/* <section className="home-content">
        <div className="home-card">
          <h2>About</h2>
        </div>  
        <div className="home-card">
          <h2>Contact</h2>
        </div>
        <div className="home-card">
          <h2>Register</h2>
        </div>
        <div className="home-card">
          <h2>Student Login</h2>
        </div>
      </section> */}
      <footer className="home-footer">
        <p>&copy; 2024 Hostel Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminDasboard;
