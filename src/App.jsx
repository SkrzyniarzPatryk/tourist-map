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

const pointsOfInterest = [
  {
    name: "Parafia Prawosławna",
    position: [50.871848299559176, 20.63844948247584],
    description: "Parafia Prawosławna p.w. Św. Mikołaja.",
  },
  {
    name: "Politechnika Świętokrzyska",
    position: [50.87884392604276, 20.640082962655097],
    description: "Idealne miejsce na nauke.",
  },
  {
    name: "Rezerwat Skalny Ślichowice",
    position: [50.886771479833776, 20.588036449591307],
    description: "Idealne miejsce na spacer.",
  },
  {
    name: "Geonatura Kielce - Ogród Botaniczny",
    position: [50.86789338714975, 20.59837140758464],
    description: "Idealne miejsce na spacer.",
  },
];

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBarLayout />,
      errorElement: <ErrorPage />,
      children: [
        // {
        //   path: '/',
        //   element: <Navigate to="/home" replace />,
        // },
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
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
