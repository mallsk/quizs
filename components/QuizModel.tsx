"use client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Redirect } from "./Redirect";

interface Question {
  question: string;
  options: { [key: string]: string };
  correct: string;
}

interface QuizResponse {
  questions: Question[];
}
interface QuizModelProps {
  topic: string;
  onLoaded?: () => void;
}

const QUIZ_TIME_SECONDS = 120; // 2 minutes for whole quiz

const QuizModel = ({ topic, onLoaded }: QuizModelProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME_SECONDS);
  const [push, setPush] = useState(false);
  const [showReadyMessage, setShowReadyMessage] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchedRef = useRef(false);

useEffect(() => {
  const fetchQuestions = async () => {
    try {
      const response = await axios.post<QuizResponse>(
        "/api/user/quiz",
        { topic },
        { withCredentials: true }
      );
      setQuestions(response.data.questions);
    } catch (err) {
      console.error("Error fetching quiz:", err);
    } finally {
      setLoading(false);
      setShowReadyMessage(true);
      setTimeout(() => setShowReadyMessage(false), 3000); // 3 seconds
      if (onLoaded) onLoaded();
    }
  };

  if (!fetchedRef.current) {
    fetchQuestions();
    fetchedRef.current = true;
  }
}, [topic, onLoaded]);

  useEffect(() => {
    if (loading || showResults) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          clearInterval(timerRef.current!);
          handleSubmit();
          return 0;
        }
        return time - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [loading, showResults]);

  if(push){
    return <Redirect to="/dashboard"/>
  }
  const handleOptionChange = (option: string) => {
    if (showResults) return; // disable changes after submit
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: option,
    }));
  };

  const handlePrev = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) setCurrentQuestion(currentQuestion + 1);
  };

  const handleSubmit = async () => {
  if (submitted) return; // Prevent double submission
  setSubmitted(true);
  setShowResults(true);

  if (timerRef.current) clearInterval(timerRef.current);

  // Calculate score
  const score = Object.entries(selectedAnswers).filter(
    ([index, ans]) => questions[Number(index)].correct === ans
  ).length;

  try {
    await axios.post(
      "/api/user/quiz/submit",
      {
        topic,
        questions,
        userAnswers: selectedAnswers,
        score,
      },
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Failed to save quiz results", error);
  }
};


  const getAnswerColor = (optionKey: string) => {
    if (!showResults) return "";
    const correctAnswer = questions[currentQuestion].correct;
    const selected = selectedAnswers[currentQuestion];
    if (optionKey === correctAnswer) return "bg-green-300 font-bold";
    if (optionKey === selected && optionKey !== correctAnswer) return "bg-red-300 font-bold";
    return "";
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (loading) return <p>Loading questions...</p>;
  if (questions.length === 0) return <p>No questions found for the topic.</p>;
  if (showReadyMessage) return <p className="text-center text-lg font-semibold">Quiz ready!</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Question {currentQuestion + 1} / {questions.length}
        </h2>
        {!showResults && (
          <div className="text-red-600 font-mono font-bold">
            Time Left: {formatTime(timeLeft)}
          </div>
        )}
      </div>

      <div>
        <h3 className="mb-3 font-bold text-lg">{questions[currentQuestion].question}</h3>
        <ul className="space-y-2">
          {Object.entries(questions[currentQuestion].options).map(([key, value]) => {
            const isSelected = selectedAnswers[currentQuestion] === key;
            const answerColor = getAnswerColor(key);

            return (
              <li
                key={key}
                className={`p-2 rounded cursor-pointer border border-gray-300 hover:bg-gray-100 ${answerColor}`}
                onClick={() => {
                  if (!showResults) handleOptionChange(key);
                }}
              >
                <label className="flex items-center space-x-2 cursor-pointer w-full">
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={key}
                    checked={isSelected}
                    onChange={() => handleOptionChange(key)}
                    disabled={showResults}
                    className="cursor-pointer"
                  />
                  <span>
                    <strong>{key.toUpperCase()}.</strong> {value}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrev}
          disabled={currentQuestion === 0}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>

        {currentQuestion === questions.length - 1 && !showResults ? (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            disabled={Object.keys(selectedAnswers).length !== questions.length}
            title={
              Object.keys(selectedAnswers).length !== questions.length
                ? "Answer all questions to submit"
                : undefined
            }
          >
            Submit
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={currentQuestion === questions.length - 1}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Next
          </button>
        )}
      </div>

      {showResults && (
        <div className="mt-6 p-4 bg-gray-100 rounded text-center">
          <h3 className="text-lg font-semibold mb-2">Quiz Results</h3>
          <p>
            You scored{" "}
            {
              Object.entries(selectedAnswers).filter(
                ([index, ans]) => questions[Number(index)].correct === ans
              ).length
            }{" "}
            out of {questions.length}
          </p>
            
          {/* <button
            onClick={() => {
              setCurrentQuestion(0);
              setSelectedAnswers({});
              setShowResults(false);
              setTimeLeft(QUIZ_TIME_SECONDS);
            }}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Restart Quiz
          </button> */}
          <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700" onClick={()=>{
              setPush(true);
            }}>Go to home</button>
        </div>
        
      )}
    </div>
  );
};

export default QuizModel;
