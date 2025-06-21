import React from 'react'
import { Link } from 'react-router-dom'
 
    
const Login = () => {
  return (
    <div className='bg-black min-h-screen w-full flex items-center justify-center px-4'>
      <div className='bg-gradient-to-b from-[#1e1e1e] to-[#121212] text-white w-full max-w-md rounded-2xl p-8 shadow-xl border border-gray-800'>
        {/* heading */}
        <h1 className='text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#7a6ff0] to-[#5e8bff] bg-clip-text text-transparent'>
Login
        </h1>

       


        {/* email */}
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-300 mb-1'>Email</label>
          <input 
            className='w-full bg-[#2a2a2a] border border-gray-700 rounded-lg px-4 py-3 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#7a6ff0] focus:border-transparent transition-all duration-200' 
            type="email" 
            placeholder='your@email.com' 
          />
        </div>

        {/* password */}
        <div className='mb-6'>
          <label className='block text-sm font-medium text-gray-300 mb-1'>Password</label>
          <input 
            className='w-full bg-[#2a2a2a] border border-gray-700 rounded-lg px-4 py-3 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#7a6ff0] focus:border-transparent transition-all duration-200' 
            type="password" 
            placeholder='Create a password'
          />
          <p className='text-xs text-gray-500 mt-1'>Use 8 or more characters</p>
        </div>

        {/* terms and condition */}
        <div className='mb-6 text-sm text-gray-400'>
          <p>By signing up or logging in, you consent to DeepSeek's <a className='text-[#7a6ff0] hover:underline' href="https://cdn.deepseek.com/policies/en-US/deepseek-terms-of-use.html">Terms of Use</a> and <a className='text-[#7a6ff0] hover:underline' href="https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html">Privacy Policy</a>.</p>
        </div>

        {/* signup button */}
        <button className='w-full bg-gradient-to-r from-[#7a6ff0] to-[#5e8bff] text-white font-semibold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-[0_5px_15px_rgba(122,111,240,0.4)]'>
          Login
        </button>

        {/* links */}
        <div className='mt-6 text-center text-sm text-gray-400'>
          Don't have an account?{' '}
          <Link 
            to={'/signup'} 
            className='text-[#7a6ff0] font-medium hover:underline'
          >
            signup
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

export default Login