// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import Loading from "./Loading";

// const Notification = () => {
//   const userData = JSON.parse(localStorage.getItem("userData"));
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await axios.get(
//           `https://localhost:7051/api/Notifications/username/${userData.username}`
//         );
//         setNotifications(response.data);
//       } catch (err) {
//         setError(err.response?.data?.title || "Error fetching notifications");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, [userData.username]);

//   console.log(notifications);

//   return (
//     <div className="flex-col bg-base-100 border border-stone-950 p-6 rounded-lg shadow-2xl text-center">
//       <h1 className="text-xl font-bold mb-4">Notification</h1>
//       {loading ? (
//         <Loading loading={loading} />
//       ) : error ? (
//         <div className="text-center">
//           <h1 className="text-2xl font-bold">{error}</h1>
//         </div>
//       ) : (
//         <div className="text-start">
//           <ul>
//             {notifications?.map((notification) => (
//               <li
//                 key={notification?.id}
//                 className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-2 rounded-lg mb-2 flex justify-between items-center"
//               >
//                 {notification?.content}

//                 {notification?.type === "Invite" &&
//                   (notification?.is_answer ? (
//                     <p className="btn btn-danger btn-sm">Answered</p>
//                   ) : (
//                     <Link
//                       to={`/quiz/two-players/with/${userData.username}/${notification?.attempt_Id}`}
//                       className="btn btn-primary btn-sm"
//                     >
//                       Accept
//                     </Link>
//                   ))}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Notification;

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "./Loading";

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
        setError(err.response?.data?.title || "Error fetching notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userData.username]);

  const updateNotification = async (notificationId) => {
    try {
      // Implement the API call to mark the notification as read
      await axios.put(
        `https://localhost:7051/api/Notifications/${notificationId}`,
        { is_read: true }
      );
    } catch (err) {
      console.error("Error updating notification:", err);
    }
  };

  if (loading) {
    return <Loading loading={loading} />;
  }

  const renderNotificationAction = (notification) => {
    if (notification?.notification_type === "Invite") {
      if (notification?.is_answer) {
        return <p className="btn btn-danger btn-sm">Answered</p>;
      } else {
        return (
          <Link
            to={`/quiz/two-players/with/${userData.username}/${notification?.attempt_Id}`}
            onClick={() => updateNotification(notification?.id)}
            className="btn btn-primary btn-sm"
          >
            Accept
          </Link>
        );
      }
    }
    return null;
    // return (
    //   <button
    //     onClick={() => updateNotification(notification?.id)}
    //     className="btn btn-primary btn-sm ml-2"
    //   >
    //     Mark as Read
    //   </button>
    // );
  };

  console.log(notifications);
  return (
    <div className="flex-col bg-base-100 border border-stone-950 p-6 rounded-lg shadow-2xl text-center">
      <h1 className="text-xl font-bold mb-4">Notification</h1>
      {error ? (
        <div className="flex items-center justify-center min-h-[15rem]">
          <h1 className="text-2xl font-bold">{error}</h1>
        </div>
      ) : (
        <div className="text-start min-h-[15rem]">
          <ul>
            {notifications?.map((notification) => (
              <li
                key={notification?.id}
                className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-2 rounded-lg mb-2 flex justify-between items-center"
              >
                {notification?.content}
                <div className="flex items-center">
                  {renderNotificationAction(notification)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notification;
