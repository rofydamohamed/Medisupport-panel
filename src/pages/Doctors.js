import React from 'react';
import Dashboard from '../components/Dashboard';
import { Helmet } from "react-helmet-async";

const Doctors = () => {
  return (
    <>
      <Helmet>
        <title>Doctors ♥</title>
        <meta name="description" content="Doctors" />
      </Helmet>
      <Dashboard />

    </>
  );
}

export default Doctors;
