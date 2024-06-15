import React, { useState, useEffect } from "react";
import "./notification.css";
import {
  getAllNotifications,
  readNotification,
  markAllUnreadNotificationsAsRead,
} from "./apiService";
import { format } from "date-fns";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [allRead, setAllRead] = useState(false);

  useEffect(() => {
    loadNotifications();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loadNotifications = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await getAllNotifications(accessToken);
      setNotifications(response.data);
      console.log("Notifications:", response);
    } catch (error) {
      console.error("Error loading notifications:", error);
      // Optionally, set an error state or display an error message
    }
  };

  const toggleNotificationVisibility = () => {
    setIsNotificationVisible(!isNotificationVisible);
  };

  const handleScroll = () => {
    if (isNotificationVisible) {
      setIsNotificationVisible(false);
    }
  };

  const formatDateTime = (date) => {
    try {
      if (isNaN(new Date(date).getTime())) {
        throw new RangeError('Invalid time value');
      }
      return format(new Date(date), 'yyyy-MM-dd | HH:mm:ss');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await markAllUnreadNotificationsAsRead(accessToken);
      setAllRead(true);
      setNotifications(
        notifications.map((notification) => ({
          ...notification,
          read_at: new Date().toISOString(),
        }))
      );
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      // Optionally, set an error state or display an error message
    }
  };

  const handleReadNotification = async (notificationId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await readNotification(accessToken, notificationId);
      setNotifications(
        notifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read_at: new Date().toISOString() }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
      // Optionally, set an error state or display an error message
    }
  };

  return (
    <>
      <div className="notification" onClick={toggleNotificationVisibility}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
        >
          <g clipPath="url(#clip0_2878_9336)">
            <path
              d="M25.0002 45.8335C27.2918 45.8335 29.1668 43.9585 29.1668 41.6668H20.8335C20.8335 43.9585 22.7085 45.8335 25.0002 45.8335ZM37.5002 33.3335V22.9168C37.5002 16.521 34.1043 11.1668 28.1252 9.75016V8.3335C28.1252 6.60433 26.7293 5.2085 25.0002 5.2085C23.271 5.2085 21.8752 6.60433 21.8752 8.3335V9.75016C15.9168 11.1668 12.5002 16.5002 12.5002 22.9168V33.3335L8.3335 37.5002V39.5835H41.6668V37.5002L37.5002 33.3335ZM33.3335 35.4168H16.6668V22.9168C16.6668 17.7502 19.8127 13.5418 25.0002 13.5418C30.1877 13.5418 33.3335 17.7502 33.3335 22.9168V35.4168Z"
              fill="#BE0202"
            />
          </g>
          <defs>
            <clipPath id="clip0_2878_9336">
              <rect width="50" height="50" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div
        className={`notification-container ${
          isNotificationVisible ? "visible" : ""
        }`}
      >
        <div className="notif">
          <h3>Notifications</h3>
          <p>
            Mark all read
            <input
              type="checkbox"
              checked={allRead && notifications.every(notification => notification.read_at)}
              className="check"
              onChange={handleMarkAllRead}
            />
          </p>
        </div>
        {notifications.length === 0 ? (
          <div className="empty-message">No notifications available</div>
        ) : (
          notifications.map((notification) => (
            <div
              className={`notification-item ${notification.read_at ? "read" : ""}`}
              key={notification.id}
              onClick={() => handleReadNotification(notification.id)}
            >
              <div className="message">
                <div className="mess">
                  <div className="mess1">{notification.message}</div>
                  <div className="mess2">
                    {notification.read_at
                      ? formatDateTime(notification.read_at)
                      : formatDateTime(notification.created_at)}
                  </div>
                </div>
                <div>
                  {!notification.read_at && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle cx="12" cy="12" r="12" fill="#BE0202" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Notification;
