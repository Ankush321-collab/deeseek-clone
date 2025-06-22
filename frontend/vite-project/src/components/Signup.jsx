import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formdata,setformdata]=useState({
    firstName:"",
    lastName:"",
    email:"",
    password:""
  })
  const[loading,setloading]=useState(false)

  const [error,seterror]=useState("")
  const navigate=useNavigate()

  const handlesignup = async() => {
    setloading(true)
    seterror("")
    try {
        const {data}=await axios.post(
            "http://localhost:5000/api/signup",
            {
                firstName:formdata.firstName,
                lastName:formdata.lastName,
                email:formdata.email,
                password:formdata.password 
            },
            {
                withCredentials:true,
            }

        );
        toast.success("signup successfull")
        navigate('/login')
      // your signup logic here
    } catch (error) {
        const msg=error?.response?.data?.errors || "signup failed"
        seterror(msg) 
        toast.error("something went wrong")
      // handle error here
    } finally {
        setloading(false)
      // optional cleanup code here
    }
  }
  const handlechange=(e)=>{
    const value=e.target.value;
    const name=e.target.name

    setformdata
    ({
        ...formdata,
        [name]:value
    })

  }
  

  return (
    <div className='bg-black min-h-screen w-full flex items-center justify-center px-4'>
      <div className='bg-gradient-to-b from-[#1e1e1e] to-[#121212] text-white w-full max-w-md rounded-2xl p-8 shadow-xl border border-gray-800'>
        {/* heading */}
        <h1 className='text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#7a6ff0] to-[#5e8bff] bg-clip-text text-transparent'>
          Create Your Account
        </h1>

        {/* firstname */}
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-300 mb-1'>First Name</label>
          <input 
            className='w-full bg-[#2a2a2a] border border-gray-700 rounded-lg px-4 py-3 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#7a6ff0] focus:border-transparent transition-all duration-200' 
            type="text" 
            name="firstName"
            placeholder='Enter your first name' 
            value={formdata.firstName}
            onChange={handlechange}
          />
        </div>

        {/* lastname */}
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-300 mb-1'>Last Name</label>
          <input 
            className='w-full bg-[#2a2a2a] border border-gray-700 rounded-lg px-4 py-3 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#7a6ff0] focus:border-transparent transition-all duration-200' 
            type="text" 
            name="lastName"
            placeholder='Enter your last name' 
            value={formdata.lastName}
            onChange={handlechange}
          />
        </div>

        {/* email */}
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-300 mb-1'>Email</label>
          <input 
            className='w-full bg-[#2a2a2a] border border-gray-700 rounded-lg px-4 py-3 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#7a6ff0] focus:border-transparent transition-all duration-200' 
            type="email"
            name="email" 
            placeholder='your@email.com' 
            value={formdata.email}
            onChange={handlechange}
          />
        </div>

        {/* password */}
        <div className='mb-6 relative'>
          <label className='block text-sm font-medium text-gray-300 mb-1'>Password</label>
          <input
            className='w-full bg-[#2a2a2a] border border-gray-700 rounded-lg px-4 py-3 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#7a6ff0] focus:border-transparent transition-all duration-200'
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder='Create a password'
            value={formdata.password}
            onChange={handlechange}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 mb-6 pr-3 flex items-center text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          <p className='text-xs text-gray-500 mt-1'>Use 8 or more characters</p>
          {error && <span className='text-red-600 ml-2 mt-2 block'>{error}</span>}
        </div>
        <div>
            
        </div>

        {/* terms and condition */}
        <div className='mb-6 text-sm text-gray-400'>
          <p>By signing up or logging in, you consent to DeepSeek's <a className='text-[#7a6ff0] hover:underline' href="https://cdn.deepseek.com/policies/en-US/deepseek-terms-of-use.html">Terms of Use</a> and <a className='text-[#7a6ff0] hover:underline' href="https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html">Privacy Policy</a>.</p>
        </div>

        {/* signup button */}
        <button onClick={handlesignup} className='w-full bg-gradient-to-r from-[#7a6ff0] to-[#5e8bff] text-white font-semibold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-[0_5px_15px_rgba(122,111,240,0.4)]'
        disabled={loading}       >
         {loading?"signing...":"Signup"}
         
        </button>

        {/* links */}
        <div className='mt-6 text-center text-sm text-gray-400'>
          Already have an account?{' '}
          <Link 
            to={'/login'} 
            className='text-[#7a6ff0] font-medium hover:underline'
          >
            Log in
          </Link>
        </div>

        {/* divider */}
        <div className='flex items-center my-6'>
          <div className='flex-grow border-t border-gray-700'></div>
     
          <div className='flex-grow border-t border-gray-700'></div>
        </div>

        
      </div>
    </div>
  )
}

export default Signup