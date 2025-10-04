import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='bg-gray-800 text-white p-4 flex justify-around'>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
         
    </div>
  )
}

export default Navbar