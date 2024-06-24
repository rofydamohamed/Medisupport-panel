import React from "react";
import { AuthProvider } from "./components/AuthContext";
//import ProtectedRoute from './components/ProtectedRoute';
import ReactDOM from "react-dom/client";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Dash from "./pages/dash";
import Dashdoc from "./pages/Doctor_pages/dashdoc";
import Dashboard from "./components/Dashboard";
import Dashboarddoc from "./pages/Doctor_pages/dashboard";
import Loginasadmin from "./pages/Login_as_admin";
import Loginasdoctor from "./pages/Login_as_doctor";
import Contactus from "./pages/Contact_us";
import Users from "./pages/Users";
import Articles from "./pages/Articles";
import Doctors from "./pages/Doctors";
import RegisterNewDoctor from "./pages/Register_New_Doctor";
import Loading from "./pages/loading";
import Chat from "./pages/Doctor_pages/chat";
import Patients from "./pages/Doctor_pages/patients"
import Appointments from "./pages/Doctor_pages/appointments"
import Article from "./pages/Doctor_pages/articles";
import Makeappointment from "./pages/Doctor_pages/makeappointment";
import Addappointment from "./pages/Doctor_pages/addappointment";
import Profile from "./pages/Doctor_pages/profile"
import Rooms from "./pages/Doctor_pages/rooms";
import Video from "./pages/Doctor_pages/video";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <h1>Sorry, No page to display....</h1>,
  },
  {
    path: "/video",
    element: <Video />,
    errorElement: <h1>Sorry, No page to display....</h1>,
  },
  {
    path: "/Dash",
    element: (
      <>
        <Dash />
      </>
    ),
    errorElement: <h1>Sorry, No page to display....</h1>,
  },
  {
    path: "/Loading",
    element: (
      <>
        <Loading />
      </>
    ),
    errorElement: <h1>Sorry, No page to display....</h1>,
  },
 
  {
    path: "/dashdoc",
    element: <Dashdoc />,
    errorElement: <h1>Sorry, No page to display....</h1>,
  },
  {
    path: "/dashboarddoc",
    element: <Dashboarddoc />,
    errorElement: <h1>Sorry, No page to display....</h1>,
  },
  {
    path: "/chat",
    element: <Chat />,
    errorElement: <h1>Sorry, No page to display....</h1>,
  },
  {
    path: "/patients",
    element: <Patients />,
    errorElement: <h1>Sorry, No page to display....</h1>,
  },
  {
    path: "appointments",
    element: <Appointments />,
    errorElement: <h1>Sorry, No page to display....</h1>,
  },
  {
    path: "/article",
    element: <Article />,
    errorElement: <h1>Sorry, No page to display....</h1>,
  },
  {
    path: "/Makeappointment",
    element: <Makeappointment />,
    errorElement: <h1>Sorry, No page to display....</h1>,
  },
  {
    path: "/addappointment",
    element: <Addappointment />,
    errorElement: <h1>Sorry, No page to display....</h1>,
  },
  {
    path: "/Profile",
    element: <Profile />,
    errorElement: <h1>Sorry, No page to display....</h1>,
  },
  {
    path: "/rooms",
    element: <Rooms />,
    errorElement: <h1>Sorry, No page to display....</h1>,
  },




  {
    path: "/logadmin",
    element: (
      <>
        <Loginasadmin />
      </>
    ),
    errorElement: <h1>Sorry, No page to display....</h1>,
  },
  {
    path: "/logdoc",
    element: <Loginasdoctor />,
    errorElement: <h1>Sorry, No page to display....</h1>,
  },
  {
    path: "/Contact",
    element: <Contactus/>,
    errorElement: <h1>Sorry, No page to display....</h1>,
  },
  {
    path: "/Users",
    element: <Users />,
    errorElement: <h1>Sorry, No page to display....</h1>,
  },
  {
    path: "/Loading",
    element: (
      <>
        <Loading />
      </>
    ),
    errorElement: <h1>Sorry, No page to display....</h1>,
  },
  {
    path: "/Articles",
    element: (
      <>
        <Articles />
      </>
    ),
    errorElement: <h1>Sorry, No page to display....</h1>,
  },
  {
    path: "/Doctors",
    element: (
      <>
        <Doctors />
      </>
    ),
    errorElement: <h1>Sorry, No page to display....</h1>,
  },
  {
    path: "/Register",
    element: (
      <>
        <RegisterNewDoctor />
      </>
    ),
    errorElement: <h1>Sorry, No page to display....</h1>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
