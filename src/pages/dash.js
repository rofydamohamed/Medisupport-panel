import React, { useState, useEffect } from "react";
import "./dash.css";
import { Helmet } from "react-helmet-async";
import Dashboard from "../components/Dashboard";
import { countAllUsers, getDoctorsCount } from "../components/apiService";
import { getAllDoctors, deleteDoctor,getAllContacts,getAllUsers } from "../components/apiService";
import { format } from "date-fns";

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
  const [doctorsData, setDoctorsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        let currentPage = 1;
        let totalPages = 1;
        let alldoctors = [];

        while (currentPage <= totalPages) {
          const doctors = await getAllDoctors(accessToken, currentPage);
          console.log("Fetched page", currentPage, "of data:", doctors);

          // Update totalPages from the response
          totalPages = doctors.meta.last_page;

          // Concatenate the records from the current page to the existing records
          alldoctors = alldoctors.concat(
            doctors.data.map((doctors) => ({
              id: doctors.id,
              adminId: doctors["admin_id"],
              fName: doctors["first_name"],
              lName: doctors["last_name"],
              email: doctors.email,
              phone: doctors.phone,
              specialization: doctors.specialization,
              clinicLocation: doctors["clinic_location"],
              bio: doctors.bio,
              price: doctors.price,
              workingHours: doctors["working_hours"],
              rating: doctors["average_rating"],
            }))
          );

          // Update dataList with the current records
          setDoctorsData(alldoctors);

          // Move to the next page
          currentPage++;
        }

        console.log("Doctors:", alldoctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchData();
  }, []);
  const [ContactData, setDoctorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        let currentPage = 1;
        let totalPages = 1;
        let allContacts = [];

        while (currentPage <= totalPages) {
          const Contacts = await getAllContacts(accessToken, currentPage);
          console.log("Fetched page", currentPage, "of data:", Contacts);

          // Update totalPages from the response
          totalPages = Contacts.meta.last_page;

          // Concatenate the records from the current page to the existing records
          allContacts = allContacts.concat(
            Contacts.data.map((Contacts,index) => ({
              id: "1",
              Username: Contacts.username,
              Email: Contacts.email,
              Message: Contacts.message,
              Time: format(new Date(Contacts.created_at), "HH:mm"),
            }))
          );

          // Update dataList with the current records
          setDoctorData(allContacts);

          // Move to the next page
          currentPage++;
        }

        console.log("Contacts:", allContacts);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchData();
  }, []);
  const handleDeleteDoctor = async (doctorId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const isDeleted = await deleteDoctor(doctorId, accessToken);
      if (isDeleted) {
        // Filter out the deleted doctor from doctorsData
        setDoctorsData((prevDoctors) =>
          prevDoctors.filter((doctor) => doctor.id !== doctorId)
        );
        console.log("Doctor deleted successfully");
      } else {
        console.log("Failed to delete doctor");
      }
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  const [UsersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        let currentPage = 1;
        let totalPages = 1;
        let allUsers = [];

        while (currentPage <= totalPages) {
          const Users = await getAllUsers(accessToken, currentPage);
          console.log("Fetched page", currentPage, "of data:", Users);

          // Update totalPages from the response
          totalPages = Users.meta.last_page;

          // Concatenate the records from the current page to the existing records
          allUsers = allUsers.concat(
            Users.data.map((Users, index) => ({
              id: Users.id,
              FName: Users.first_name,
              LName: Users.last_name,
              Email: Users.email,
            }))
          );

          // Update dataList with the current records
          setUsersData(allUsers);

          // Move to the next page
          currentPage++;
        }

        console.log("Contacts:", allUsers);
      } catch (error) {
        console.error("Error fetching doctors:", error);
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
        <div className="tables">
          <div className="dash">
            <div className="dash-content">
              <h3>Dashboard</h3>
              <div className="box1">
                <div className="box">
                  <p className="kind">Patients</p>
                  <p className="num">{usersCount}</p>
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
          <div className="Users-container">
          <div className="table">
            <h3>Users</h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>FName</th>
                    <th>LName</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {UsersData.map((Users) => (
                    <tr key={Users.id}>
                      <td>{Users.id}</td>
                      <td>{Users.FName}</td>
                      <td>{Users.LName}</td>
                      <td>{Users.Email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
          <div className="Contacts-container">
          <div className="table">
              <h3>Contacts</h3>
          <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {ContactData.map((Contact) => (
                    <tr>
                      <td>{Contact.id}</td>
                      <td>{Contact.Username}</td>
                      <td>{Contact.Email}</td>
                      <td>{Contact.Message}</td>
                      <td>{Contact.Time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
          </div>
        </div>
          <div className="doctors-container">
          <div className="table">
            <h3>Doctors</h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Admin ID</th>
                    <th>FName</th>
                    <th>LName</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Specialization</th>
                    <th>Clinic Location</th>
                    <th>Bio</th>
                    <th>Working Hours</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(doctorsData) &&
                    doctorsData.map((doctor) => (
                      <tr key={doctor.id}>
                        <td>{doctor.id}</td>
                        <td>{doctor.adminId}</td>
                        <td>{doctor.fName}</td>
                        <td>{doctor.lName}</td>
                        <td>{doctor.email}</td>
                        <td>{doctor.phone}</td>
                        <td>{doctor.specialization}</td>
                        <td>{doctor.clinicLocation}</td>
                        <td>{doctor.bio}</td>
                        <td>{doctor.workingHours}</td>
                        <td>{doctor.price}</td>
                        <td
                          style={{
                            color: doctor.rating >= 3 ? "green" : "red",
                          }}
                        >
                          {doctor.rating}
                        </td>

                        <td>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            onClick={() => handleDeleteDoctor(doctor.id)}
                          >
                            <path
                              d="M8 2.4V1.2C8 0.88174 8.14048 0.576515 8.39052 0.351472C8.64057 0.126428 8.97971 0 9.33333 0L14.6667 0C15.0203 0 15.3594 0.126428 15.6095 0.351472C15.8595 0.576515 16 0.88174 16 1.2V2.4H21.3333C22.0406 2.4 22.7189 2.65286 23.219 3.10294C23.719 3.55303 24 4.16348 24 4.8V6C24 6.63652 23.719 7.24697 23.219 7.69706C22.7189 8.14714 22.0406 8.4 21.3333 8.4H21.156L20.2493 20.64C20.1817 21.5511 19.7319 22.4051 18.9909 23.0289C18.25 23.6528 17.2733 23.9999 16.2587 24H7.768C6.75423 24 5.77829 23.6535 5.03748 23.0307C4.29667 22.4078 3.84627 21.5551 3.77733 20.6448L2.84933 8.4H2.66667C1.95942 8.4 1.28115 8.14714 0.781049 7.69706C0.280952 7.24697 0 6.63652 0 6V4.8C0 4.16348 0.280952 3.55303 0.781049 3.10294C1.28115 2.65286 1.95942 2.4 2.66667 2.4H8ZM21.3333 4.8H2.66667V6H21.3333V4.8ZM5.52133 8.4L6.43733 20.4816C6.46032 20.7851 6.61051 21.0694 6.85754 21.277C7.10458 21.4847 7.43 21.6001 7.768 21.6H16.2587C16.5971 21.6001 16.9229 21.4843 17.17 21.2762C17.4171 21.068 17.567 20.7831 17.5893 20.4792L18.4827 8.4H5.52267H5.52133ZM9.33333 9.6C9.68696 9.6 10.0261 9.72643 10.2761 9.95147C10.5262 10.1765 10.6667 10.4817 10.6667 10.8V19.2C10.6667 19.5183 10.5262 19.8235 10.2761 20.0485C10.0261 20.2736 9.68696 20.4 9.33333 20.4C8.97971 20.4 8.64057 20.2736 8.39052 20.0485C8.14048 19.8235 8 19.5183 8 19.2V10.8C8 10.4817 8.14048 10.1765 8.39052 9.95147C8.64057 9.72643 8.97971 9.6 9.33333 9.6ZM14.6667 9.6C15.0203 9.6 15.3594 9.72643 15.6095 9.95147C15.8595 10.1765 16 10.4817 16 10.8V19.2C16 19.5183 15.8595 19.8235 15.6095 20.0485C15.3594 20.2736 15.0203 20.4 14.6667 20.4C14.313 20.4 13.9739 20.2736 13.7239 20.0485C13.4738 19.8235 13.3333 19.5183 13.3333 19.2V10.8C13.3333 10.4817 13.4738 10.1765 13.7239 9.95147C13.9739 9.72643 14.313 9.6 14.6667 9.6Z"
                              fill="#BE0202"
                            />
                          </svg>
                        </td>
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

export default Dash;
