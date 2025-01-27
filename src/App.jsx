//import { useState } from 'react'
//import reactLogo from './assets/react.svg'

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
//import viteLogo from '/vite.svg'
//import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import NavBarLayout from "./layouts/NavBarLayout";
import ErrorPage from "./pages/ErrorPage";
import MapPage from "./pages/MapPage";
import LoginPage from "./pages/LoginPage";
import PointsPage from "./pages/PointsPage";
import HomePage from "./pages/HomePage";
import { AuthProvider, useAuth } from "./context/AuthProvider";
import PointDetailPage from "./pages/PointDetailPage";
import UserProfile from "./pages/UserProfile";
import UserPoints from "./pages/UserPoints";

const pointsOfInterest = [];
const tmp = true;

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBarLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Navigate to="/home" replace />,
        },
        {
          path: "home",
          element: <HomePage />,
        },
        {
          path: "map",
          element: <MapPage />,
        },
        {
          path: "user-profile",
          element: <UserProfile />,
        },
        {
          path: "points",
          element: <PointsPage />,
        },
        {
          path: "point/:id",
          element: <PointDetailPage />,
        },
        {
          path: "user-points",
          element: <UserPoints/>,
        }
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);

  return (
    <div className="App">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
