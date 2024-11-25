import { useState } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Contact from './Pages/Contact'
import About from './Pages/About'
import StudentLogin from './Pages/studentLogin'
import StudentRegister from './Pages/StudentRegister'
import StudentDashboard from './Pages/StudentDashboard'
import ComplaintForm from './Components/ComplaintForm'
// import AdminLogin from './Pages/adminLogin'

function App() {
  return (
    <div className='w-screen'>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/student-login' element={<StudentLogin />} />
          <Route path='/register' element={<StudentRegister />} />
          <Route path='/student-dashboard' element={<StudentDashboard/>} />
          <Route path='/complaint-form' element={<ComplaintForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
