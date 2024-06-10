import { Helmet } from "react-helmet-async";
import React, { useState, useRef, useEffect } from "react";
import "./chat.css";
import Dashboarddoc from "./dashboard";
import Pusher from "pusher-js";
import {
  getDoctorContacts,
  DoctorChatAuth,
  DoctorMakeMessageSeen,
  DoctorSendMessage,
  fetchDoctorMessages,
  DoctorFetchDoctorByID,
} from "../../components/apiService.js";

const emojis = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "🤣",
  "😂",
  "🙂",
  "🙃",
  "😉",
  "😊",
  "😇",
  "🥰",
  "😍",
  "🤩",
  "😘",
  "😗",
  "☺",
  "😚",
  "😙",
  "😋",
  "😛",
  "😜",
  "🤪",
  "😝",
  "🤑",
  "🤗",
  "🤭",
  "🤫",
  "🤔",
  "🤐",
  "🤨",
  "😐",
  "😑",
  "😶",
  "😏",
  "😒",
  "🙄",
  "😬",
  "🤥",
  "😌",
  "😔",
  "😪",
  "🤤",
  "😴",
  "😷",
  "🤒",
  "🤕",
  "🤢",
  "🤮",
  "🤧",
  "😵",
  "🤯",
  "🤠",
  "😎",
  "🤓",
  "🧐",
  "😕",
  "😟",
  "🙁",
  "☹",
  "😮",
  "😯",
  "😲",
  "😳",
  "🥺",
  "😦",
  "😧",
  "😨",
  "😰",
  "😥",
  "😢",
  "😭",
  "😱",
  "😖",
  "😣",
  "😞",
  "😓",
  "😩",
  "😫",
  "🥱",
  "😤",
  "😡",
  "😠",
  "🤬",
  "😈",
  "👿",
  "💀",
  "☠",
  "💩",
  "🤡",
  "👹",
  "👺",
  "👻",
  "👽",
  "👾",
  "🤖",
  "😺",
  "😸",
  "😹",
  "😻",
  "😼",
  "😽",
  "🙀",
  "😿",
  "😾",
  "🙈",
  "🙉",
  "🙊",
  "💋",
  "💌",
  "💘",
  "💝",
  "💖",
  "💗",
  "💓",
  "💞",
  "💕",
  "💟",
  "❣️",
  "♥️",
  "💔",
  "❤️",
  "🧡",
  "💛",
  "💚",
  "💙",
  "💜",
  "🤎",
  "🖤",
  "🤍",
  "💯",
  "💢",
  "💥",
  "💫",
  "💦",
  "💨",
  "🕳",
  "💣",
  "💬",
  "👋",
  "🤚",
  "🖐",
  "✋",
  "🖖",
  "👌",
  "🤏",
  "✌",
  "🤞",
  "🤟",
  "🤘",
  "🤙",
  "👈",
  "👉",
  "👆",
  "👇",
  "☝",
  "👍",
  "👎",
  "✊",
  "👊",
  "🤛",
  "🤜",
  "👏",
  "🙌",
  "👐",
  "🤲",
  "🤝",
  "🙏",
  "✍",
  "💅",
  "🤳",
  "💪",
  "🦾",
  "🦵",
  "🦿",
  "🦶",
  "👣",
  "👂",
  "🦻",
  "👃",
  "🧠",
  "🦷",
  "🦴",
  "👀",
  "👁",
  "👅",
  "👄",
  "👶",
  "🧒",
  "👦",
  "👧",
  "🧑",
  "👱",
  "👨",
  "🧔",
  "👩",
  "🧓",
  "👴",
  "👵",
  "🙍",
  "🙎",
  "🙅",
  "🙆",
  "💁",
  "🙋",
  "🧏",
  "🙇",
  "🤦",
  "🤷",
  "👮",
  "🕵",
  "💂",
  "👷",
  "🤴",
  "👸",
  "👳",
  "👲",
  "🧕",
  "🤵",
  "👰",
  "🤰",
  "🤱",
  "👼",
  "🎅",
  "🌱",
  "🌲",
  "🌳",
  "🌴",
  "🌵",
  "🌾",
  "🌿",
  "☘️",
  "🍀",
  "🍁",
  "🍂",
  "🍃",
  "🌺",
  "🌻",
  "🌼",
  "🌷",
  "🌹",
  "🥀",
  "🌸",
  "💐",
  "🍄",
  "🌰",
  "🎍",
  "🎋",
  "🍇",
  "🍈",
  "🍉",
  "🍊",
  "🍋",
  "🍌",
  "🍍",
  "🥭",
  "🍎",
  "🍏",
  "🍐",
  "🍑",
  "🍒",
  "🍓",
  "🥝",
  "🍅",
  "🥑",
  "🍆",
  "🥔",
  "🥕",
  "🌽",
  "🌶️",
  "🥒",
  "🥬",
  "🥦",
  "🧄",
  "🧅",
  "🍄",
  "🥜",
  "🌰",
  "🍞",
  "🥐",
  "🥖",
  "🥨",
  "🥯",
  "🥞",
  "🧇",
  "🧀",
  "🍖",
  "🍗",
  "🥩",
  "🥓",
  "🍔",
  "🍟",
  "🍕",
  "🌭",
  "🥪",
  "🌮",
  "🌯",
  "🥙",
  "🧆",
  "🥚",
  "🍳",
  "🥘",
  "🍲",
  "🥣",
  "🥗",
  "🍿",
  "🧈",
  "🧂",
  "🥫",
  "🍱",
  "🍘",
  "🍙",
  "🍚",
  "🍛",
  "🍜",
  "🍝",
  "🍠",
  "🍢",
  "🍣",
  "🍤",
  "🍥",
  "🥮",
  "🍡",
  "🥟",
  "🥠",
  "🥡",
  "🦀",
  "🦞",
  "🦐",
  "🦑",
  "🦪",
  "🍦",
  "🍧",
  "🍨",
  "🍩",
  "🍪",
  "🎂",
  "🍰",
  "🧁",
  "🥧",
  "🍫",
  "🍬",
  "🍭",
  "🍮",
  "🍯",
  "🍼",
  "☕",
  "🍵",
  "🧃",
  "🥤",
  "🍶",
  "🍺",
  "🍻",
  "🥂",
  "🍷",
  "🥃",
  "🍸",
  "🍹",
  "🧉",
  "🍾",
  "🧊",
  "🥄",
  "🍴",
  "🍽️",
  "🥣",
  "🥡",
  "🥢",
  "🧂",
];

const Chat = () => {
  const [showDefaultConversation, setShowDefaultConversation] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [usersData, setDoctorsData] = useState([]);
  const [selecteduserInfo, setselecteduserInfo] = useState(null);
  const [currentuserMessages, setcurrentuserMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const messagesEndRef = useRef(null);
  const baseURL = "http://127.0.0.1:8000/";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const contacts = await getDoctorContacts(accessToken);
        const contactsArray = contacts.contacts;
        setDoctorsData(
          contactsArray.map((contact) => ({
            id: contact.user.id,
            isOnline: contact.user.active_status === 1,
            contactInfo: {
              ...contact,
              user: {
                ...contact.user,
                avatar: baseURL + contact.user.avatar,
              },
            },
          }))
        );
      } catch (error) {
        console.error("An error occurred while fetching user contacts:", error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 60000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 750 && !selecteduserInfo) {
        setShowSidebar(true);
        setShowDefaultConversation(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [selecteduserInfo]);
  const handleuserClick = async (doctor) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const doctorInfo = await DoctorFetchDoctorByID(accessToken, doctor.id);
      setselecteduserInfo(doctorInfo.fetch);
      setcurrentuserMessages(doctor.messages);
      setShowPicker(false);

      const userMessages = await fetchDoctorMessages(accessToken, doctor.id);
      setcurrentuserMessages(userMessages.messages);

      await DoctorMakeMessageSeen(accessToken, doctor.id);

      if (windowWidth <= 750) {
        setShowSidebar(false);
        setShowChat(true);
      } else {
        setShowChat(true);
      }
    } catch (error) {
      console.error(
        "An error occurred while fetching doctor information:",
        error
      );
    }
  };
  const sendMessage = async (e, message) => {
    e.preventDefault();
    if (inputMessage.trim() !== "" && selecteduserInfo) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await DoctorSendMessage(
          accessToken,
          selecteduserInfo.id,
          inputMessage
        );
        setInputMessage("");
      } catch (error) {
        console.error("An error occurred while sending the message:", error);
      }
    }
  };
  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem("messages")) || {};
    const doctorMessages = storedMessages[selecteduserInfo?.id] || [];
    setcurrentuserMessages(doctorMessages);
  }, [selecteduserInfo]);

  const handleArrowClick = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (selecteduserInfo) {
        await DoctorMakeMessageSeen(accessToken, selecteduserInfo.id);
      }

      setselecteduserInfo(null);
      setShowChat(false);
      setShowPicker(false);
    } catch (error) {
      console.error("An error occurred while marking messages as seen:", error);
    }
  };
  useEffect(() => {
    if (!selecteduserInfo && !showChat && windowWidth >= 750) {
      setShowDefaultConversation(true);
    } else {
      setShowDefaultConversation(false);
    }
  }, [selecteduserInfo, showChat, windowWidth]);

  useEffect(() => {
    if (!selecteduserInfo && windowWidth >= 750) {
      setShowSidebar(true);
    }
  }, [selecteduserInfo, windowWidth]);

  useEffect(() => {
    if (selecteduserInfo && windowWidth < 750) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  }, [selecteduserInfo, windowWidth]);
  const formatTime = (createdAt) => {
    const date = new Date(createdAt);
    const hours = date.getHours();
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const period = hours >= 12 ? "PM" : "AM";
    return `${displayHours}:${minutes} ${period}`;
  };
  const selectEmoji = (emoji) => {
    setInputMessage((prevMessage) => prevMessage + emoji);
  };
  useEffect(() => {
    const authenticateUserForChat = async () => {
      try {
        const socketId = "9013.50262712";
        const channelName = "private-chatify";
        const accessToken = localStorage.getItem("accessToken");

        const response = await DoctorChatAuth(socketId, channelName, accessToken);

        console.log("Authentication response:", response);
      } catch (error) {
        console.error("An error occurred during chat authentication:", error);
      }
    };

    authenticateUserForChat();
  }, []);
  useEffect(() => {
    Pusher.logToConsole = true;
    const pusher = new Pusher("699bcc950016f00a1982", {
      cluster: "eu",
      authEndpoint: 'http://localhost:3000/pusher/auth',

    });
    const channel = pusher.subscribe("private-chatify"); 
    channel.bind("messaging", function (data) {
      setcurrentuserMessages(prevMessages => [...prevMessages, data]);
    });
    return () => {
      pusher.unsubscribe("private-chatify"); 
      pusher.disconnect();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Chat Doctor ♥</title>
        <meta name="description" content="Chat" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />{" "}
      </Helmet>
      <div className="chatt">
        <Dashboarddoc />
        <div className="chatting">
          <div className={showSidebar ? "sidebarchat" : "sidebarchat-hidden"}>
            <h3 style={{ display: showSidebar ? "block" : "none" }}>
              Messages
            </h3>
            <div className="sidedoc">
              {usersData.map((doctor) => (
                <div
                  key={doctor.id}
                  className="doctorschat"
                  onClick={() => handleuserClick(doctor)}
                >
                  <div className="slide">
                    <div className="doctorAvatarContainer">
                      <div className="doctorAvatar">
                        <img
                          src={doctor.contactInfo.user.avatar}
                          alt="contact-img"
                          className="zoomedImage"
                        />
                      </div>
                      {doctor.isOnline && (
                        <div className="onlineIndicator"></div>
                      )}
                    </div>
                    <div className="doctorInfo">
                      <div className="doctortext">
                        <div className="doctorName">
                          {doctor.contactInfo.user.name}{" "}
                          {doctor.contactInfo.user.last_name}
                        </div>

                        <div
                          className="lastMessage"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {doctor.contactInfo.lastMessage.last_message}
                        </div>
                      </div>
                      <div className="mess">
                        <div className="messageTime">
                          {doctor.contactInfo.lastMessage.timeAgo}
                        </div>
                        <div
                          className={`unreadMessages ${
                            doctor.contactInfo.unseenCounter === 0
                              ? "hidden"
                              : ""
                          }`}
                        >
                          {doctor.contactInfo.unseenCounter}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {selecteduserInfo && showChat && (
            <div className="chatm">
              <div className="doctorinfor">
                <div className="convback" onClick={handleArrowClick}>
                  <i className="fa-solid fa-arrow-left"></i>
                </div>
                {selecteduserInfo && (
                  <div className="contactimgchat">
                    <div className="imgd">
                      <img
                        src={baseURL + selecteduserInfo.avatar}
                        alt="contact-img"
                        className="zoomedImagechat"
                      />
                    </div>
                    {selecteduserInfo.isOnline && (
                      <div className="onlineIndicator"></div>
                    )}
                  </div>
                )}
                {selecteduserInfo && (
                  <div className="infor">
                    <h3>
                      {selecteduserInfo.name}{" "}
                      {selecteduserInfo.last_name}
                    </h3>
                    <p>
                      {selecteduserInfo.active_status === 1
                        ? "Online"
                        : "Offline"}
                    </p>
                  </div>
                )}
              </div>

              {selecteduserInfo && showChat && (
                <div
                  className={`chat-container ${
                    selecteduserInfo.specialization
                      ? selecteduserInfo.specialization.toLowerCase() +
                        "-chat"
                      : ""
                  }`}
                  onClick={() => setShowPicker(false)}
                >
                  {currentuserMessages &&
                    currentuserMessages.length > 0 && (
                      <div className="chat-messages">
                        {currentuserMessages.map((message) => (
                          <div
                            key={message.id}
                            className={`message ${
                              message.from_id === selecteduserInfo.id
                                ? "doctor"
                                : "user"
                            }`}
                          >
                            <span>{message.body}</span>
                            <span
                              className={`message-time ${
                                message.from_id === selecteduserInfo.id
                                  ? "doctor-time"
                                  : "user-time"
                              }`}
                            >
                              {formatTime(message.created_at)}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill={message.seen ? "#00bbff" : "currentColor"}
                                className="bi bi-check-all"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z" />
                              </svg>
                            </span>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                </div>
              )}
              <div className="input-area">
                <div className="emoji-picker-position">
                  <button onClick={() => setShowPicker(!showPicker)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="51"
                      viewBox="0 0 50 51"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_1294_3087)">
                        <path
                          d="M25 47.375C19.1984 47.375 13.6344 45.0703 9.53204 40.968C5.42968 36.8656 3.125 31.3016 3.125 25.5C3.125 19.6984 5.42968 14.1344 9.53204 10.032C13.6344 5.92968 19.1984 3.625 25 3.625C30.8016 3.625 36.3656 5.92968 40.468 10.032C44.5703 14.1344 46.875 19.6984 46.875 25.5C46.875 31.3016 44.5703 36.8656 40.468 40.968C36.3656 45.0703 30.8016 47.375 25 47.375ZM25 50.5C31.6304 50.5 37.9893 47.8661 42.6777 43.1777C47.3661 38.4893 50 32.1304 50 25.5C50 18.8696 47.3661 12.5107 42.6777 7.82233C37.9893 3.13392 31.6304 0.5 25 0.5C18.3696 0.5 12.0107 3.13392 7.32233 7.82233C2.63392 12.5107 0 18.8696 0 25.5C0 32.1304 2.63392 38.4893 7.32233 43.1777C12.0107 47.8661 18.3696 50.5 25 50.5Z"
                          fill="#BE0202"
                        />
                        <path
                          d="M38.5351 30.1875C38.8094 30.6626 38.9537 31.2014 38.9537 31.75C38.9537 32.2986 38.8094 32.8374 38.5351 33.3125C37.164 35.6886 35.1912 37.6617 32.8152 39.0332C30.4393 40.4046 27.7441 41.1261 25.0007 41.125C22.2579 41.1256 19.5633 40.4038 17.1879 39.0324C14.8126 37.6609 12.8403 35.6882 11.4695 33.3125C11.1953 32.8377 11.0509 32.2991 11.0508 31.7508C11.0506 31.2025 11.1948 30.6639 11.4687 30.1889C11.7425 29.7139 12.1366 29.3194 12.6112 29.0449C13.0858 28.7704 13.6243 28.6256 14.1726 28.625H35.8288C36.3774 28.625 36.9162 28.7694 37.3913 29.0437C37.8663 29.318 38.2608 29.7125 38.5351 30.1875ZM21.8757 20.8125C21.8757 23.4 20.4757 20.8125 18.7507 20.8125C17.0257 20.8125 15.6257 23.4 15.6257 20.8125C15.6257 18.225 17.0257 16.125 18.7507 16.125C20.4757 16.125 21.8757 18.225 21.8757 20.8125ZM34.3757 20.8125C34.3757 23.4 32.9757 20.8125 31.2507 20.8125C29.5257 20.8125 28.1257 23.4 28.1257 20.8125C28.1257 18.225 29.5257 16.125 31.2507 16.125C32.9757 16.125 34.3757 18.225 34.3757 20.8125Z"
                          fill="#BE0202"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1294_3087">
                          <rect
                            width="50"
                            height="50"
                            fill="white"
                            transform="translate(0 0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                  {showPicker && (
                    <div
                      className={`emoji-picker-container ${
                        showPicker ? "show" : ""
                      }`}
                    >
                      {emojis.map((emoji) => (
                        <button key={emoji} onClick={() => selectEmoji(emoji)}>
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <form className="input-container">
                  <div className="textarea-custom">
                    <textarea
                      className="textarea"
                      placeholder="Type a message..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                    />
                  </div>
                  <div
                    className="input-icon"
                  >
                    <input
                      type="file"
                    
                      style={{ display: "none" }}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="40"
                      viewBox="0 0 22 40"
                      fill="none"
                    >
                      <path
                        d="M12.619 13.9585L7.75719 23.1018C7.02517 24.4785 7.02517 26.7118 7.75719 28.0885V28.0885C8.48921 29.4651 9.67674 29.4651 10.4088 28.0885L16.8179 16.0351C18.1605 13.5101 18.1605 9.4168 16.8179 6.8918V6.8918C15.4753 4.3668 13.2987 4.3668 11.9561 6.8918L5.54695 18.9451C3.59372 22.6185 3.59372 28.5718 5.54695 32.2451V32.2451C7.50018 35.9185 10.6658 35.9185 12.619 32.2451L16.5086 24.9301"
                        stroke="#BE0202"
                        stroke-width="1.5"
                        strokeLinecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </form>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="41"
                    viewBox="0 0 40 41"
                    fill="none"
                  >
                    <path
                      d="M31.6673 18.8335V20.5002C31.6673 26.9435 26.444 32.1668 20.0007 32.1668M8.33398 18.8335V20.5002C8.33398 26.9435 13.5573 32.1668 20.0007 32.1668M20.0007 32.1668V37.1668M20.0007 37.1668H25.0007M20.0007 37.1668H15.0007M20.0007 27.1668C16.3188 27.1668 13.334 24.1821 13.334 20.5002V10.5002C13.334 6.81826 16.3188 3.8335 20.0007 3.8335C23.6825 3.8335 26.6673 6.81826 26.6673 10.5002V20.5002C26.6673 24.1821 23.6825 27.1668 20.0007 27.1668Z"
                      stroke="#BE0202"
                      stroke-width="1.5"
                      strokeLinecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <button type="submit" onClick={(e) => sendMessage(e)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="41"
                    height="45"
                    viewBox="0 0 41 45"
                    fill="none"
                  >
                    <path
                      d="M0 24.5832H12.5V20.4165H0V1.34569C3.09906e-05 1.16468 0.0472299 0.986798 0.136945 0.829583C0.226659 0.672369 0.355793 0.541247 0.511618 0.44914C0.667443 0.357033 0.844579 0.307121 1.02557 0.304324C1.20656 0.301526 1.38515 0.34594 1.54375 0.433188L40.0062 21.5874C40.1696 21.6773 40.3058 21.8094 40.4006 21.9699C40.4955 22.1304 40.5455 22.3134 40.5455 22.4999C40.5455 22.6863 40.4955 22.8693 40.4006 23.0298C40.3058 23.1903 40.1696 23.3224 40.0062 23.4124L1.54375 44.5665C1.38515 44.6538 1.20656 44.6982 1.02557 44.6954C0.844579 44.6926 0.667443 44.6427 0.511618 44.5506C0.355793 44.4585 0.226659 44.3273 0.136945 44.1701C0.0472299 44.0129 3.09906e-05 43.835 0 43.654V24.5832Z"
                      fill="#BE0202"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
          {showDefaultConversation && (
            <div className="conversation conversation-default active">
              <i className="ri-chat-3-line"></i>
              <p>Select chat and view conversation!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
