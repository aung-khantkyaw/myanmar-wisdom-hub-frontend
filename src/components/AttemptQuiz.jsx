"use client";

import { useState, useEffect } from "react";

export default function AttemptQuiz() {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(10);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  // const [showScore, setShowScore] = useState(false);

  const quizzes = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: "Paris",
    },
    {
      question: "What is the largest planet in our solar system?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Jupiter",
    },
    {
      question: "What is the currency used in Japan?",
      options: ["Dollar", "Euro", "Yen", "Pound"],
      correctAnswer: "Yen",
    },
    {
      question: "What is the tallest mammal?",
      options: ["Elephant", "Giraffe", "Rhinoceros", "Hippopotamus"],
      correctAnswer: "Giraffe",
    },
    {
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Arctic Ocean",
        "Pacific Ocean",
      ],
      correctAnswer: "Pacific Ocean",
    },
  ];

  useEffect(() => {
    if (isCompleted) return;

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
  }, [currentQuizIndex, isCompleted]);

  const handleAnswer = (answer) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuizIndex]: answer,
    }));
    if (answer === quizzes[currentQuizIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNext = () => {
    if (currentQuizIndex >= quizzes.length - 1) return;
    setTimeLeft(10);
    setIsAnswered(false);
    setCurrentQuizIndex((prevIndex) => prevIndex + 1);
  };

  const handleComplete = () => {
    setIsCompleted(true);
    // setShowScore(true);
  };

  const handleRestart = () => {
    setCurrentQuizIndex(0);
    setScore(0);
    setAnswers({});
    setTimeLeft(10);
    setIsAnswered(false);
    setIsCompleted(false);
    // setShowScore(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      {!isCompleted ? (
        <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">
            Quiz {currentQuizIndex + 1} of {quizzes.length}
          </h2>
          <p className="text-lg mb-4">{quizzes[currentQuizIndex].question}</p>
          <div className="grid grid-cols-2 gap-4">
            {quizzes[currentQuizIndex].options.map((option, index) => {
              const isSelected = answers[currentQuizIndex] === option;
              const isCorrect =
                option === quizzes[currentQuizIndex].correctAnswer;
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
                  className={`bg-card-foreground text-card p-4 rounded-md transition-colors ${buttonStyle}`}
                >
                  {option}
                </button>
              );
            })}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-lg font-bold">Time left: {timeLeft}s</div>
            {isAnswered || currentQuizIndex === quizzes.length - 1 ? (
              <button
                onClick={
                  currentQuizIndex === quizzes.length - 1
                    ? handleComplete
                    : handleNext
                }
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md transition-colors hover:bg-primary/90"
              >
                {currentQuizIndex === quizzes.length - 1 ? "Complete" : "Next"}
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Quiz Complete</h2>
          <p className="text-lg mb-4">
            Your score: {score} / {quizzes.length}
          </p>
          <button
            onClick={handleRestart}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md transition-colors hover:bg-primary/90"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
