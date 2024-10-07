import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";

export default function AttemptQuizWith() {
  const { username, attemptId } = useParams();
  const [quizIds, setQuizIds] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(10);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchAttemptQuiz = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7051/api/Attempt_Quizs/${attemptId}`
        );
        setQuizIds(response.data.quizIds);
        setPlayerOneScore(response.data.player_one_score);
        setLoading(false); // Set loading to false after fetching quiz IDs
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAttemptQuiz();
  }, [attemptId]); // Fetch attempt quiz data only when attemptId changes

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (quizIds.length === 0) return; // Skip if there are no quiz IDs

      try {
        const response = await axios.get(
          `https://localhost:7051/api/Quizs/ids?ids=${quizIds.join(",")}`
        );
        setQuizzes(response.data);
        setLoading(false); // Set loading to false after fetching quizzes
      } catch (error) {
        setError(error.response);
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [quizIds]); // Fetch quizzes only when quizIds changes

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
      setPlayerTwoScore((playerTwoScore) => playerTwoScore + 1);
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
    const attemptQuizData = {
      player_two_score: playerTwoScore,
    };
    e.preventDefault();
    try {
      await axios.put(
        `https://localhost:7051/api/Attempt_Quizs/${attemptId}`,
        attemptQuizData
      );
      setSuccess("Successful");
      console.log(success);
    } catch (err) {
      setError(err.response || "Failed");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      {loading && <Loading loading={loading} />}
      {isCompleted ? (
        <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Quiz Completed
          </h2>
          <p className="text-lg mb-4 text-center">
            Your Score: {playerTwoScore} / 5
          </p>
          <p className="text-lg mb-4 text-center">
            {playerTwoScore > playerOneScore
              ? "You won!"
              : playerTwoScore === playerOneScore
              ? "It's a tie!"
              : "You lost!"}
          </p>
          <div className="flex justify-center">
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
