import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LifecycleDemo from './routes/lifecycle'
import ClassPropertiesDemo from './routes/classProperties'
import InstancePropertiesDemo from './routes/instanceProperties';
import SetStateDemo from './routes/setState';

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>
      <a className='link' href="/lifecycle">Lifecycle</a>
      <a className='link' href="/class-properties">Class Properties</a>
      <a className='link' href="/instance-properties">Instance Properties</a>
      <a className='link' href="/set-state">Set State</a>
    </div>
  },
  {
    path: '/class-properties',
    element: <ClassPropertiesDemo />
  },
  {
    path: "/lifecycle",
    element: <LifecycleDemo />
  },
  {
    path: '/instance-properties',
    element: <InstancePropertiesDemo />
  },
  {
    path: '/set-state',
    element: <SetStateDemo />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
