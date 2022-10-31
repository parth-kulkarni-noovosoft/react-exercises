import React from 'react'
import ReactDOM from 'react-dom/client'
import MainDemo from './routes/MainDemo'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import UseMemoDemo from './routes/UseMemoDemo';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div className='box'>
      <a className='box' href="/main-demo">Main Demo</a>
      <a className='box' href="/use-memo-demo">Use Memo Demo</a>
    </div>
  },
  {
    path: '/main-demo',
    element: <MainDemo />
  },
  {
    path: '/use-memo-demo',
    element: <UseMemoDemo />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
