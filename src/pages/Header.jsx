import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation();
  
  return (
    <header className='flex justify-between items-center bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-4 shadow-md'>
      <div className='text-3xl font-bold font-sans tracking-wide'>
        Habit Tracker
      </div>
      <nav className='flex items-center space-x-6 mr-4'>    
        <Link 
          to="/" 
          className={`text-xl transition-all hover:text-purple-200 ${
            location.pathname === '/' ? 'font-bold border-b-2 border-white' : 'font-normal'
          }`}
        >
          Home
        </Link>
        <Link 
          to="/streak" 
          className={`text-xl transition-all hover:text-purple-200 ${
            location.pathname === '/streak' ? 'font-bold border-b-2 border-white' : 'font-normal'
          }`}
        >
          Streak
        </Link>
      </nav>
    </header>
  )
}

export default Header