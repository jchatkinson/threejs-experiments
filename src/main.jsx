import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThreeTest from './three.test';
import ErrorPage from "./error-page";
import './index.css'

import {createBrowserRouter, RouterProvider, Route } from 'react-router-dom'

const links = [
  {title: 'Three Test 1', url:'/three-test', date:"2022-11-14", desc:"A torus that can be spun around"},
  {title: 'Three Test 1', url:'/three-test', date:"2022-11-14", desc:"A torus that can be spun around"},


] 

const router = createBrowserRouter([
  {
    path: "/",
    element: <App links={links} />,
    errorElement: <ErrorPage />
  },
  {
    path: "/three-test",
    element: <ThreeTest />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
