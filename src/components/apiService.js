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
// registerDoctor
export const RegisterNewDoctor = async (doctorData, accessToken) => {
  const formData = new FormData();
  Object.keys(doctorData).forEach((key) => {
    formData.append(key, doctorData[key]);
  });

  try {
    const response = await axios.post(
      `${BASE_URL}/auth/doctor/register`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
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
    const userProfile = await sendRequest(
      "GET",
      "/auth/admin/user-profile",
      null,
      accessToken
    );
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
export const getAllContacts = async (accessToken, page) => {
  try {
    const contacts = await sendRequest(
      "GET",
      `/all-contact?page=${page}`,
      null,
      accessToken
    );
    return contacts;
  } catch (error) {
    handleRequestError(error);
  }
};
//getFirstEightContacts
export const getFirstEightContacts = async (accessToken) => {
  try {
    const contacts = await sendRequest(
      "GET",
      "/contacts/first-eight",
      null,
      accessToken
    );
    return contacts;
  } catch (error) {
    handleRequestError(error);
  }
};
//getAllDoctors
export const getAllDoctors = async (accessToken, page) => {
  try {
    const doctors = await sendRequest(
      "GET",
      `/all-doctors?page=${page}`,
      null,
      accessToken
    );
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
    const doctors = await sendRequest(
      "GET",
      "/doctors/first-eight",
      null,
      accessToken
    );
    return doctors;
  } catch (error) {
    handleRequestError(error);
  }
};
//getAllUsers
export const getAllUsers = async (accessToken, page) => {
  try {
    const users = await sendRequest(
      "GET",
      `/all-users?page=${page}`,
      null,
      accessToken
    );
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
    const users = await sendRequest(
      "GET",
      "/users/first-eight",
      null,
      accessToken
    );
    return users;
  } catch (error) {
    handleRequestError(error);
  }
};
//getAllNotifications
export const getAllNotifications = async (accessToken) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${BASE_URL}/auth/doctor/notifications`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};
//readNotification
export const readNotification = async (accessToken, notificationId) => {
  try {
    const response = await axios({
      method: "PUT",
      url: `${BASE_URL}/auth/doctor/notifications/${notificationId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};
//markAllUnreadNotificationsAsRead
export const markAllUnreadNotificationsAsRead = async (accessToken) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${BASE_URL}/auth/doctor/notifications/mark-all-read`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

//Doctor
export const logindoctor = async (userloginData, setAccessToken) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/doctor/login`,
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
export const getDoctorProfile = async (accessToken) => {
  try {
    const userProfile = await sendRequest(
      "GET",
      "/auth/doctor/user-profile",
      null,
      accessToken
    );
    return userProfile;
  } catch (error) {
    handleRequestError(error);
  }
};
export const logoutDoctor = async (accessToken) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/doctor/logout`,
      {},
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      localStorage.removeItem("accessToken");
    }
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

//getAllPatient
export const getAllPatient = async (accessToken, page) => {
  try {
    const doctors = await sendRequest(
      "GET",
      `/auth/doctor/fetchLatestMedicalData?page=${page}`,
      null,
      accessToken
    );
    return doctors;
  } catch (error) {
    handleRequestError(error);
  }
};

//chaaaaaaaaaaaaaaaaaaaaaaaaaatting
// Function to get user contacts
export const getDoctorContacts = async (accessToken) => {
  try {
    const response = await sendRequest(
      "GET",
      "/doctor/chat/getDoctorContacts",
      null,
      accessToken
    );
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};
// Function to authenticate user for chat
export const DoctorChatAuth = async (socketId, channelName, accessToken) => {
  try {
    const response = await sendRequest(
      "POST",
      "/doctor/chat/auth",
      {
        socket_id: socketId,
        channel_name: channelName,
      },
      accessToken
    );

    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

// Function to send a message
export const DoctorSendMessage = async (accessToken, id, message) => {
  try {
    const response = await sendRequest(
      "POST",
      "/doctor/chat/sendMessage",
      {
        id,
        message,
      },
      accessToken
    );
    return response;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

// Function to fetch user messages
export const fetchDoctorMessages = async (accessToken, id) => {
  try {
    const response = await sendRequest(
      "POST",
      "/doctor/chat/fetchMessages",
      {
        id,
      },
      accessToken
    );
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

// Function to download a file
export const DoctorDownloadFile = async () => {
  try {
    const response = await sendRequest(
      "GET",
      "/doctor/chat/download/file-name-here"
    );
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};
// Function to get user's shared photos
export const getDoctorSharedPhotos = async (accessToken, userId) => {
  try {
    const response = await sendRequest(
      "POST",
      "/doctor/chat/shared",
      {
        user_id: userId,
      },
      accessToken
    );
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

// Function to delete a conversation
export const DoctorDeleteConversation = async (accessToken, id) => {
  try {
    const response = await sendRequest(
      "POST",
      "/doctor/chat/deleteConversation",
      {
        id,
      },
      accessToken
    );
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

// Function to fetch doctor information by ID
export const DoctorFetchDoctorByID = async (accessToken, id) => {
  try {
    const response = await sendRequest(
      "POST",
      "/doctor/chat/idInfo",
      {
        id,
      },
      accessToken
    );
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

// Function to mark a message as seen
export const DoctorMakeMessageSeen = async (accessToken, id) => {
  try {
    const response = await sendRequest(
      "POST",
      "/doctor/chat/makeSeen",
      {
        id,
      },
      accessToken
    );
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

// Delete a message
export const deleteDoctorMessage = async (accessToken, messageId) => {
  try {
    const response = await sendRequest(
      "POST",
      "/doctor/chat/delete",
      { id: messageId },
      accessToken
    );
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

// Update doctor's password
export const updateDoctorPassword = async (passwordData, accessToken) => {
  try {
    const response = await sendRequest(
      "PUT",
      "/doctor/password",
      passwordData,
      accessToken
    );
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

// Fetch all booking counts
export const getAllBookingCount = async (accessToken) => {
  try {
    const bookingCount = await sendRequest(
      "GET",
      "/doctor/all-booking-count",
      null,
      accessToken
    );
    return bookingCount;
  } catch (error) {
    handleRequestError(error);
  }
};
