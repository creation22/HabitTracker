import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './pages/Layout.jsx'
import Home from './pages/Home.jsx'
import Streak from './pages/Streak.jsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom'

import { HabbitProvider } from './context/HabbitContext' // 👈 import provider

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='streak' element={<Streak />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HabbitProvider>
      <RouterProvider router={router} />
    </HabbitProvider>
  </StrictMode>
)
