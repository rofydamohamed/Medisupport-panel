import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Dashboarddoc from "./dashboard";

const Makeappointment = () => {
  return (
    <>
      <Helmet>
        <title>Makeappointment ♥</title>
        <meta name="description" content="Makeappointment" />
      </Helmet>
      <div className="">
        <Dashboarddoc />
        <div className="">
        
        </div>
      </div>
    </>
  );
}

export default Makeappointment;
