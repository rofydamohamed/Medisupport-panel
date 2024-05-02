import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Dashboarddoc from "./dashboard";

const Profile = () => {
  return (
    <>
      <Helmet>
        <title>Profile ♥</title>
        <meta name="description" content="Profile" />
      </Helmet>
      <div className="">
        <Dashboarddoc />
        <div className="">
        
        </div>
      </div>
    </>
  );
}

export default Profile;
