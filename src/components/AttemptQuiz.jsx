import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Loading from "./Loading";

export default function AttemptQuiz() {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(10);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);
  const playerOneUsername = useParams().username ?? null;
  const playerTwoUsername = useParams().rival ?? null;

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7051/api/Quizs/random"
        );
        setQuizzes(response.data);
        setLoading(false);
        setHasFetched(true);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (!hasFetched) {
      fetchQuizzes();
    }
  }, [hasFetched]);

  useEffect(() => {
    if (isCompleted || quizzes.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft === 1) {
          if (currentQuizIndex === quizzes.length - 1) {
            handleComplete();
          } else {
            handleNext();
          }
          return 10;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuizIndex, isCompleted, quizzes.length]);

  const handleAnswer = (answer) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuizIndex]: answer,
    }));
    if (answer === quizzes[currentQuizIndex].answer) {
      setPlayerOneScore((playerOneScore) => playerOneScore + 1);
    }
  };

  const handleNext = () => {
    if (currentQuizIndex >= quizzes.length - 1) return;
    setTimeLeft(10);
    setIsAnswered(false);
    setCurrentQuizIndex((prevIndex) => prevIndex + 1);
  };

  const handleComplete = async (e) => {
    setIsCompleted(true);
    const quizIds = quizzes.map((quiz) => quiz.id);
    const attemptQuizData = {
      player_one_username: playerOneUsername,
      player_two_username: playerTwoUsername,
      player_one_score: playerOneScore,
      QuizIdsString: quizIds.join(","),
    };
    e.preventDefault();

    try {
      await axios.post(
        "https://localhost:7051/api/Attempt_Quizs",
        attemptQuizData
      );
      setSuccess("Successful");
      console.log(success);
    } catch (err) {
      setError(err.response || "Failed");
      console.log(error);
    }
  };

  const handleRestart = () => {
    setCurrentQuizIndex(0);
    setPlayerOneScore(0);
    setAnswers({});
    setTimeLeft(10);
    setIsAnswered(false);
    setIsCompleted(false);
    setHasFetched(false);
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{
        backgroundImage: `url("HistoryofPuzzles.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {loading && <Loading loading={loading} />}
      {isCompleted ? (
        <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Quiz Completed
          </h2>
          <p className="text-lg mb-4 text-center">
            Your Score: {playerOneScore} / 5
          </p>
          <div className="flex justify-between">
            <button
              onClick={handleRestart}
              className="text-base-100 font-bold bg-primary text-card p-4 rounded-md hover:bg-primary-hover transition duration-300 ease-in-out w-1/3 text-center"
            >
              Restart Quiz
            </button>
            <a
              href="/quiz"
              className="text-base-100 font-bold bg-primary text-card p-4 rounded-md hover:bg-primary-hover transition duration-300 ease-in-out w-1/3 text-center"
            >
              Exit
            </a>
          </div>
        </div>
      ) : quizzes.length > 0 && quizzes[currentQuizIndex] ? (
        <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">
            Quiz {currentQuizIndex + 1} of {quizzes.length}
          </h2>
          <p className="text-lg mb-4">{quizzes[currentQuizIndex]?.question}</p>

          <div className="grid grid-cols-2 gap-4">
            {["option_one", "option_two", "option_three", "option_four"].map(
              (optionKey, index) => {
                const option = quizzes[currentQuizIndex][optionKey];
                const isSelected = answers[currentQuizIndex] === option;
                const isCorrect = option === quizzes[currentQuizIndex].answer;
                const buttonStyle = isAnswered
                  ? isCorrect
                    ? "bg-green-500 text-green-50"
                    : isSelected
                    ? "bg-red-500 text-red-50"
                    : ""
                  : "";

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    disabled={isAnswered}
                    className={`bg-card-foreground text-card p-4 rounded-md ${buttonStyle}
                    hover:bg-card-foreground-hover
                    transition
                    duration-300
                    ease-in-out`}
                  >
                    {option}
                  </button>
                );
              }
            )}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-lg font-bold">Time left: {timeLeft} s</div>
            {isAnswered || currentQuizIndex === quizzes.length - 1 ? (
              <button
                onClick={
                  currentQuizIndex === quizzes.length - 1
                    ? handleComplete
                    : handleNext
                }
                className="text-base-100 font-bold bg-primary text-card p-4 rounded-md hover:bg-primary-hover transition duration-300 ease-in-out"
              >
                {currentQuizIndex === quizzes.length - 1 ? "Complete" : "Next"}
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">No quizzes available</h2>
        </div>
      )}
    </div>
  );
}
