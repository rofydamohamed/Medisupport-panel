import React from "react";
import { Helmet } from "react-helmet-async";
import Dashboard from "../components/Dashboard";
import "./Register_New_Doctor.css";
import { NavLink } from "react-router-dom";

const RegisterNewDoctor = () => {
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
          <div className="form">
            <div className="field_group">
              <div className="text_field">
                <div className="label">FName</div>
                <div className="field">
                  <input
                    className="inp"
                    placeholder="FName"
                    type="text"
                    name=""
                    id=""
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
                    name=""
                    id=""
                  />
                </div>
              </div>
            </div>
            <div className="text_field">
              <div className="label">Specialization</div>
              <div className="field">
                <input
                  className="inp"
                  placeholder="Specialization"
                  type="text"
                  name=""
                  id=""
                />
              </div>
            </div>
            <div className="text_field">
              <div className="label">Email</div>
              <div className="field">
                <input
                  className="inp"
                  placeholder="Email"
                  type="text"
                  name=""
                  id=""
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
                  name=""
                  id=""
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
                  name=""
                  id=""
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
                  name=""
                  id=""
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
                    name=""
                    id=""
                  />
                </div>
              </div>
              <div className="text_field">
                <div className="label">Photo</div>
                <div className="field">
                  <input
                    className="inp"
                    placeholder="Photo"
                    type="text"
                    name=""
                    id=""
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
                  name=""
                  id=""
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
                  name=""
                  id=""
                />
              </div>
            </div>
            <button className="reg">
              <NavLink>Register</NavLink>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterNewDoctor;
