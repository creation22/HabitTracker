
import React from 'react'

function Header() {
  return (
    <div className='display flex justify-between items-center bg-gray-800 text-white p-4'>
        <div className='text-3xl font-bold font-sans'>Habbit Tracker
        </div>
        <div className='display flex justify-around items-center space-x-4 mr-25' >    
            <div className='text-2xl font-style : italic '>Home</div>
            <div className='text-2xl font-style : italic ' >Streak</div>
      </div>
    </div>
  )
}

export default Header
