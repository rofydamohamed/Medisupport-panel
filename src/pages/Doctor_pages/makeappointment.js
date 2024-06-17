import React, { useState, useEffect } from "react";
import "./makeappointment.css";
import { Helmet } from "react-helmet-async";
import Dashboarddoc from "./dashboard";
import { NavLink } from "react-router-dom";
import Notification from "../../components/notification";

import {
  storeDateRequest,
  storeTimeRequest,
  getAllBookings,
  deleteAppointment,
  updateAppointment,
  getAllAppointments,
} from "../../components/apiService.js";

const Makeappointment = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found in localStorage");
        return;
      }
      const response = await getAllAppointments(accessToken);
      setBookings(response.data.Appointments);
      console.log(response.data.Appointments);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  const handleStoreDate = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found in localStorage");
        return;
      }
      const date = new Date().toISOString();
      const response = await storeDateRequest(accessToken, date);
      console.log("Stored date successfully:", response);
      fetchBookings();
    } catch (error) {
      console.error("Failed to store date:", error);
    }
  };

  const handleStoreTime = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found in localStorage");
        return;
      }
      const time = "15:00";
      const dateId = "your_date_id_here";
      const response = await storeTimeRequest(accessToken, time, dateId);
      console.log("Stored time successfully:", response);
      fetchBookings();
    } catch (error) {
      console.error("Failed to store time:", error);
    }
  };

  const handleDeleteAppointment = async (dateId, timeId) => {
    if (!dateId || !timeId) {
      console.error("Date ID or Time ID is missing.");
      return;
    }
    console.log(
      "Deleting appointment with Date ID:",
      dateId,
      "and Time ID:",
      timeId
    );
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found in localStorage");
        return;
      }
      const response = await deleteAppointment(accessToken, dateId, timeId);
      console.log("Deleted appointment successfully:", response);
      fetchBookings();
    } catch (error) {
      console.error("Failed to delete appointment:", error);
    }
  };

  const handleUpdateAppointment = async (dateId, timeId, newTime, newDate) => {
    if (!dateId || !timeId) {
      console.error("Date ID or Time ID is missing.");
      return;
    }
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found in localStorage");
        return;
      }
      const response = await updateAppointment(
        accessToken,
        timeId,
        dateId,
        newTime,
        newDate
      );
      console.log("Updated appointment successfully:", response);
      fetchBookings();
    } catch (error) {
      console.error("Failed to update appointment:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  };
  return (
    <>
      <Helmet>
        <title>Makeappointment ♥</title>
        <meta name="description" content="Makeappointment" />
      </Helmet>
      <div className="appoint_page">
        <Dashboarddoc />
        <div className="make">
          <div className="title">
            <p>
              <span className="s1">pages</span> <span className="s1">/</span>{" "}
              <span className="s2">Make Appointment</span>
            </p>
            <Notification />
          </div>
          <h1>Make Appointment</h1>
          <div className="add_app">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M9 0C9.29837 0 9.58452 0.118527 9.7955 0.329505C10.0065 0.540484 10.125 0.826631 10.125 1.125V7.875H16.875C17.1734 7.875 17.4595 7.99353 17.6705 8.2045C17.8815 8.41548 18 8.70163 18 9C18 9.29837 17.8815 9.58452 17.6705 9.7955C17.4595 10.0065 17.1734 10.125 16.875 10.125H10.125V16.875C10.125 17.1734 10.0065 17.4595 9.7955 17.6705C9.58452 17.8815 9.29837 18 9 18C8.70163 18 8.41548 17.8815 8.2045 17.6705C7.99353 17.4595 7.875 17.1734 7.875 16.875V10.125H1.125C0.826631 10.125 0.540484 10.0065 0.329505 9.7955C0.118527 9.58452 0 9.29837 0 9C0 8.70163 0.118527 8.41548 0.329505 8.2045C0.540484 7.99353 0.826631 7.875 1.125 7.875H7.875V1.125C7.875 0.826631 7.99353 0.540484 8.2045 0.329505C8.41548 0.118527 8.70163 0 9 0Z"
                fill="#BE0202"
              />
            </svg>
            <NavLink to="/addappointment">add</NavLink>
          </div>
          <div className="appoints">
            <div className="col">
              <div className="all_info">
                {bookings.map((booking, index) => (
                  <div key={index} className="edit">
                    <div className="date">
                      <div>{index + 1}-</div>
                      <div>{booking.day_name}</div>
                      <div>{formatDate(booking.date)}</div>

                      {booking.times.map((timeSlot, idx) => (
                        <div key={idx}>
                          <div>{timeSlot.time}</div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() =>
                        handleUpdateAppointment(
                          booking.id,
                          booking.times[0].id,
                          "newTime",
                          "newDate"
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                      >
                        <path
                          d="M0.5 0.5H35.5V35.5H0.5V0.5Z"
                          fill="white"
                          stroke="#BE0202"
                        />
                        <path
                          d="M13.8646 27.2055H31.5002V30.0435H4.5V24.0228L19.3501 9.97497L25.7131 15.9971L13.8631 27.2055H13.8646ZM21.4696 7.96997L24.6526 4.95891C24.9339 4.6929 25.3154 4.54346 25.7131 4.54346C26.1109 4.54346 26.4924 4.6929 26.7737 4.95891L31.0172 8.97318C31.2984 9.23927 31.4564 9.60013 31.4564 9.97639C31.4564 10.3526 31.2984 10.7135 31.0172 10.9796L27.8342 13.9892L21.4711 7.96997H21.4696Z"
                          fill="#BE0202"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteAppointment(booking.id, booking.times[0].id)
                      }
                    >
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                      >
                        <path
                          d="M12 3.6V1.8C12 1.32261 12.2107 0.864773 12.5858 0.527208C12.9609 0.189642 13.4696 0 14 0L22 0C22.5304 0 23.0391 0.189642 23.4142 0.527208C23.7893 0.864773 24 1.32261 24 1.8V3.6H32C33.0609 3.6 34.0783 3.97928 34.8284 4.65442C35.5786 5.32955 36 6.24522 36 7.2V9C36 9.95478 35.5786 10.8705 34.8284 11.5456C34.0783 12.2207 33.0609 12.6 32 12.6H31.734L30.374 30.96C30.2725 32.3267 29.5978 33.6076 28.4864 34.5434C27.375 35.4792 25.9099 35.9999 24.388 36H11.652C10.1313 36 8.66743 35.4803 7.55622 34.546C6.44501 33.6118 5.7694 32.3326 5.666 30.9672L4.274 12.6H4C2.93913 12.6 1.92172 12.2207 1.17157 11.5456C0.421427 10.8705 0 9.95478 0 9V7.2C0 6.24522 0.421427 5.32955 1.17157 4.65442C1.92172 3.97928 2.93913 3.6 4 3.6H12ZM32 7.2H4V9H32V7.2ZM8.282 12.6L9.656 30.7224C9.69048 31.1776 9.91577 31.6041 10.2863 31.9155C10.6569 32.227 11.145 32.4001 11.652 32.4H24.388C24.8956 32.4001 25.3843 32.2264 25.755 31.9142C26.1256 31.602 26.3505 31.1747 26.384 30.7188L27.724 12.6H8.284H8.282ZM14 14.4C14.5304 14.4 15.0391 14.5896 15.4142 14.9272C15.7893 15.2648 16 15.7226 16 16.2V28.8C16 29.2774 15.7893 29.7352 15.4142 30.0728C15.0391 30.4104 14.5304 30.6 14 30.6C13.4696 30.6 12.9609 30.4104 12.5858 30.0728C12.2107 29.7352 12 29.2774 12 28.8V16.2C12 15.7226 12.2107 15.2648 12.5858 14.9272C12.9609 14.5896 13.4696 14.4 14 14.4ZM22 14.4C22.5304 14.4 23.0391 14.5896 23.4142 14.9272C23.7893 15.2648 24 15.7226 24 16.2V28.8C24 29.2774 23.7893 29.7352 23.4142 30.0728C23.0391 30.4104 22.5304 30.6 22 30.6C21.4696 30.6 20.9609 30.4104 20.5858 30.0728C20.2107 29.7352 20 29.2774 20 28.8V16.2C20 15.7226 20.2107 15.2648 20.5858 14.9272C20.9609 14.5896 21.4696 14.4 22 14.4Z"
                          fill="#BE0202"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Makeappointment;
