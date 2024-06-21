import React, { useState, useEffect } from "react";
import "./addappointment.css";
import { Helmet } from "react-helmet-async";
import Dashboarddoc from "./dashboard";
import { NavLink } from "react-router-dom";
import Notification from "../../components/notification";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

const Addappointment = () => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

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
            <Notification />
          </div>
          <h1>Make Appointment</h1>
          <div className="appoints">
            <div className="col">
              <div className="field_group_doc">
                <div className="text_field">
                  <div className="label">Date</div>
                  <div className="field">
                    <DatePicker
                      selected={date}
                      onChange={(date) => setDate(date)}
                      dateFormat="yyyy/MM/dd"
                      placeholderText="Select Date"
                      customInput={
                        <div className="custom-input">
                          <input
                            className="inp"
                            placeholder="Select Date"
                            type="text"
                            value={date ? date.toISOString().split("T")[0] : ""}
                            readOnly
                            style={{ border: "none", outline: "none" }}
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            style={{ cursor: "pointer" }}
                          >
                            <path
                              d="M0.0342368 0V6H24V0H0.0342368ZM0.0342368 9V23.73C0.0342368 23.88 0.171184 24 0.342368 24H23.6576C23.8288 24 23.9658 23.88 23.9658 23.73V9H0H0.0342368ZM3.45792 12H6.8816V15H3.45792V12ZM10.3053 12H13.729V15H10.3053V12ZM17.1526 12H20.5763V15H17.1526V12ZM3.45792 18H6.8816V21H3.45792V18ZM10.3053 18H13.729V21H10.3053V18Z"
                              fill="#A2A9B0"
                            />
                          </svg>
                        </div>
                      }
                    />
                  </div>
                </div>
                <div className="text_field">
                  <div className="label">Time</div>
                  <div className="field">
                    <DatePicker
                      selected={time}
                      onChange={(time) => setTime(time)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      placeholderText="Select Time"
                      customInput={
                        <div className="custom-input">
                          <input
                            className="inp"
                            placeholder="Select Time"
                            type="text"
                            value={time ? time.toLocaleTimeString() : ""}
                            readOnly
                            style={{ border: "none", outline: "none" }}
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            style={{ cursor: "pointer" }}
                          >
                            <path
                              d="M12 0C5.4 0 0 5.4 0 12C0 18.6 5.4 24 12 24C18.6 24 24 18.6 24 12C24 5.4 18.6 0 12 0ZM12 3C16.98 3 21 7.02 21 12C21 16.98 16.98 21 12 21C7.02 21 3 16.98 3 12C3 7.02 7.02 3 12 3ZM10.5 6V12.66L10.98 13.05L12.48 14.55L13.5 15.69L15.66 13.53L14.52 12.51L13.5 11.49V6.06H10.5V6Z"
                              fill="#A2A9B0"
                            />
                          </svg>
                        </div>
                      }
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addappointment;
