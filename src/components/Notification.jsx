import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";

const Notification = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7051/api/Notifications/username/${userData.username}`
        );
        setNotifications(response.data);
      } catch (err) {
        setError(err.response || "Error fetching notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userData.username]);

  const updateNotification = async (id) => {
    try {
      await axios.put(`https://localhost:7051/api/Notifications/${id}`);
      setNotifications(
        notifications.filter((notification) => notification.id !== id)
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Error updating notification"
      );
    }
  };

  return (
    <div className="flex-col bg-base-100 border border-stone-950 p-6 rounded-lg shadow-2xl text-center">
      <h1 className="text-xl font-bold mb-4">Notification</h1>
      {loading ? (
        <Loading loading={loading} />
      ) : error ? (
        <Error error={error} />
      ) : (
        <div className="text-start">
          <ul>
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-2 rounded-lg mb-2 flex justify-between items-center"
              >
                {notification.content}
                {notification.is_answer ? (
                  <p className="btn btn-danger btn-sm">Answered</p>
                ) : (
                  <Link
                    to={`/quiz/two-players/with/${userData.username}/${notification.attempt_Id}`}
                    onClick={() => updateNotification(notification.id)}
                    className="btn btn-primary btn-sm"
                  >
                    Accept
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notification;
