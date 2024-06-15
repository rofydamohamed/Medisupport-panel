import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import Dashboard from "../components/Dashboard";
import "./Register_New_Doctor.css";
import { RegisterNewDoctor } from "../components/apiService";
import { NavLink } from "react-router-dom";

const Register_New_Doctor = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const hiddenFileInputRef = useRef(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const handleClick = (event) => {
    event.stopPropagation();
    hiddenFileInputRef.current.click();
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  //after-click-btn
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }
    const doctorData = {
      admin_id: formData.get("admin_id"),
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      specialization: formData.get("specialization"),
      working_hours: formData.get("working_hours"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      clinic_location: formData.get("clinic_location"),
      bio: formData.get("bio"),
      price: formData.get("price"),
      password: formData.get("password"),
      confirm_password: formData.get("confirm_password"),
      avatar: formData.get("avatar"),
    };

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found");
      }
      const response = await RegisterNewDoctor(doctorData, accessToken);
      console.log("Doctor registered successfully:", response);
      setIsOverlayVisible(true);
      event.target.reset();
      setSelectedFile(null);
    } catch (error) {
      console.error("Error registering doctor:", error);
    }
  };
  const handleHideOverlay = () => {
    setIsOverlayVisible(false);
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
            <p>
              <span className="s1">pages</span> <span className="s1">/</span>{" "}
              <span className="s2">Register</span>
            </p>
          </div>
          <h1>Register</h1>
          <form onSubmit={handleSubmit} className="form">
            <div className="text_field">
              <div className="label">Admin ID</div>
              <div className="field">
                <input
                  className="inp"
                  placeholder="Admin ID"
                  type="text"
                  name="admin_id"
                  id="admin_id"
                  required
                />
              </div>
            </div>
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
                    required
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
                    required
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
                    required
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
                    required
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
                  required
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
                  required
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
                  required
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
                  required
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
                    required
                  />
                </div>
              </div>
              <div className="text_field">
                <div className="label">Photo</div>
                <div className="field">
                  <label className="icon">
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
                        fillOpacity="0.75"
                      />
                      <path
                        d="M4 17V19C4 19.5523 4.44772 20 5 20C5.55228 20 6 19.5523 6 19V17C6 16.4477 5.55228 16 5 16C4.44772 16 4 16.4477 4 17Z"
                        fill="#BE0202"
                        fillOpacity="0.75"
                      />
                      <path
                        d="M18 17V19C18 19.5523 18.4477 20 19 20C19.5523 20 20 19.5523 20 19V17C20 16.4477 19.5523 16 19 16C18.4477 16 18 16.4477 18 17Z"
                        fill="#BE0202"
                        fillOpacity="0.75"
                      />
                      <path
                        d="M11.9995 15C11.7921 15.0016 11.5895 14.9387 11.4195 14.82L7.41946 12C7.20387 11.8471 7.05761 11.615 7.01263 11.3545C6.96766 11.0941 7.02764 10.8264 7.17946 10.61C7.25525 10.5019 7.35171 10.4098 7.46327 10.3391C7.57483 10.2684 7.69928 10.2206 7.82945 10.1982C7.95961 10.1759 8.09291 10.1796 8.22164 10.2091C8.35037 10.2386 8.47198 10.2933 8.57946 10.37L11.9995 12.76L15.3995 10.2C15.6116 10.0409 15.8783 9.97255 16.1409 10.0101C16.4034 10.0476 16.6403 10.1878 16.7995 10.4C16.9586 10.6122 17.0269 10.8789 16.9894 11.1414C16.9519 11.404 16.8116 11.6409 16.5995 11.8L12.5995 14.8C12.4264 14.9298 12.2158 15 11.9995 15Z"
                        fill="#BE0202"
                        fillOpacity="0.75"
                      />
                      <path
                        d="M12 13C11.7348 13 11.4804 12.8946 11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12V4C11 3.73478 11.1054 3.48043 11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289C12.8946 3.48043 13 3.73478 13 4V12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5196 12.8946 12.2652 13 12 13Z"
                        fill="#BE0202"
                        fillOpacity="0.75"
                      />
                    </svg>
                    <p>
                      {selectedFile ? selectedFile.name : "No file selected"}
                    </p>
                  </label>
                  <input
                    type="file"
                    name="avatar"
                    ref={hiddenFileInputRef}
                    style={{ display: "none" }}
                    onChange={handleChange}
                    required
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
                  required
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
                  required
                />
              </div>
            </div>
            <button type="submit" className="reg">
              Register
            </button>
          </form>
          {isOverlayVisible && (
            <div className="overlay">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="300"
                height="300"
                viewBox="0 0 300 300"
                fill="none"
              >
                <path
                  d="M150 281.25C115.19 281.25 81.8064 267.422 57.1922 242.808C32.5781 218.194 18.75 184.81 18.75 150C18.75 115.19 32.5781 81.8064 57.1922 57.1922C81.8064 32.5781 115.19 18.75 150 18.75C184.81 18.75 218.194 32.5781 242.808 57.1922C267.422 81.8064 281.25 115.19 281.25 150C281.25 184.81 267.422 218.194 242.808 242.808C218.194 267.422 184.81 281.25 150 281.25ZM150 300C189.782 300 227.936 284.196 256.066 256.066C284.196 227.936 300 189.782 300 150C300 110.218 284.196 72.0644 256.066 43.934C227.936 15.8035 189.782 0 150 0C110.218 0 72.0644 15.8035 43.934 43.934C15.8035 72.0644 0 110.218 0 150C0 189.782 15.8035 227.936 43.934 256.066C72.0644 284.196 110.218 300 150 300Z"
                  fill="#4A963D"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="73.825"
                  y="89"
                  width="153"
                  height="122"
                  viewBox="0 0 153 122"
                  fill="none"
                >
                  <path
                    d="M128.687 4.18738C128.554 4.31683 128.429 4.45461 128.312 4.59989L63.1937 87.5686L23.95 48.3061C21.2842 45.8221 17.7583 44.4698 14.1152 44.5341C10.4721 44.5984 6.99608 46.0742 4.41959 48.6507C1.8431 51.2272 0.367251 54.7032 0.302972 58.3463C0.238693 61.9895 1.591 65.5154 4.075 68.1812L53.6875 117.812C55.024 119.146 56.6156 120.198 58.3672 120.903C60.1188 121.609 61.9946 121.955 63.8827 121.92C65.7708 121.885 67.6325 121.47 69.3568 120.7C71.0811 119.93 72.6326 118.82 73.9187 117.437L148.769 23.8749C151.317 21.1998 152.711 17.6292 152.648 13.9349C152.585 10.2406 151.071 6.71954 148.432 4.13291C145.794 1.54627 142.244 0.10192 138.549 0.112114C134.854 0.122308 131.312 1.58623 128.687 4.18738Z"
                    fill="#4A963D"
                  />
                </svg>
              </svg>{" "}
              <NavLink to="/Dash" className="done">
                Done{" "}
              </NavLink>
              <button onClick={handleHideOverlay}>
                <NavLink className="Registernew" to="/Register">
                  Register Anthor
                </NavLink>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Register_New_Doctor;
