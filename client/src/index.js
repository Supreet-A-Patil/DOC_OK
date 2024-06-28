import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from "./routes/home";
import SpecialityPage from "./routes/speciality";
import BookAppointmentPage from "./routes/book-appointment";
import LoginPage from "./routes/login";
import SignupPage from "./routes/signup";
import AppointmentStatus from "./routes/appointment-status"
import './styles/index.css';
import './styles/home.css';
import './styles/book-appointment.css';
import './styles/appoitment-status.css';
import ErrorPage from "./error-page";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
    errorElement: <ErrorPage />,
  },
  {
    path:"book-appointment",
    element: <BookAppointmentPage/>,
  },
  {
    path:"login",
    element: <LoginPage/>,
  },
  {
    path:"signup",
    element: <SignupPage/>,
  },
  {
    path:"appointment-status",
    element: <AppointmentStatus/>,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);
