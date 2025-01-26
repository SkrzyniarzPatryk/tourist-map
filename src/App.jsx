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
import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { AuthProvider } from "./context/AuthProvider";
import PointDetailPage from "./pages/PointDetailPage";

const pointsOfInterest = [];
const tmp = true;

function App() {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const loginUser = () => {
    setIsUserLogged(true);
  };
  const logoutUser = () => {
    setIsUserLogged(false);
  };

  // useEffect(() => {
  //   <Navigate to="/home" />;
  // }, [isUserLogged]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <NavBarLayout isUserLogged={isUserLogged} logoutUser={logoutUser} />
      ),
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
          element: <MapPage pointsOfInterest={pointsOfInterest} />,
        },
        {
          path: "points",
          element: <PointsPage points={pointsOfInterest} />,
        },
        {
          path: "point/:id",
          element: <PointDetailPage />,
        },
      ],
    },
    {
      path: "/login",
      element: isUserLogged ? (
        <Navigate to="/home" />
      ) : (
        <LoginPage loginUser={loginUser} />
      ),
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
