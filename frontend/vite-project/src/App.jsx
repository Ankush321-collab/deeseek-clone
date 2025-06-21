import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/login'
import Signup from './components/signup'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} /> 
        <Route path="/signup" element={<Signup/>} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
