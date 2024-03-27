import React from "react";
import { AuthProvider } from "./components/AuthContext";
//import ProtectedRoute from './components/ProtectedRoute';
import ReactDOM from "react-dom";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Loginasadmin from "./pages/Login_as_admin";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Loginasdoctor from "./pages/Login_as_doctor";
import Contactus from "./pages/Contact_us";
import Users from "./pages/Users";
import Articles from "./pages/Articles";
import Doctors from "./pages/Doctors";
import RegisterNewDoctor from "./pages/Register_New_Doctor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <h1>Sorry, No page to display....</h1>,
  },
  {
    path: "/src/pages/Login_as_admin.js",
    element: (
      <>
        <Loginasadmin />
      </>
    ),
    errorElement: <h1>Sorry, No page to display....</h1>,
  },
  {
    path: "",
    element: (
      <>
        <Sidebar />
      </>
    ),
    errorElement: <h1>Sorry, No page to display....</h1>,
  },
  {
    path: "",
    element: <Dashboard />,
    errorElement: <h1>Sorry, No page to display....</h1>,
  },
  {
    path: "",
    element: <Loginasdoctor />,
    errorElement: <h1>Sorry, No page to display....</h1>,
  },
  {
    path: "",
    element: <Contactus/>,
    errorElement: <h1>Sorry, No page to display....</h1>,
  },
  {
    path: "",
    element: <Users />,
    errorElement: <h1>Sorry, No page to display....</h1>,
  },
  {
    path: "",
    element: (
      <>
        <Articles />
      </>
    ),
    errorElement: <h1>Sorry, No page to display....</h1>,
  },
  {
    path: "",
    element: (
      <>
        <Doctors />
      </>
    ),
    errorElement: <h1>Sorry, No page to display....</h1>,
  },
  {
    path: "",
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
