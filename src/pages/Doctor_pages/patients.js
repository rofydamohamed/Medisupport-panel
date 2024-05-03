import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Dashboarddoc from "./dashboard";
import "./patients.css";

const Patients = () => {
  return (
    <>
      <Helmet>
        <title>Patients ♥</title>
        <meta name="description" content="Patients" />
      </Helmet>
      <div className="Patients">
        <Dashboarddoc />
        <div className="Patients-content">
        <h1>Patients</h1>
        </div>
      </div>
    </>
  );
}

export default Patients;
