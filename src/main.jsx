import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider, Route } from 'react-router-dom'

import App from './App';
import ErrorPage from "./error-page";
import './index.css'

import ThreeTorus from './three.torus';
import ThreeMolecules from './three.molecules';
import KinematicCube from './three.kinematicCube';
import ThreeSplineEditor from './three.spline-editor';
import ThreeToggleControls from './three.toggle-controls';
import ThreeSnapToGrid from './three.snap-to-grid';
import ThreeJotai from './three.jotai';

// Array of experiments and their properties
const links = [
  {title: 'First Test', url:'/three-first-test', date:"2022-11-14", desc:"A torus that can be spun around", element:<ThreeTorus/>, status:"Completed"},
  {title: 'Molecules', url:'/three-molecules', date:"2022-11-14", desc:"atoms float through space and connect with a line when close" , element:<ThreeMolecules/> , status:"In Progress"} ,
  {title: 'Kinematic Cube', url:'three-kinematic-cube', date:"2022-11-19", desc:"A moving cube knocks balls out of the way", element:<KinematicCube/> , status:"In Progress"},
  {title: 'Spline Editor', url:'three-spline-editor', date:"2022-11-26", desc:"A spline editor", element: <ThreeSplineEditor/> , status:"In Progress"},
  {title: 'Toggle transform controls on selected object', url:'three-toggle-controls', date:"2022-11-27", desc:"Select an object to toggle a control widget. Right click to cycle through the widgets", element: <ThreeToggleControls/> , status:"Completed"},
  {title: 'Snap to grid', url:'three-snap-to-grid', date:"2022-12-29", desc:"Drag an object around a grid and snap to the grid points", element: <ThreeSnapToGrid/> , status:"Completed"},
  {title: 'Jotai', url:'three-jotai', date:"2022-12-29", desc:"Drag an object around a grid and snap to the grid points", element: <ThreeJotai/> , status:"Completed"},


] 

const threeRoutes = links.map( l => {
  return {path:l.url, element:l.element, errorElement:<ErrorPage/> }
})
const router = createBrowserRouter([
  {
    path: "/",
    element: <App links={links} />,
    errorElement: <ErrorPage />
  },
  ...threeRoutes
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
