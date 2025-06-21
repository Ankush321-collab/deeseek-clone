import React, { useState } from 'react'
import { LogOut, Plus, X } from 'lucide-react'
import profile from "../../public/user.png"


const Sidebar = () => {
  
  return (
    <div className='p-4 h-full flex flex-col bg-[#232327]'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <div className='text-2xl'>deepseek</div>
        <button className='p-1.5 rounded-md hover:bg-gray-700'>
          <X className='w-5 h-5' />
        </button>
      </div>

      {/* New Chat Button */}
      <button className='flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-xl'>
        <Plus size={20} />
        <span>New chat</span>
      </button>

      {/* No chat history */}
      <div className='flex-1 overflow-y-auto mt-6 flex flex-row items-center'>
        <button className='w-full bg-indigo-600 hover:bg-indigo-500 rounded-xl py-2 px-4 text-white  '>
          No chat history
        </button>
      </div>

      {/* Footer */}
      <div className='border-t border-gray-700 mt-4 pt-4'>
        {/* Footer content can be added here */}
<div className='flex flex-col gap-3'>
  <div className='flex items-center gap-2 cursor-pointer'>
    
      <img  className='rounded-full w-8 h-8'src={profile} alt="" />
      <span className='text-gray-300'>My profile</span>
      </div>
      <button className='flex items-center gap-2 text-white px-4 py-2 rounded-lg hover:bg-gray-700 duration-300 transition'>
        <LogOut className=''/>LogOut
      </button>
      </div>
</div>
      </div>
    
  )
}

export default Sidebar
