import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/login'
import Signup from './components/signup'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './context/AuthContext'

function App() {
  const [authUser]=useAuth();
  

  return (
    <>
      <Routes>
        <Route path="/" element={authUser?<Home />:<Navigate to={'/login'}/>} />
        <Route path="/login" element={authUser?<Navigate to ='/'/>:<Login/>} /> 
        <Route path="/signup" element={authUser?<Navigate to ='/'/>:<Signup/>} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
