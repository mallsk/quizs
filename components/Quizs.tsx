"use client";
import { useEffect, useState } from "react";
import axios from "axios";

type Question = {
  question: string;
  options: { [key: string]: string };
  correct: string;
};

type QuizAttempt = {
  id: number;
  userId: string;
  topic: string;
  questions: Question[];
  userAnswers: { [key: string]: string };
  score: number;
  createdAt: string;
};

export default function Quizs() {
  const [quizs, setQuizs] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedQuizId, setExpandedQuizId] = useState<number | null>(null);
  const [pageByQuiz, setPageByQuiz] = useState<{ [key: number]: number }>({});
//todo: error
  useEffect(() => {
    async function fetchQuizs() {
      try {
        const res = await axios.get<{ quizzes: QuizAttempt[] }>("/api/user/quizs", {
          withCredentials: true,
        });
        setQuizs(res.data.quizzes);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchQuizs();
  }, []);

  const handleExpand = (quizId: number) => {
    setExpandedQuizId((prev) => (prev === quizId ? null : quizId));
    setPageByQuiz((prev) => ({ ...prev, [quizId]: 0 }));
  };

  const handlePageChange = (quizId: number, direction: "prev" | "next") => {
    setPageByQuiz((prev) => {
      const currentPage = prev[quizId] || 0;
      const maxPage = quizs.find((q) => q.id === quizId)?.questions.length || 1;
      const newPage =
        direction === "prev"
          ? Math.max(currentPage - 1, 0)
          : Math.min(currentPage + 1, maxPage - 1);
      return { ...prev, [quizId]: newPage };
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Quiz Attempts</h2>

      {loading && <p className="text-center text-gray-500">Loading quizzes...</p>}

      {!loading && quizs.length === 0 && (
        <p className="text-center text-gray-500">No quizzes attempted yet.</p>
      )}

      <div className="grid gap-6">
        {quizs.map((quiz) => {
          const currentPage = pageByQuiz[quiz.id] || 0;
          const question = quiz.questions[currentPage];
          const userAnswer = quiz.userAnswers[currentPage.toString()];

          return (
            <div
              key={quiz.id}
              className="bg-white shadow-md rounded-xl p-5 border cursor-pointer"
            >
              <div onClick={() => handleExpand(quiz.id)}>
                <h3 className="text-xl font-semibold capitalize mb-1">{quiz.topic}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  Attempted on: {new Date(quiz.createdAt).toLocaleString()}
                </p>
                <p className="text-gray-800 font-medium">
                  Score: {quiz.score} / {quiz.questions.length}
                </p>
              </div>

              {expandedQuizId === quiz.id && question && (
                <div className="mt-4 border-t pt-4">
                  <p className="text-md font-semibold mb-2">
                    Question {currentPage + 1}: {question.question}
                  </p>

                  <ul className="mb-4">
                    {Object.entries(question.options).map(([key, value]) => {
                      const isCorrect = key === question.correct;
                      const isSelected = key === userAnswer;
                      return (
                        <li
                          key={key}
                          className={`p-2 rounded-md mb-1 ${
                            isCorrect
                              ? "bg-green-100 border border-green-500"
                              : isSelected
                              ? "bg-red-100 border border-red-500"
                              : "bg-gray-100"
                          }`}
                        >
                          <strong>{key.toUpperCase()}.</strong> {value}
                          {isCorrect && (
                            <span className="ml-2 text-green-700 font-medium">
                              (Correct)
                            </span>
                          )}
                          {isSelected && key !== question.correct && (
                            <span className="ml-2 text-red-700 font-medium">
                              (Your answer)
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>

                  <div className="flex justify-between items-center mt-4">
                    <button
                      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                      onClick={() => handlePageChange(quiz.id, "prev")}
                      disabled={currentPage === 0}
                    >
                      Previous
                    </button>
                    <span>
                      {currentPage + 1} / {quiz.questions.length}
                    </span>
                    <button
                      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                      onClick={() => handlePageChange(quiz.id, "next")}
                      disabled={currentPage === quiz.questions.length - 1}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
