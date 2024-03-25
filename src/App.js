import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { AuthProvider } from './components/AuthContext'; 
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
