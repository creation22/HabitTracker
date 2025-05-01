import React, { useState } from 'react';
import { useHabbit } from '../context/HabbitContext';

function Home() {
  const { habits, addHabit, deleteHabit, editHabit } = useHabbit();
  const [habitInput, setHabitInput] = useState('');

  const handleAddHabit = () => {
    if (habitInput.trim()) {
      addHabit(habitInput.trim());
      setHabitInput('');
    }
  };

  const handleToggleCompletion = (id, completed) => {
    editHabit(id, { completed: !completed });
  };

  const handleEditHabit = (id, currentHabit) => {
    const newHabit = prompt('Edit habit:', currentHabit);
    if (newHabit !== null && newHabit.trim() !== '') {
      editHabit(id, { habit: newHabit.trim() });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-full">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto mt-8 mb-12">
        <h1 className="text-3xl font-bold mb-4 text-center text-purple-700">My Habits</h1>
        <p className="text-gray-600 mb-6 text-center">
          Track your daily habits and build consistency over time
        </p>

        <div className="flex items-center gap-3 mb-8">
          <input
            type="text"
            value={habitInput}
            onChange={(e) => setHabitInput(e.target.value)}
            placeholder="Enter a new habit..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddHabit();
            }}
          />
          <button
            onClick={handleAddHabit}
            className="bg-purple-600 hover:bg-purple-700 transition-colors rounded-lg text-white px-6 py-3 font-medium flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Habit
          </button>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Habit</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {habits.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{item.habit}</div>
                    <div className="text-sm text-gray-500">Started: {item.createdAt}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div 
                      className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                        item.completed 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      <button
                        className="flex items-center gap-1"
                        onClick={() => handleToggleCompletion(item.id, item.completed)}
                      >
                        {item.completed ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Completed
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                            </svg>
                            Pending
                          </>
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-md transition-colors"
                        onClick={() => handleEditHabit(item.id, item.habit)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition-colors"
                        onClick={() => deleteHabit(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {habits.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <p className="text-lg font-medium">No habits added yet</p>
                      <p className="text-sm">Add your first habit to get started!</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;