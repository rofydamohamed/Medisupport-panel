import React from 'react';
import { Helmet } from "react-helmet-async";
import Dashboard from '../components/Dashboard';
const Users = () => {
  return (
    <>
        <Helmet>
        <title>Users ♥</title>
        <meta name="description" content="Users" />
      </Helmet>
      <Dashboard />
    </>
  );
}

export default Users;
