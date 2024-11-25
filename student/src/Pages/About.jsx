import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* <div className="bg-blue-600 text-white text-center py-4">
          <h1 className="text-3xl font-bold">About Us</h1>
        </div> */}
        <div className="p-6">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
            <p className="text-gray-700 leading-relaxed">
            The Hostel Management System project is a comprehensive solution built using the MERN stack, comprising MongoDB, Express, React, and Node.js. This system streamlines the management of hostel operations, including student registration, login, and profile management with secure JWT authentication. The frontend, crafted with React and styled using Tailwind CSS, features a user-friendly interface that displays daily food menus, handles complaints, and manages gate pass applications. The backend, powered by Express and MongoDB, ensures robust data handling and seamless API integrations, offering functionalities for creating, retrieving, and updating complaints, as well as displaying student lists and managing gate pass statuses. This project aims to enhance the efficiency and user experience of hostel administration.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <div className="flex flex-wrap ">
              <div className="w-[300px] p-1">
                <div className="bg-gray-200 p-4 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold">Tarun Kataruka</h3>
                  <p className="text-gray-700">Software Engineer</p>
                </div>
              </div>
              <div className="w-[300px] p-1">
                <div className="bg-gray-200 p-4 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold">Varnit Raina</h3>
                  <p className="text-gray-700">Software Engineer</p>
                </div>
              </div>
              <div className="w-[300px] p-1">
                <div className="bg-gray-200 p-4 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold">Tarun</h3>
                  <p className="text-gray-700">Software Engineer</p>
                </div>
              </div>
              <div className="w-[300px] p-1">
                <div className="bg-gray-200 p-4 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold">Valmiki Vijay Kumar</h3>
                  <p className="text-gray-700">Software Engineer</p>
                </div>
              </div>
            </div>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>React</li>
              <li>Tailwind CSS</li>
              <li>Node.js</li>
              <li>Express.js</li>
              <li>MongoDB Database</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
