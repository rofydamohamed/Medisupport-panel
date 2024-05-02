import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Dashboarddoc from "./dashboard";

const Dashdoc = () => {
  return (
    <>
      <Helmet>
        <title>Dashdoc ♥</title>
        <meta name="description" content="Dashdoc" />
      </Helmet>
      <div className="">
        <Dashboarddoc />
        <div className="">
        
        </div>
      </div>
    </>
  );
}

export default Dashdoc;
