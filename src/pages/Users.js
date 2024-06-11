import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Dashboard from "../components/Dashboard";
import "./Users.css";
import { getAllUsers } from "../components/apiService";
//import { format } from "date-fns";

const Users = () => {
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
        <title>Users ♥</title>
        <meta name="description" content="Users" />
      </Helmet>
      <div className="Users">
        <Dashboard />
        <div className="Users-container">
        <div className="title">
            <p>
              <span className="s1">pages</span> <span className="s1">/</span>{" "}
              <span className="s2">Users</span>
            </p>
          </div>
          <h1>Users</h1>
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
      </div>
    </>
  );
};

export default Users;
