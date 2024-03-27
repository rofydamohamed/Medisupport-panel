import { Helmet } from "react-helmet-async";
import "./Login_as_admin.css";
import React, { useState } from "react";
import log from "../Images/logIn.jpg";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const Login_as_admin = () => {
  //password
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [iconActive, setIconActive] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
    setIconActive(!iconActive);
  };
  //loading
  let navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/Loading");
    const isSuccess = true;
    if (isSuccess) {
      login();
    }
  };
  const { login } = useAuth();

  return (
    <>
      <Helmet>
        <title>Login ♥</title>
        <meta name="description" content="Login" />
      </Helmet>

      <div className="log">
        <div className="flex1">
          <h2>Log In</h2>
          <div className="forml">
            <div className="lbl">
              <div className="lbl1">
                <label htmlFor="">Email Address</label>
                <input className="inp" type="text" placeholder="Your Email" />
              </div>
              <div className="lbl2">
                <label htmlFor="">Password</label>
                <div className="password-input-container">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="inp"
                    placeholder="Your Password"
                  />
                  <svg
                    onClick={togglePasswordVisibility}
                    className={`toggle-password-visibility ${
                      iconActive ? "active" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                  >
                    <path d="M20 12.5C20 10.69 16.24 8.51499 11.993 8.49999C7.775 8.48499 4 10.678 4 12.5C4 14.325 7.754 16.506 11.997 16.5C16.252 16.494 20 14.32 20 12.5ZM12 18.5C6.958 18.507 2 15.814 2 12.5C2 9.18599 6.984 6.48299 12 6.49999C17.016 6.51699 22 9.18599 22 12.5C22 15.814 17.042 18.493 12 18.5ZM12 16.5C10.9391 16.5 9.92172 16.0786 9.17157 15.3284C8.42143 14.5783 8 13.5609 8 12.5C8 11.4391 8.42143 10.4217 9.17157 9.67156C9.92172 8.92142 10.9391 8.49999 12 8.49999C13.0609 8.49999 14.0783 8.92142 14.8284 9.67156C15.5786 10.4217 16 11.4391 16 12.5C16 13.5609 15.5786 14.5783 14.8284 15.3284C14.0783 16.0786 13.0609 16.5 12 16.5ZM12 14.5C12.5304 14.5 13.0391 14.2893 13.4142 13.9142C13.7893 13.5391 14 13.0304 14 12.5C14 11.9696 13.7893 11.4608 13.4142 11.0858C13.0391 10.7107 12.5304 10.5 12 10.5C11.4696 10.5 10.9609 10.7107 10.5858 11.0858C10.2107 11.4608 10 11.9696 10 12.5C10 13.0304 10.2107 13.5391 10.5858 13.9142C10.9609 14.2893 11.4696 14.5 12 14.5Z" />
                  </svg>
                </div>
                <div className="disc">
                  It must be a combination of minimum 8 letters, numbers, and
                  symbols.
                </div>
              </div>
            </div>
            <div class="forget">
              <div class="checkbox-container">
                <input type="checkbox" id="custom-checkbox" />
                <label
                  for="custom-checkbox"
                  class="custom-checkbox-label"
                ></label>
                <label for="custom-checkbox">Remember Me</label>
              </div>
              <NavLink to="/forget_password" id="for">
                Forget Password?
              </NavLink>
            </div>
            <div>
              <button onClick={handleLoginClick} className="btn">
                Login
              </button>
            </div>
          </div>
          <div className="btn-log">
            <button className="blog">
              <div className="svg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M23.7666 10.1498H22.8V10.1H12V14.9H18.7818C17.7924 17.6942 15.1338 19.7 12 19.7C8.0238 19.7 4.8 16.4762 4.8 12.5C4.8 8.5238 8.0238 5.3 12 5.3C13.8354 5.3 15.5052 5.9924 16.7766 7.1234L20.1708 3.7292C18.0276 1.7318 15.1608 0.5 12 0.5C5.373 0.5 0 5.873 0 12.5C0 19.127 5.373 24.5 12 24.5C18.627 24.5 24 19.127 24 12.5C24 11.6954 23.9172 10.91 23.7666 10.1498Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M1.38281 6.9146L5.32541 9.806C6.39221 7.1648 8.97581 5.3 11.9992 5.3C13.8346 5.3 15.5044 5.9924 16.7758 7.1234L20.17 3.7292C18.0268 1.7318 15.16 0.5 11.9992 0.5C7.39001 0.5 3.39281 3.1022 1.38281 6.9146Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M11.9994 24.5C15.099 24.5 17.9154 23.3138 20.0448 21.3848L16.3308 18.242C15.126 19.1546 13.6284 19.7 11.9994 19.7C8.87821 19.7 6.22801 17.7098 5.22961 14.9324L1.31641 17.9474C3.30241 21.8336 7.33561 24.5 11.9994 24.5Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M23.7666 10.1499H22.8V10.1001H12V14.9001H18.7818C18.3066 16.2423 17.4432 17.3997 16.3296 18.2427C16.3302 18.2421 16.3308 18.2421 16.3314 18.2415L20.0454 21.3843C19.7826 21.6231 24 18.5001 24 12.5001C24 11.6955 23.9172 10.9101 23.7666 10.1499Z"
                    fill="#1976D2"
                  />
                </svg>
              </div>
              <p className="text"> Log in with Google</p>
            </button>
            <button className="blog">
              <div className="svg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M9.04525 6.365V9.113H7.03125V12.473H9.04525V22.459H13.1792V12.474H15.9543C15.9543 12.474 16.2142 10.863 16.3403 9.101H13.1962V6.803C13.1962 6.46 13.6462 5.998 14.0922 5.998H16.3463V2.5H13.2822C8.94225 2.5 9.04525 5.863 9.04525 6.365Z"
                    fill="#006FFF"
                  />
                </svg>
              </div>
              <p className="text"> Log in with Facebook</p>
            </button>
          </div>
          <hr />
          <div className="sign">
            <p>
              No account yet?{" "}
              <NavLink to="/signup" id="nav">
                {" "}
                Sign Up
              </NavLink>
            </p>
          </div>
        </div>
        <div classNEmail className="flex2">
          <img src={log} alt="log_in" />
        </div>
      </div>
    </>
  );
};

export default Login_as_admin;
