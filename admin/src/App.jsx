import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './Components/Navbar'
import AdminDashboard from './Components/AdminDashboard'
import Complaint from './Pages/Complaint'
import FoodMenu from './Pages/FoodMenu'
import Students from './Pages/Students'
import GatePass from './Pages/GatePass'

function App() {
  return (
    <div className='w-screen overflow-x-hidden'>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<AdminDashboard />} />
          <Route path='/complaint' element={<Complaint />} />
          <Route path='/food' element={<FoodMenu />} />
          <Route path='/student-list' element={<Students />} />
          <Route path='/gatepass' element={<GatePass />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
