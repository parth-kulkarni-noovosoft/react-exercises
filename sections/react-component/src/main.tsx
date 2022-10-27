import React from 'react'
import ReactDOM from 'react-dom/client'
import LifeCycleDemo from './routes/lifecycle'
import ClassPropertiesDemo from './routes/classProperties'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>
      <a className='link' href="/life-cycle">Life Cycle</a>
      <a className='link' href="/class-properties">Class Properties</a>
    </div>
  },
  {
    path: '/class-properties',
    element: <ClassPropertiesDemo />
  },
  {
    path: "/life-cycle",
    element: <LifeCycleDemo />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
