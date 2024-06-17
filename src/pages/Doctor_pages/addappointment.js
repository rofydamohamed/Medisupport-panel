import React, { useState, useEffect } from "react";
import "./addappointment.css";
import { Helmet } from "react-helmet-async";
import Dashboarddoc from "./dashboard";
import { NavLink } from "react-router-dom";
import Notification from "../../components/notification";

const Addappointment = () => {
  return (
    <>
    <Helmet>
      <title>Add Appointment ♥</title>
      <meta name="description" content="Makeappointment" />
    </Helmet>
    <div className="addappoint">
      <Dashboarddoc />
      <div className="adding">
        <div className="title">
          <p>
            <span className="s1">pages</span> <span className="s1">/</span>{" "}
            <span className="s2">Make Appointment</span>

          </p>
          <Notification/>

        </div>
        <h1>Make Appointment</h1>
        <div className="appoints">
          <div className="col">
        
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

export default Addappointment;
