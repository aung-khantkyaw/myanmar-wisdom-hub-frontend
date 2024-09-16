import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Error from "./Error";

export default function TwoPlayer() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [rival, setRival] = useState(String);
  const [isSearching, setIsSearching] = useState(false);
  const [usernames, setUsernames] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [notificationSent, setNotificationSent] = useState(false);

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await axios.get("https://localhost:7051/api/Users");
        const array = response.data.map((data) => data.username);
        const usernamesArray = array.filter(
          (item) => item !== userData.username
        );
        console.log(usernamesArray);
        setUsernames(usernamesArray);
      } catch (err) {
        setError(err.response?.data?.message || "User not found");
      } finally {
        setLoading(false);
      }
    };
    fetchUsernames();
  }, []);

  const findRival = () => {
    setIsSearching(true);

    setTimeout(() => {
      if (usernames.length > 0) {
        const randomRival =
          usernames[Math.floor(Math.random() * usernames.length)];
        setRival(randomRival);
      } else {
        setRival(null);
      }

      setIsSearching(false);
    }, 2000);
  };

  async function getNextAttemptQuizId() {
    try {
      const response = await axios.get(
        "https://localhost:7051/api/Attempt_Quizs"
      );
      const attemptQuizzes = response.data;

      if (attemptQuizzes && attemptQuizzes.length > 0) {
        const lastId = attemptQuizzes[attemptQuizzes.length - 1].attempt_Id; // Get the last Id
        const nextId = lastId + 1;
        return nextId;
      } else {
        console.log("No Attempt Quizzes found");
      }
    } catch (error) {
      console.error("Error fetching Attempt Quizzes:", error);
    }
  }

  async function getNextId() {
    const nextId = await getNextAttemptQuizId(); // Wait for the promise to resolve
    return nextId;
  }
  const sentNotification = async () => {
    if (rival != null) {
      if (notificationSent) {
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const id = await getNextId();
        const notificationData = {
          from_user_name: userData.username,
          to_user_name: rival,
          notification_type: "Invite",
          content: `${userData.username} is invited to Quiz`,
          attempt_Id: id,
        };
        console.log(id);
        await axios.post(
          "https://localhost:7051/api/Notifications",
          notificationData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setNotificationSent(true);
      } catch (err) {
        console.log(err.response);
        setError("Failed to send invitation.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full relative">
      <div className="w-full fixed top-0 z-10">
        <Navbar />
      </div>
      <div
        className="hero bg-base-200 min-h-screen"
        style={{
          backgroundImage: `url("HistoryofPuzzles.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="hero-content flex-col">
          <h1 className="text-3xl font-bold text-center mb-8">
            Two Player Quiz
          </h1>
          <p className="text-center mb-8">
            Welcome to the two-player quiz mode! Find a rival and get ready to
            compete!
          </p>

          <div className="max-w-md mx-auto border shadow rounded rounded-md">
            <div className="p-6">
              <AnimatePresence mode="wait">
                {!rival && !isSearching && (
                  <motion.div
                    key="find-rival"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center w-[300px]"
                  >
                    <button
                      onClick={findRival}
                      className="w-full btn btn-neutral"
                    >
                      Find Rival
                    </button>
                  </motion.div>
                )}
                {isSearching && (
                  <motion.div
                    key="searching"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex flex-col items-center w-[300px]"
                  >
                    <span className="loading loading-ring loading-lg"></span>
                    <p>Searching for a rival...</p>
                  </motion.div>
                )}
                {rival && (
                  <motion.div
                    key="rival-found"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center w-[300px]"
                  >
                    <h2 className="text-2xl font-bold mb-4">{rival}</h2>
                    <div className="flex flex-col gap-2">
                      <Link
                        to={`/quiz/two-players/${userData.username}/${rival}`}
                        className="btn btn-neutral"
                        onClick={() => sentNotification()}
                      >
                        Start Quiz
                      </Link>
                      <button
                        onClick={() => setRival(null)}
                        className="btn btn-neutral"
                      >
                        Find New Rival
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {error && <Error error={error} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
