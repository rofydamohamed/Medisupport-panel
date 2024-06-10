import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Dashboarddoc from "./dashboard";
import "./patients.css";
import { getAllPatient } from "../../components/apiService";

const Patients = () => {
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
    </>
  );
};

export default Patients;
