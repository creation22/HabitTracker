import React from "react";
import { useHabbit } from "../context/HabbitContext";

function Streak() {
  const { habits, editStreak } = useHabbit();

  const getLast30Days = () => {
    const days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split("T")[0]);
    }
    return days;
  };

  const last30Days = getLast30Days();
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getProgressColor = (streak) => {
    if (streak <= 0) return 'bg-gray-200';
    if (streak < 3) return 'bg-blue-500';
    if (streak < 7) return 'bg-green-500';
    if (streak < 14) return 'bg-yellow-500';
    return 'bg-purple-600';
  };

  const getProgressWidth = (streak, longest) => {
    if (longest <= 0) return '0%';
    const percentage = (streak / longest) * 100;
    return `${percentage}%`;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-full">
      <div className="max-w-4xl mx-auto my-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
          Habit Streak Calendar
        </h1>
        <p className="text-gray-600 mb-8 text-center max-w-xl mx-auto">
          Track your daily habit consistency. Click on a day to mark it as complete and build your streak!
        </p>

        {habits.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No Habits To Track</h2>
            <p className="text-gray-600">Add habits on the home page to start tracking your streaks</p>
          </div>
        ) : (
          habits.map((habit) => (
            <div key={habit.id} className="bg-white rounded-lg shadow-md mb-10 overflow-hidden">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <h3 className="text-xl font-semibold text-gray-800">{habit.habit}</h3>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>Last 30 Days</span>
                    <span>Today</span>
                  </div>
                  <div className="grid grid-cols-15 md:grid-cols-30 gap-1">
                    {last30Days.map((date) => {
                      const isCompleted = habit.streakDates?.includes(date);
                      const isToday = date === new Date().toISOString().split("T")[0];
                      
                      return (
                        <div key={date} className="relative">
                          <button
                            title={`${formatDate(date)}${isCompleted ? " - Completed" : ""}`}
                            className={`h-8 w-full rounded cursor-pointer transition-all ${
                              isCompleted 
                                ? "bg-green-500 hover:bg-green-600" 
                                : isToday 
                                  ? "bg-blue-100 hover:bg-blue-200 border-2 border-blue-400" 
                                  : "bg-gray-100 hover:bg-gray-200"
                            }`}
                            onClick={() => editStreak(habit.id, date)}
                          ></button>
                          {isToday && (
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 text-xs font-medium text-blue-600">
                              Today
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-1">Current Streak</div>
                    <div className="text-2xl font-bold">{habit.streak || 0} days</div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-1">Longest Streak</div>
                    <div className="text-2xl font-bold">{habit.longestStreak || 0} days</div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-1">Started On</div>
                    <div className="text-lg font-medium">
                      {habit.createdAt ? formatDate(habit.createdAt) : "N/A"}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Current Progress</span>
                    <span className="font-medium">{habit.streak || 0}/{habit.longestStreak || 0} days</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getProgressColor(habit.streak)}`}
                      style={{ width: getProgressWidth(habit.streak, habit.longestStreak || 1) }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Streak;