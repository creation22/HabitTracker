import React from 'react'

function Home() {
  return (
    <div className='p-6 bg-gray-200 min-h-screen'>
      <div className='bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto'>
        <h1 className='text-3xl font-bold mb-4 text-center text-gray-600'>Habbit Tracker</h1>
        <p className='text-gray-800 mb-6 text-center'> Welcome to the Habit Tracker app! Here you can track your habits and stay motivated.
        </p>
        <div className='flex items-center gap-3 mb-6 '>
          <input type="text " placeholder='Enter a new Habbit' className='flex-1 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900' />
          <button className='bg-green-600 hover:bg-green-800 rounded-lg text-white px-4 py-2 text-sm'>
            +Add Habbit
          </button>
        </div>
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-white border border-gray-300 rounded-lg shadow-md'> 
            <thead>
              <tr className='bg-gray-100 text-gray-600 text-left'>
              <th className="p-3 border">Habit</th>
                <th className="p-3 border text-center">Action</th>
                <th className="p-3 border">Setting</th>

              </tr>
            </thead>
            <tbody>
              {[
               { habit: "Exercise" },
               { habit: "Meditation" },
               { habit: "Reading" }
              ].map((item , idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                <td className="p-3 border">{item.habit}</td>
                <td className="p-3 border text-center">
                  <input type="checkbox" className="form-checkbox text-blue-500 h-5 w-5" />
                </td>
                <td className="p-3 border flex items-center gap-3">
                  <button className="bg-purple-600 hover:bg-purple-800 text-white px-3 py-1 rounded text-sm">Edit</button>
                  <button className="bg-green-600 hover:bg-green-800 text-white px-3 py-1 rounded text-sm">Delete</button>
                </td>
              </tr>
              ))}
            </tbody>

          </table>
        </div>
        
      </div>
      
    </div>
  )
}

export default Home
