import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/login'
import Signup from './components/signup'


function App() {

  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} /> 
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    
  )
}

export default App
