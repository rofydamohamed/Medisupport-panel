import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Dashboarddoc from "./dashboard";
import "./dashdoc.css";
import { getDoctorProfile, getAllPatient, getAllBookingCount } from "../../components/apiService";
import Notification from "../../components/notification";

const Dashdoc = () => {
  const [doctorProfile, setDoctorProfile] = useState([]);
  const [displayedName, setDisplayedName] = useState("");
  const [animationFlag, setAnimationFlag] = useState(true);
  const [totalBookingsCount, setTotalBookingsCount] = useState(0);
  const [newBookingsCount, setNewBookingsCount] = useState(0);
  const [oldBookingsCount, setOldBookingsCount] = useState(0);
  const [percentageNewBookings, setPercentageNewBookings] = useState("");
  const [percentageOldBookings, setPercentageOldBookings] = useState("");
  const baseURL = "http://127.0.0.1:8000/";

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const doctorProfile = await getDoctorProfile(accessToken);

        const formattedDoctorProfile = doctorProfile.data
          ? [
              {
                avatar: baseURL + doctorProfile.data.avatar,
                name:
                  " Dr. " +
                  doctorProfile.data.first_name +
                  doctorProfile.data.last_name +
                  "!",
              },
            ]
          : [];

        console.log("formattedDoctorProfile:", formattedDoctorProfile);
        setDoctorProfile(formattedDoctorProfile);
      } catch (error) {
        console.error("Error fetching doctorProfile:", error);
      }
    };

    fetchDoctorProfile();
  }, []);

  useEffect(() => {
    if (doctorProfile.length === 0) return;

    const name = doctorProfile[0].name;
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (!animationFlag) {
        clearInterval(interval);
        return;
      }

      if (currentIndex <= name.length) {
        setDisplayedName(name.substring(0, currentIndex));
        currentIndex++;
      } else {
        setTimeout(() => {
          setDisplayedName("");
          currentIndex = 0;
        }, 300);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [doctorProfile, animationFlag]);

  const [PatientsData, setPatientsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        let currentPage = 1;
        let totalPages = 1;
        let allPatients = [];

        while (currentPage <= totalPages) {
          const Patients = await getAllPatient(accessToken, currentPage);
          console.log("Fetched page", currentPage, "of data:", Patients);

          // Update totalPages from the response
          //totalPages = Patients.meta.last_page;

          // Concatenate the records from the current page to the existing records
          allPatients = allPatients.concat(
            Patients.data.data.map((Patients) => ({
              user_id: Patients.user_id,
              first_name: Patients["first_name"],
              last_name: Patients["last_name"],
              email: Patients.email,
              bmi_result: Patients.bmi_result,
              blood_sugar_level: Patients["blood_sugar_level"],
              systolic: Patients.systolic,
              diastolic: Patients.diastolic,
              heart_rate: Patients.heart_rate,
              Predicting: Patients.Predicting,
            }))
          );

          // Update dataList with the current records
          setPatientsData(allPatients);

          // Move to the next page
          currentPage++;
        }

        console.log("Patients:", allPatients);
      } catch (error) {
        console.error("Error fetching Patients:", error);
      }
    };

    fetchData();
  }, []);
  // Fetch booking count
  useEffect(() => {
    const fetchBookingCount = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const bookingData = await getAllBookingCount(accessToken);

        setTotalBookingsCount(bookingData.data.total_bookings_count);
        setNewBookingsCount(bookingData.data.new_bookings_count);
        setOldBookingsCount(bookingData.data.old_bookings_count);
        setPercentageNewBookings(bookingData.data.percentage_new_bookings);
        setPercentageOldBookings(bookingData.data.percentage_old_bookings);
      } catch (error) {
        console.error("Error fetching booking count:", error);
      }
    };

    fetchBookingCount();
  }, []);


  const renderPercentageIcon = (percentage) => {
    const value = parseInt(percentage);
    if (value > 50) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="14"
          viewBox="0 0 21 14"
          fill="none"
        >
          <path
            d="M1.22095 13L7.67612 4.80198L12.2692 9.07921L19.2209 1M19.2209 1H13.1382M19.2209 1V7.05941"
            stroke="#6CC65D"
            stroke-width="2"
          />
        </svg>
      );
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="14"
          viewBox="0 0 20 14"
          fill="none"
        >
          <path
            d="M1.35107 1L7.55797 9.15534L12.3994 5.07767L19.3511 13M19.3511 13V7.17476M19.3511 13H13.2683"
            stroke="#EA1717"
          />
        </svg>
      );
    }
  };
  const getBackgroundStyle = (percentage) => {
    const value = parseInt(percentage);
    if (value > 50) {
      return {
        background: "linear-gradient(180deg, rgba(108, 198, 93, 0.5) 0%, rgba(108, 198, 93, 0.5) 100%)",
        color: "#6CC65D",
      };
    } else {
      return {
        background: "linear-gradient(180deg, rgba(234, 23, 23, 0.5) 0%, rgba(234, 23, 23, 0.5) 100%)",
        color: '#EA1717',
      };
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashdoc ♥</title>
        <meta name="description" content="Dashdoc" />
      </Helmet>
      <div className="Dashdoc">
        <Dashboarddoc />
        <div className="Dashdoc-container">
        <div className="head">
            <h1>
              Good morning
              <span>{displayedName}</span>
            </h1>
            <Notification/>
        </div>
          <div className="Dashdoc-container-content">
            <div className="left">
              <div className="vis">
                <h3>Visitors for today</h3>
                <p className="num">{totalBookingsCount}</p>
              </div>
              <div className="patients">
                <div className="patient">
                  <h3>New Patients</h3>
                  <div className="num">
                    <p>{newBookingsCount}</p>
                    <span className="per1" style={getBackgroundStyle(percentageNewBookings)}>
                    {percentageNewBookings}
                    {renderPercentageIcon(percentageNewBookings)}
                    </span>
                  </div>{" "}
                </div>
                <div className="patient">
                  <h3>Old Patients</h3>
                  <div className="num">
                    <p>{oldBookingsCount}</p>
                    <span className="per2" style={getBackgroundStyle(percentageOldBookings)}>
                    {percentageOldBookings}
                      {renderPercentageIcon(percentageOldBookings)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              {doctorProfile.map((profile, index) => (
                <p key={index}>
                  <img src={profile.avatar} alt="docimg" />
                </p>
              ))}
            </div>
          </div>
          <div className="Patients-content">
          <div className="table">
            <h3>Patients</h3>
            <div className="table-container">
            <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>FName</th>
                    <th>LName</th>
                    <th>Email</th>
                    <th>BMI</th>
                    <th>Sugar</th>
                    <th>Pressure</th>
                    <th>Heart Rate</th>
                    <th>Predicting Heart Disease</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(PatientsData) &&
                    PatientsData.map((user) => (
                      <tr key={user.user_id}>
                        <td>{user.user_id}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td
                          style={{
                            color:
                              (user.bmi_result >= 18.5) &
                              (user.bmi_result <= 24.9)
                                ? "green"
                                : "red",
                          }}
                        >
                          {user.bmi_result}
                        </td>
                        <td
                          style={{
                            color:
                              (user.blood_sugar_level >= 70) &
                              (user.blood_sugar_level <= 180)
                                ? "green"
                                : "red",
                          }}
                        >
                          {user.blood_sugar_level}
                        </td>
                        <td
                          style={{
                            color:
                              (user.systolic >= 90) &
                              (user.systolic <= 140) &
                              (user.diastolic >= 60) &
                              (user.diastolic <= 90)
                                ? "green"
                                : "red",
                          }}
                        >
                          {user.systolic}/{user.diastolic}
                        </td>
                        <td
                          style={{
                            color:
                              (user.heart_rate >= 60) &
                              (user.heart_rate <= 100)
                                ? "green"
                                : "red",
                          }}
                        >
                          {user.heart_rate}
                        </td>
                        <td>{user.Predicting}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Dashdoc;
