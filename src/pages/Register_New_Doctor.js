import React from 'react';
import { Helmet } from "react-helmet-async";
import Dashboard from '../components/Dashboard';

const RegisterNewDoctor = () => {
  return (
    <>
        <Helmet>
        <title>Register ♥</title>
        <meta name="description" content="Register" />
      </Helmet>
      <Dashboard />
    </>
  );
}

export default RegisterNewDoctor;
