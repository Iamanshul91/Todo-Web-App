import React from 'react'

const Navbar = () => {
  return (
    <main className='flex justify-between p-2 py-4 text-2 bg-orange-500'>
      <div className="logo">
        <h3 className='font-bold mx-4'>SeduleToDo</h3>
      </div>
      <ul className="menu flex gap-3 max-w-max mx-3">
        <li className='cursor-pointer hover:max-w-fit hover:font-bold transition-all ease duration-100'>Home</li>
        <li className='cursor-pointer hover:max-w-fit hover:font-bold transition-all ease duration-100'>Your Tasks</li>
      </ul>
    </main>
  )
}

export default Navbar
