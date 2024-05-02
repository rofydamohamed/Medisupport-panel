import { Helmet } from "react-helmet-async";
import React, { useState, useRef, useEffect } from "react";
import "./chat.css";
//import docchat1 from "../images/doc_chat1.jpeg";
import {
  getUserContacts,
  userChatAuth,
  userMakeMessageSeen,
  userSendMessage,
  fetchUserMessages,
  userFetchDoctorByID,
} from "../../components/apiService.js";
//import WebSocketClient from "websocket";

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
  //store messages
  const [messages, setMessages] = useState([]);
  // emogi
  //send files
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  //chat
  //doc

  const selectEmoji = (emoji) => {
    setCurrentMessage(currentMessage + emoji);
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // State variables
  const [showDefaultConversation, setShowDefaultConversation] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [doctorsData, setDoctorsData] = useState([]);
  const [selectedDoctorInfo, setSelectedDoctorInfo] = useState(null);
  const [currentDoctorMessages, setCurrentDoctorMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const messagesEndRef = useRef(null);
  const baseURL = "http://127.0.0.1:8000/";

  // Function to fetch user contacts
  const fetchUserContacts = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const contacts = await getUserContacts(accessToken);
      const contactsArray = contacts.contacts;

      // Update doctorsData state
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserContacts();
      } catch (error) {
        console.error("An error occurred while fetching user contacts:", error);
      }
    };

    // Fetch data initially
    fetchData();

    // Setup interval to fetch data periodically
    const interval = setInterval(() => {
      fetchData();
    }, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleDoctorClick = async (doctor) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      // Fetch doctor information
      const doctorInfo = await userFetchDoctorByID(accessToken, doctor.id);
      setSelectedDoctorInfo(doctorInfo.fetch);
      setCurrentDoctorMessages(doctor.messages);
      setShowPicker(false);

      // Fetch user messages with the doctor
      const userMessages = await fetchUserMessages(accessToken, doctor.id);
      setCurrentDoctorMessages(userMessages.messages);

      // Mark messages as seen
      await userMakeMessageSeen(accessToken, doctor.id);

      // Update sidebar and chat visibility based on window width
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

  const sendMessage = async (e) => {
    e.preventDefault();
    if (currentMessage.trim() !== "" && selectedDoctorInfo) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.error("Access token not found.");
          return;
        }

        const response = await userSendMessage(
          accessToken,
          selectedDoctorInfo.id,
          currentMessage
        );

        if (response && response.success) {
          console.log("Message sent successfully:", response);

          const storedMessages =
            JSON.parse(localStorage.getItem("messages")) || {};
          const doctorMessages = storedMessages[selectedDoctorInfo.id] || [];
          doctorMessages.push({
            body: currentMessage,
            from_id: "user",
            created_at: new Date().toISOString(),
            seen: true,
          });
          storedMessages[selectedDoctorInfo.id] = doctorMessages;
          localStorage.setItem("messages", JSON.stringify(storedMessages));

          setCurrentMessage("");
        } else {
          console.error(
            "Failed to send message:",
            response && response.error ? response.error : "Unknown error"
          );
        }
      } catch (error) {
        console.error("An error occurred while sending the message:", error);
      }
    }
  };

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem("messages")) || {};
    const doctorMessages = storedMessages[selectedDoctorInfo?.id] || [];
    setCurrentDoctorMessages(doctorMessages);
  }, [selectedDoctorInfo]);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    if (window.innerWidth >= 750 && !selectedDoctorInfo) {
      setShowSidebar(true);
      setShowDefaultConversation(true);
    }
  };

  const handlearrowClick = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (selectedDoctorInfo) {
        // Mark messages as seen
        await userMakeMessageSeen(accessToken, selectedDoctorInfo.id);
      }

      setSelectedDoctorInfo(null);
      setShowChat(false);
      setShowPicker(false);
    } catch (error) {
      console.error("An error occurred while marking messages as seen:", error);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedDoctorInfo]);

  useEffect(() => {
    if (!selectedDoctorInfo && !showChat && windowWidth >= 750) {
      setShowDefaultConversation(true);
    } else {
      setShowDefaultConversation(false);
    }
  }, [selectedDoctorInfo, showChat, windowWidth]);

  useEffect(() => {
    if (!selectedDoctorInfo && windowWidth >= 750) {
      setShowSidebar(true);
    }
  }, [selectedDoctorInfo, windowWidth]);

  useEffect(() => {
    if (selectedDoctorInfo && windowWidth < 750) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  }, [selectedDoctorInfo, windowWidth]);
  const formatTime = (createdAt) => {
    const date = new Date(createdAt);
    const hours = date.getHours();
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const period = hours >= 12 ? "PM" : "AM";
    return `${displayHours}:${minutes} ${period}`;
};

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
        <div className="chatting">
          <div className={showSidebar ? "sidebarchat" : "sidebarchat-hidden"}>
            <h3 style={{ display: showSidebar ? "block" : "none" }}>
              Messages
            </h3>
            <div className="sidebar">
              {doctorsData.map((doctor) => (
                <div
                  key={doctor.id}
                  className="doctorschat"
                  onClick={() => handleDoctorClick(doctor)}
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
                          {doctor.contactInfo.user.first_name}{" "}
                          {doctor.contactInfo.user.last_name}
                        </div>
                        <div className="doctorSpeciality">
                          {doctor.contactInfo.user.specialization}
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
          {selectedDoctorInfo && showChat && (
            <div className="chatm">
              <div className="doctorinfor">
                <div className="convback" onClick={handlearrowClick}>
                  <i className="fa-solid fa-arrow-left"></i>
                </div>
                {selectedDoctorInfo && (
                  <div className="contactimgchat">
                    <div className="imgd">
                      <img
                        src={baseURL + selectedDoctorInfo.avatar}
                        alt="contact-img"
                        className="zoomedImagechat"
                      />
                    </div>
                    {selectedDoctorInfo.isOnline && (
                      <div className="onlineIndicator"></div>
                    )}
                  </div>
                )}
                {selectedDoctorInfo && (
                  <div className="infor">
                    <h3>
                      {selectedDoctorInfo.first_name}{" "}
                      {selectedDoctorInfo.last_name}
                    </h3>
                    <p>
                      {selectedDoctorInfo.active_status === 1
                        ? "Online"
                        : "Offline"}
                    </p>
                  </div>
                )}
              </div>

              {selectedDoctorInfo && showChat && (
                <div
                  className={`chat-container ${
                    selectedDoctorInfo.specialization
                      ? selectedDoctorInfo.specialization.toLowerCase() +
                        "-chat"
                      : ""
                  }`}
                  onClick={() => setShowPicker(false)}
                >
                  {currentDoctorMessages &&
                    currentDoctorMessages.length > 0 && (
                      <div className="chat-messages">
                        {currentDoctorMessages.map((message) => (
                          <div
                            key={message.id}
                            className={`message ${
                              message.from_id === selectedDoctorInfo.id
                                ? "doctor"
                                : "user"
                            }`}
                          >
                            <span>{message.body}</span>
                            <span
                              className={`message-time ${
                                message.from_id === selectedDoctorInfo.id
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
                                class="bi bi-check-all"
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
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                    />
                  </div>
                  <div
                    className="input-icon"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileUpload}
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
