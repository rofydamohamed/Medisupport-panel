import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Dashboarddoc from "./dashboard";

const Appointments = () => {
  return (
    <>
      <Helmet>
        <title>Appointments ♥</title>
        <meta name="description" content="Appointments" />
      </Helmet>
      <div className="">
        <Dashboarddoc />
        <div className="">
        
        </div>
      </div>
    </>
  );
};

export default Appointments;
