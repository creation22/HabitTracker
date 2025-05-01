import React from "react";
import { useHabbit } from "../context/HabbitContext";

function Streak() {
  const { habits, editHabbit } = useHabbit();

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

  const calculateStreaks = (dates) => {
    const sorted = [...dates].sort((a, b) => new Date(a) - new Date(b));
    let currentStreak = 0, longestStreak = 0;
    let prevDate = null;

    sorted.forEach((dateStr) => {
      const date = new Date(dateStr);
      if (prevDate) {
        const diff = (date - prevDate) / (1000 * 60 * 60 * 24);
        if (diff === 1) {
          currentStreak++;
        } else {
          currentStreak = 1;
        }
      } else {
        currentStreak = 1;
      }
      if (currentStreak > longestStreak) longestStreak = currentStreak;
      prevDate = date;
    });

    return { currentStreak, longestStreak };
  };

  const toggleDate = (habit, date) => {
    const dates = habit.streakDates || [];
    let updatedDates;

    if (dates.includes(date)) {
      updatedDates = dates.filter((d) => d !== date);
    } else {
      updatedDates = [...dates, date];
    }

    const { currentStreak, longestStreak } = calculateStreaks(updatedDates);

    editHabbit(habit.id, {
      streakDates: updatedDates,
      streak: currentStreak,
      longestStreak,
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
        Habit Streak Calendar
      </h2>

      {habits.map((habit) => (
        <div key={habit.id} className="mb-10">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">{habit.habit}</h3>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {last30Days.map((date) => {
              const isCompleted = habit.streakDates?.includes(date);
              return (
                <div
                  key={date}
                  title={isCompleted ? "Completed" : "Not completed"}
                  className={`h-8 w-8 rounded cursor-pointer border ${
                    isCompleted ? "bg-green-500" : "bg-gray-300"
                  }`}
                  onClick={() => toggleDate(habit, date)}
                ></div>
              );
            })}
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <p><strong>Started on:</strong> {habit.createdAt || "N/A"}</p>
            <p><strong>Current Streak:</strong> {habit.streak || 0} day(s)</p>
            <p><strong>Longest Streak:</strong> {habit.longestStreak || 0} day(s)</p>
          </div>
        </div>
      ))}

      {habits.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No habits tracked yet.</p>
      )}
    </div>
  );
}

export default Streak;
