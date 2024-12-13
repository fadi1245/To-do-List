import React from 'react'
import logo from '../assets/favicon.svg'
function Menu() {
  return (
 <>
 <div className="transition-all duration-300 ease-in-out w-[250px] sm:w-[250px] md:w-[300px] lg:w-[350px] bg-slate-900 h-[100vh]">
    <div className='flex ml-3 p-4'>
    <img src={logo} alt="" />
        <p className='text-3xl pl-5 pt-1'>TO-DO List</p>
    </div>
    <div className="flex flex-col items-center text-2xl gap-10 pt-20">
      <a href="" className='block'>Pending</a>
      <a href="" className='block'>Completed</a>
      <a href="" className='block'>Important</a>
      <a href="" className='block'>All tasks</a>
    </div>
 </div>
 </>
  )
}

export default Menu
