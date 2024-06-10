import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import Dashboard from "../components/Dashboard";
import "./Register_New_Doctor.css";
import { NavLink } from "react-router-dom";
import {
  RegisterNewDoctor,
  saveTokenToLocalStorage,
} from "../components/apiService";
// import MySVG from '../Images/🦆 icon _download outline_.svg';

const MySVG = () => {
  const svg = require("../Images/🦆 icon _download outline_.svg");
  return <div dangerouslySetInnerHTML={{ __html: svg }} />;
};

const Register_New_Doctor = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const hiddenFileInputRef = useRef(null);
  let selectedFileName = null;

  const handleClick = (event) => {
    event.stopPropagation(); // Prevent event bubbling
    hiddenFileInputRef.current.click();
  };

  const FileUploader = () => {
    const hiddenFileInputRef = useRef(null);
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    // Handle the selected file here
    selectedFileName = file.name;
    console.log(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.target);
      const doctorData = {
        firs_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        email: formData.get("email"),
        password: formData.get("password"),
        password_confirmation: formData.get("confirm_password"),
        specialization: formData.get("specialization"),
        bio: formData.get("bio"),
        phone: formData.get("phone"),
        price: formData.get("price"),
        avatar: formData.get("avatar"),
        clinic_location: formData.get("clinic_location"),
        working_hours: formData.get("working_hours"),
      };
      const accessToken = await RegisterNewDoctor(doctorData, setAccessToken);
      saveTokenToLocalStorage(accessToken);
      setAccessToken(accessToken);
      console.log("access_token:", accessToken);
      // Send userData directly without JSON.stringify
      // Reset form fields after successful submission
      event.target.reset();
    } catch (error) {
      console.error(error);
      alert("Failed to register doctor. Please try again.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Register ♥</title>
        <meta name="description" content="Register" />
      </Helmet>
      <div className="page">
        <Dashboard />
        <div className="register">
          <div className="title">
            <p>pages/Register</p>
          </div>
          <h1>Register</h1>
          <form onSubmit={handleSubmit} className="form">
            <div className="field_group">
              <div className="text_field">
                <div className="label">FName</div>
                <div className="field">
                  <input
                    className="inp"
                    placeholder="FName"
                    type="text"
                    name="first_name"
                    id="first_name"
                  />
                </div>
              </div>

              <div className="text_field">
                <div className="label">LName</div>
                <div className="field">
                  <input
                    className="inp"
                    placeholder="LName"
                    type="text"
                    name="last_name"
                    id="last_name"
                  />
                </div>
              </div>
            </div>
            <div className="field_group">
              <div className="text_field">
                <div className="label">Specialization</div>
                <div className="field">
                  <input
                    className="inp"
                    placeholder="Specialization"
                    type="text"
                    name="specialization"
                    id="specialization"
                  />
                </div>
              </div>

              <div className="text_field">
                <div className="label">Working Hours</div>
                <div className="field">
                  <input
                    className="inp"
                    placeholder="Working Hours"
                    type="text"
                    name="working_hours"
                    id="working_hours"
                  />
                </div>
              </div>
            </div>
            <div className="text_field">
              <div className="label">Email</div>
              <div className="field">
                <input
                  className="inp"
                  placeholder="Email"
                  type="text"
                  name="email"
                  id="email"
                />
              </div>
            </div>
            <div className="text_field">
              <div className="label">Phone</div>
              <div className="field">
                <input
                  className="inp"
                  placeholder="Phone"
                  type="text"
                  name="phone"
                  id="phone"
                />
              </div>
            </div>
            <div className="text_field">
              <div className="label">Clinic Location</div>
              <div className="field">
                <input
                  className="inp"
                  placeholder="Clinic Location"
                  type="text"
                  name="clinic_location"
                  id="clinic_location"
                />
              </div>
            </div>
            <div className="text_field">
              <div className="label">Bio</div>
              <div className="field">
                <input
                  className="inp"
                  placeholder="Bio"
                  type="text"
                  name="bio"
                  id="bio"
                />
              </div>
            </div>
            <div className="field_group">
              <div className="text_field">
                <div className="label">Price</div>
                <div className="field">
                  <input
                    className="inp"
                    placeholder="Price"
                    type="text"
                    name="price"
                    id="price"
                  />
                </div>
              </div>
              <div className="text_field">
                <div className="label">Photo</div>
                <div className="field">
                  <label for="hiddenFileInput">
                    <svg
                      onClick={handleClick}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M19 18H5C4.44772 18 4 18.4477 4 19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19C20 18.4477 19.5523 18 19 18Z"
                        fill="#BE0202"
                        fill-opacity="0.75"
                      />
                      <path
                        d="M4 17V19C4 19.5523 4.44772 20 5 20C5.55228 20 6 19.5523 6 19V17C6 16.4477 5.55228 16 5 16C4.44772 16 4 16.4477 4 17Z"
                        fill="#BE0202"
                        fill-opacity="0.75"
                      />
                      <path
                        d="M18 17V19C18 19.5523 18.4477 20 19 20C19.5523 20 20 19.5523 20 19V17C20 16.4477 19.5523 16 19 16C18.4477 16 18 16.4477 18 17Z"
                        fill="#BE0202"
                        fill-opacity="0.75"
                      />
                      <path
                        d="M11.9995 15C11.7921 15.0016 11.5895 14.9387 11.4195 14.82L7.41946 12C7.20387 11.8471 7.05761 11.615 7.01263 11.3545C6.96766 11.0941 7.02764 10.8264 7.17946 10.61C7.25525 10.5019 7.35171 10.4098 7.46327 10.3391C7.57483 10.2684 7.69928 10.2206 7.82945 10.1982C7.95961 10.1759 8.09291 10.1796 8.22164 10.2091C8.35037 10.2386 8.47198 10.2933 8.57946 10.37L11.9995 12.76L15.3995 10.2C15.6116 10.0409 15.8783 9.97255 16.1409 10.0101C16.4034 10.0476 16.6403 10.1878 16.7995 10.4C16.9586 10.6122 17.0269 10.8789 16.9894 11.1414C16.9519 11.404 16.8116 11.6409 16.5995 11.8L12.5995 14.8C12.4264 14.9298 12.2158 15 11.9995 15Z"
                        fill="#BE0202"
                        fill-opacity="0.75"
                      />
                      <path
                        d="M12 13C11.7348 13 11.4804 12.8946 11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12V4C11 3.73478 11.1054 3.48043 11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289C12.8946 3.48043 13 3.73478 13 4V12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5196 12.8946 12.2652 13 12 13Z"
                        fill="#BE0202"
                        fill-opacity="0.75"
                      />
                    </svg>
                    <p>{selectedFileName}</p>
                  </label>
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    ref={hiddenFileInputRef}
                    // style={{ display: "none" }}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="text_field">
              <div className="label">Password</div>
              <div className="field">
                <input
                  className="inp"
                  placeholder="Password"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </div>
            <div className="text_field">
              <div className="label">Confirm Password</div>
              <div className="field">
                <input
                  className="inp"
                  placeholder="Confirm Password"
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                />
              </div>
            </div>
            <button type="submit" className="reg">
              <NavLink>Register</NavLink>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register_New_Doctor;
