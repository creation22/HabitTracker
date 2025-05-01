import { useState } from 'react'
import './App.css'
import { HabbitProvider } from './context/HabbitContext'
import { Analytics } from "@vercel/analytics/react"
import { 
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Streak from './pages/Streak'

function App() {
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem('habits');
    return savedHabits ? JSON.parse(savedHabits) : [
      {
        id: 1,
        habit: "Read Book",
        createdAt: new Date().toISOString().split('T')[0],
        streakDates: [],
        streak: 0,
        longestStreak: 0,
        completed: false
      }
    ];
  });

  // Save habits to localStorage whenever they change
  useState(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  // Context functions
  const addHabit = (habit) => {
    const newHabit = {
      id: Date.now(),
      habit: habit,
      createdAt: new Date().toISOString().split('T')[0],
      streakDates: [],
      streak: 0,
      longestStreak: 0,
      completed: false
    };
    
    setHabits(prev => [newHabit, ...prev]);
  };

  const deleteHabit = (id) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
  };

  const editHabit = (id, updatedHabit) => {
    setHabits(prev => 
      prev.map(habit => 
        habit.id === id ? { ...habit, ...updatedHabit } : habit
      )
    );
  };

  const editStreak = (id, date) => {
    setHabits(prev => {
      return prev.map(habit => {
        if (habit.id === id) {
          const streakDates = [...(habit.streakDates || [])];
          const dateIndex = streakDates.indexOf(date);
          
          if (dateIndex >= 0) {
            streakDates.splice(dateIndex, 1);
          } else {
            streakDates.push(date);
          }
          
          // Calculate streak and longest streak
          const sortedDates = [...streakDates].sort((a, b) => new Date(a) - new Date(b));
          let currentStreak = 0;
          let longestStreak = habit.longestStreak || 0;
          let prevDate = null;
          
          sortedDates.forEach(dateStr => {
            const curDate = new Date(dateStr);
            if (prevDate) {
              const diffDays = Math.round((curDate - prevDate) / (1000 * 60 * 60 * 24));
              if (diffDays === 1) {
                currentStreak++;
              } else {
                currentStreak = 1;
              }
            } else {
              currentStreak = 1;
            }
            
            if (currentStreak > longestStreak) {
              longestStreak = currentStreak;
            }
            
            prevDate = curDate;
          });
          
          return {
            ...habit,
            streakDates,
            streak: currentStreak,
            longestStreak
          };
        }
        return habit;
      });
    });
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='streak' element={<Streak />} />
      </Route>
    )
  );

  return (
    <HabbitProvider value={{ habits, addHabit, deleteHabit, editHabit, editStreak }}>
      <RouterProvider router={router} />
      <Analytics/>
    </HabbitProvider>
  );
}

export default App;