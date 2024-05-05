import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Dashboarddoc from "./dashboard";

const Rooms = () => {
  return (
    <>
      <Helmet>
        <title>Rooms ♥</title>
        <meta name="description" content="Rooms" />
      </Helmet>
      <div className="">
        <Dashboarddoc />
        <div className="">
        
        </div>
      </div>
    </>
  );
}

export default Rooms;
