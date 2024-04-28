import React, { useState, useEffect } from "react";
import "./dash.css";
import { Helmet } from "react-helmet-async";
import Dashboard from "../components/Dashboard";
import {
  countAllUsers,
  getDoctorsCount,
} from "../components/apiService";

const Dash = () => {
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const users = await countAllUsers(accessToken);
        const doctors = await getDoctorsCount(accessToken);
  
        console.log("Users count:", users); 
        console.log("Doctors count:", doctors); 
        setDoctorsCount(doctors.data.count);
        setUsersCount(users.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);
  

  return (
    <>
      <Helmet>
        <title>Dashboard ♥</title>
        <meta name="description" content="Dashboard" />
      </Helmet>
      <div className="dashboard">
        <Dashboard />
        <div className="dash">
          <div className="dash-content">
            <h3>Dashboard</h3>
            <div className="box1">
              <div className="box">
                <p className="kind">Patients</p>
                <p className="num">
                  {usersCount}
                </p>
                <div className="dig">
                  <div
                    className="inner"
                    style={{ width: `${(usersCount / 500) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="box">
                <p className="kind">Doctors</p>
                <p className="num" name="count">
                  {doctorsCount}
                </p>
                <div className="dig">
                  <div
                    className="inner"
                    style={{ width: `${(doctorsCount / 500) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="box2"></div>
            <div className="box3"></div>
            <div className="box4"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dash;
