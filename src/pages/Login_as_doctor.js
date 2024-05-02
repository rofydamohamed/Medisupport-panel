import "./Login_as_doctor.css";
import React, { useState ,useEffect} from "react";
import log from "../Images/logIn.jpg";
import { Helmet } from "react-helmet-async";
// import { NavLink } from "react-router-dom";
import { logindoctor, saveTokenToLocalStorage } from "../components/apiService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const LoginAsDoctor = () => {

  //password
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [iconActive, setIconActive] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
    setIconActive(!iconActive);
  };
  //loading
  let navigate = useNavigate();

  //after-click-btn
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const { login } = useAuth();
  const [accessToken, setAccessToken] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.target);
      const userData = {
        email: formData.get("email"),
        password: formData.get("password"),
      };
      const accessToken = await logindoctor(userData, setAccessToken);
      saveTokenToLocalStorage(accessToken);
      setAccessToken(accessToken);
      console.log("access_token:", accessToken);
      setIsOverlayVisible(true);
      login();
      event.target.reset();
    } catch (error) {
      console.error(error);
      alert("Failed to login user. Please try again.");
    }
  };
  useEffect(() => {
    if (accessToken) {
      const redirectTimer = setTimeout(() => {
        navigate("/dashboarddoc");
      }, 2000);

      return () => clearTimeout(redirectTimer);
    }
  }, [accessToken, navigate]);

  return (
    <>
        <Helmet>
        <title>Login ♥</title>
        <meta name="description" content="Login" />
      </Helmet>

      <div className="logdoc">
        <div className="flex1">
          <div className="logo">
            <h3>
              Medi{" "}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="Vector"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.19921 4.63434C3.35254 5.99139 2.89574 7.80583 3.00121 9.66712C3.06241 10.7471 3.28772 11.771 3.63704 12.7383L9.11363 12.428L11.0103 8.07656L12.6401 13.205L14.1411 10.7731L18.233 10.5412L18.3125 11.9459L14.8376 12.1428L12.2827 16.2821L10.8332 11.7206L9.93074 13.7909L0.734039 14.312L0.654444 12.9073L2.31654 12.8131C2.00515 11.8453 1.80131 10.8193 1.74008 9.73858C1.61769 7.57866 2.14309 5.45002 3.15842 3.82264C4.17651 2.19076 5.71048 1.03409 7.58648 0.927789C9.79574 0.802604 11.5539 2.08637 12.7997 3.96782C13.825 1.95777 15.4269 0.483523 17.6362 0.358335C19.5124 0.252023 21.1672 1.22819 22.3631 2.73465C23.5557 4.23706 24.3181 6.29272 24.4405 8.45229C24.7025 13.0755 22.0561 17.0985 19.4948 19.8874C18.1995 21.2978 16.8914 22.4302 15.9085 23.2095C15.4165 23.5997 15.0043 23.9027 14.7138 24.1089C14.5686 24.212 14.4536 24.2911 14.3742 24.3449C14.3345 24.3718 14.3037 24.3923 14.2823 24.4064L14.2576 24.4227L14.2507 24.4272L14.2487 24.4286L14.248 24.4289C14.248 24.4289 14.2476 24.4292 13.9247 23.8205C13.687 24.4688 13.6868 24.4687 13.6868 24.4687L13.6829 24.4669L13.6739 24.4626L13.641 24.447C13.6128 24.4334 13.5719 24.4136 13.5193 24.3876C13.4141 24.3355 13.262 24.2585 13.0705 24.1571C12.6876 23.9543 12.146 23.6534 11.5052 23.2577C10.2262 22.4678 8.5405 21.2933 6.93101 19.7595C6.07247 18.9414 5.23125 18.017 4.48368 16.9896C4.26277 16.686 4.30265 16.2435 4.57276 16.0013C4.84286 15.7591 5.24093 15.8089 5.46183 16.1125C6.15093 17.0596 6.93446 17.9225 7.74599 18.6958C9.26995 20.148 10.8774 21.2698 12.108 22.0298C12.7222 22.4091 13.2396 22.6965 13.6019 22.8883C13.7048 22.9428 13.7951 22.9895 13.8714 23.0284C13.9174 22.9965 13.9687 22.9605 14.025 22.9204C14.2999 22.7252 14.6943 22.4355 15.1671 22.0606C16.1139 21.3099 17.3686 20.223 18.6055 18.8761C21.1088 16.1505 23.4051 12.5073 23.1794 8.52375C23.0739 6.66275 22.4152 4.91152 21.4207 3.65872C20.4294 2.41004 19.1312 1.68283 17.7158 1.76303C15.7593 1.87389 14.3222 3.37918 13.464 5.66914L12.9707 6.98531L12.332 5.73328C11.2205 3.55479 9.62254 2.22162 7.66608 2.33248C6.25083 2.41267 5.04305 3.28175 4.19921 4.63434ZM13.9247 23.8205L13.6868 24.4687L13.9779 24.6041L14.248 24.4289L13.9247 23.8205Z"
                  fill="#BE0202"
                />
              </svg>
              support
            </h3>
          </div>
          <h2>LOGIN</h2>
          <form className="forml" onSubmit={handleSubmit}>
            <div className="lbl">
              <div className="lbl1">
                <label htmlFor="email">Email Address</label>
                <input
                  className="inp"
                  type="email"
                  placeholder="Your Email"
                  name="email"
                  id="email"
                  required
                />
              </div>
              <div className="lbl2">
                <label htmlFor="">Password</label>
                <div className="password-input-container">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="inp"
                    placeholder="Password"
                    name="password"
                    id="password"
                    required
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
              </div>
            </div>
            <div>
              <input type="submit" name="" value="Login" className="btn" />
            </div>
          </form>
        </div>
        <div className="flex2">
          <img src={log} alt="log_in" />
        </div>
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
          </div>
        )}
      </div>
    </>
  );
}

export default LoginAsDoctor;
