import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { Helmet } from "react-helmet-async";
import "./Contact_us.css";
import { getAllContacts} from "../components/apiService";
import { format } from "date-fns";


const ContactUs = () => {

  const [ContactsData, setDoctorsData] = useState([]);

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
              id: Contacts.id,
              Username: Contacts.username,
              Email: Contacts.email,
              Message: Contacts.message,
              Time: format(new Date(Contacts.created_at), "HH:mm"),
            }))
          );

          // Update dataList with the current records
          setDoctorsData(allContacts);

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

  return (
    <>
      <Helmet>
        <title>Contact ♥</title>
        <meta name="description" content="Contact" />
      </Helmet>
      <div className="Contacts">
        <Dashboard />
        <div className="Contacts-container">
        <div className="title">
            <p>
              <span className="s1">pages</span> <span className="s1">/</span>{" "}
              <span className="s2">Contact us</span>
            </p>
          </div>
          <h1>Contact us</h1>
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
                  {ContactsData.map((Contact) => (
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
      </div>
    </>
  );
}

export default ContactUs;
