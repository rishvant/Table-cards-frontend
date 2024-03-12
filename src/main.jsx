import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Table from './pages/tableData.jsx';
import Cards from './pages/cards.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Table />
  },
  {
    path: "/card",
    element:<Cards />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>,
)