import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

//handleRequestError
export const handleRequestError = (error) => {
  let errorMessage = "";
  if (error.response) {
    errorMessage = `Error: ${error.response.status} - ${error.response.data.message}`;
  } else if (error.request) {
    errorMessage = "Network Error: No response received";
  } else {
    errorMessage = `Error: ${error.message}`;
  }
  throw new Error(errorMessage); 
};
// send request with stored token  for data
export const sendRequest = async (method, url, data, accessToken) => {
  try {
    const response = await axios({
      method: method,
      url: `${BASE_URL}${url}`,
      data: data,
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    });
    return response.data;
  } catch (error) {
    handleRequestError(error); 
  }
};
export const loginadmin = async (userloginData, setAccessToken) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/admin/login`,
      userloginData
    );
    console.log("Response data:", response.data);
    const accessToken = response.data.access_token;
    console.log("Access Token:", accessToken);
    setAccessToken(accessToken);
    return accessToken;
  } catch (error) {
    console.error("Error logging in:", error);
    handleRequestError(error);
  }
};
export const saveTokenToLocalStorage = (accessToken) => {
  localStorage.setItem("accessToken", accessToken);
};
//logoutUser
export const logoutadmin = async (accessToken) => {
  try {
    await sendRequest("POST", "/auth/admin/logout", null, accessToken);
    return true; // Logout successful
  } catch (error) {
    handleRequestError(error); 
  }
};
//getUserProfile
export const getUserProfile = async (accessToken) => {
  try {
    const userProfile = await sendRequest("GET", "/auth/admin/user-profile", null, accessToken);
    return userProfile;
  } catch (error) {
    handleRequestError(error); 
  }
};
//updatePassword
export const updatePassword = async (passwordData, accessToken) => {
  try {
    await sendRequest("PUT", "/admin-password", passwordData, accessToken);
    return true; // Password updated successfully
  } catch (error) {
    handleRequestError(error); 
  }
};
//getAllContacts
export const getAllContacts = async (accessToken,page) => {
  try {
    const contacts = await sendRequest("GET", `/all-contact?page=${page}`, null, accessToken);
    return contacts;
  } catch (error) {
    handleRequestError(error); 
  }
};
//getFirstEightContacts
export const getFirstEightContacts = async (accessToken) => {
  try {
    const contacts = await sendRequest("GET", "/contacts/first-eight", null, accessToken);
    return contacts;
  } catch (error) {
    handleRequestError(error); 
  }
};
//getAllDoctors
export const getAllDoctors = async (accessToken,page) => {
  try {
    const doctors = await sendRequest("GET", `/all-doctors?page=${page}`, null, accessToken);
    return doctors;
  } catch (error) {
    handleRequestError(error); 
  }
};

//deleteDoctor
export const deleteDoctor = async (doctorId, accessToken) => {
  try {
    await sendRequest("DELETE", `/doctors/${doctorId}`, null, accessToken);
    return true; // Doctor deleted successfully
  } catch (error) {
    handleRequestError(error); 
  }
};

// getDoctorsCount
export const getDoctorsCount = async (accessToken) => {
  try {
    const count = await sendRequest("GET", "/doctors/count", null, accessToken);
    return count;
  } catch (error) {
    handleRequestError(error); 
  }
};

//getFirstEightDoctors
export const getFirstEightDoctors = async (accessToken) => {
  try {
    const doctors = await sendRequest("GET", "/doctors/first-eight", null, accessToken);
    return doctors;
  } catch (error) {
    handleRequestError(error); 
  }
};

//getAllUsers
export const getAllUsers = async (accessToken) => {
  try {
    const users = await sendRequest("GET", "/all-users", null, accessToken);
    return users;
  } catch (error) {
    handleRequestError(error); 
  }
};

// countAllUsers
export const countAllUsers = async (accessToken) => {
  try {
    const count = await sendRequest("GET", "/user/count", null, accessToken);
    return count;
  } catch (error) {
    handleRequestError(error); 
  }
};


//getFirstEightUsers
export const getFirstEightUsers = async (accessToken) => {
  try {
    const users = await sendRequest("GET", "/users/first-eight", null, accessToken);
    return users;
  } catch (error) {
    handleRequestError(error); 
  }
};

