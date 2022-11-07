import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './routes/Home'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import './index.css'
import Cart from './routes/Cart'
import { UserProvider } from './context/user'
import Layout from './Layout/Layout'

const router = createBrowserRouter([{
  element: <Layout />,
  children: [{
    path: '/',
    element: <Home />
  },
  {
    path: '/cart',
    element: <Cart />
  }]
}])

const Main: React.FC = () => {
  return (
    <React.StrictMode>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Main />)
