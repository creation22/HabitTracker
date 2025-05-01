import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Layout from './pages/Layout.jsx'
import Home from './pages/Home.jsx'
import Streak from './pages/Streak.jsx'
import { createBrowserRouter, createRoutesFromElements, RouterProvider ,Route} from 'react-router-dom'

import { Router } from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = '/'element = {<Layout/>}>
      <Route path = '' element= {<Home/>}></Route>
      <Route path='streak' element = {<Streak/>}></Route>   
      
    </Route> )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
