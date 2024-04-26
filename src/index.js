import React from "react";
import { AuthProvider } from "./components/AuthContext";
//import ProtectedRoute from './components/ProtectedRoute';
import ReactDOM from "react-dom/client";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Dash from "./pages/dash";
import Dashboard from "./components/Dashboard";
import Loginasadmin from "./pages/Login_as_admin";
import Loginasdoctor from "./pages/Login_as_doctor";
import Contactus from "./pages/Contact_us";
import Users from "./pages/Users";
import Articles from "./pages/Articles";
import Doctors from "./pages/Doctors";
import RegisterNewDoctor from "./pages/Register_New_Doctor";
import Loading from "./pages/loading";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
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
    path: "/dashboard",
    element: <Dashboard />,
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
    path: "logdoc",
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
