import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Dashboarddoc from "./dashboard";

const Patients = () => {
  return (
    <>
      <Helmet>
        <title>Patients ♥</title>
        <meta name="description" content="Patients" />
      </Helmet>
      <div className="">
        <Dashboarddoc />
        <div className="">
        
        </div>
      </div>
    </>
  );
}

export default Patients;
