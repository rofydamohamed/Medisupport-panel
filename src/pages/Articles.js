import React from 'react';
import { Helmet } from "react-helmet-async";
import Dashboard from '../components/Dashboard';

const Articles = () => {
  return (
    <>
        <Helmet>
        <title>Contact ♥</title>
        <meta name="description" content="Contact" />
      </Helmet>
      <Dashboard />

    </>
  );
}

export default Articles;
