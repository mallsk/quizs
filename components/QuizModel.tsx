"use client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Redirect } from "./Redirect";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Badge,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Home,
  Loader2,
  Send,
  Trophy,
} from "lucide-react";
import { Button } from "./ui/button";

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

const QUIZ_TIME_SECONDS = 600;

const QuizModel = ({ topic, onLoaded }: QuizModelProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME_SECONDS);
  const [showReadyMessage, setShowReadyMessage] = useState(false);
  const [push, setPush] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fetchedRef = useRef(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Animate the progress bar while loading
  useEffect(() => {
    if (loading) {
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => (prev >= 95 ? prev : prev + 3));
      }, 300);
    } else {
      setProgress(100);
      if (progressIntervalRef.current)
        clearInterval(progressIntervalRef.current);
    }
    return () => {
      if (progressIntervalRef.current)
        clearInterval(progressIntervalRef.current);
    };
  }, [loading]);

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
        setShowReadyMessage(true);
        setTimeout(() => setShowReadyMessage(false), 5000);
        setLoading(false);
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
      if (timerRef.current) clearInterval(timerRef.current);
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

  if (push) return <Redirect to="/dashboard" />;

  const getScorePercentage = () => {
    const correctAnswers = Object.entries(selectedAnswers).filter(
      ([index, ans]) => questions[Number(index)].correct === ans
    ).length;
    return Math.round((correctAnswers / questions.length) * 100);
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600 dark:text-green-400";
    if (percentage >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getBadgeColor = (percentage: number) => {
    if (percentage >= 80)
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    if (percentage >= 60)
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
  };

  const handleOptionChange = (option: string) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: option,
    }));
  };

  const handlePrev = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1)
      setCurrentQuestion(currentQuestion + 1);
  };

  const handleSubmit = async () => {
    if (submitted) return;
    setSubmitted(true);
    setShowResults(true);

    if (timerRef.current) clearInterval(timerRef.current);

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
    if (optionKey === selected && optionKey !== correctAnswer)
      return "bg-red-300 font-bold";
    return "";
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-xl">
          <CardContent className="py-12">
            <div className="text-center">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-400 shadow-lg mb-6">
                <Loader2 className="h-12 w-12 text-white animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Generating Your Quiz
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Creating personalized questions about{" "}
                <span className="font-semibold text-orange-600 dark:text-orange-400">
                  "{topic}"
                </span>
              </p>
              <div className="w-full max-w-md mx-auto bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-orange-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                This usually takes 10–15 seconds...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (questions.length === 0) return <p>No questions found for the topic.</p>;

  if (showReadyMessage) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-xl">
          <CardContent className="py-12">
            <div className="text-center">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-400 shadow-lg mb-6">
                <CheckCircle2 className="h-12 w-12 text-white animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Generated Your Quiz
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Created personalized questions about{" "}
                <span className="font-semibold text-orange-600 dark:text-orange-400">
                  "{topic}"
                </span>
              </p>
              <p className="text-md text-gray-500 dark:text-gray-400 mt-4">
                All the best!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-xl overflow-hidden">
          <CardHeader className="bg-white/30 dark:bg-gray-800/30 border-b border-white/20 dark:border-gray-700/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                Question {currentQuestion + 1} of {questions.length}
              </CardTitle>
              {!showResults && (
                <div className="flex items-center animate-pulse flex justify-center gap-2 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-full border border-red-200 border-2 dark:border-red-900">
                  <Clock className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <span className="font-mono font-bold text-red-600 dark:text-red-400">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            {/* <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                <span>Progress</span>
                <span>
                  {Math.round(((currentQuestion + 1) / questions.length) * 100)}
                  %
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-orange-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      ((currentQuestion + 1) / questions.length) * 100
                    }%`,
                  }}
                />
              </div>
            </div> */}
          </CardHeader>

          <CardContent className="pl-8 pr-8">
            {!showResults ? (
              <>
                {/* Question */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 leading-relaxed">
                    {questions[currentQuestion].question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-4">
                    {Object.entries(questions[currentQuestion].options).map(
                      ([key, value]) => {
                        const isSelected =
                          selectedAnswers[currentQuestion] === key;
                        const answerColor = getAnswerColor(key);

                        return (
                          <div
                            key={key}
                            className={`group relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                              isSelected
                                ? "bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-600 shadow-md"
                                : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600"
                            } ${answerColor}`}
                            onClick={() =>
                              !showResults && handleOptionChange(key)
                            }
                          >
                            <label className="flex items-center gap-4 cursor-pointer w-full">
                              <div className="relative">
                                <input
                                  type="radio"
                                  name={`question-${currentQuestion}`}
                                  value={key}
                                  checked={isSelected}
                                  onChange={() => handleOptionChange(key)}
                                  disabled={showResults}
                                  className="sr-only"
                                />
                                <div
                                  className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                                    isSelected
                                      ? "border-orange-500 bg-orange-500"
                                      : "border-gray-300 dark:border-gray-600 group-hover:border-orange-400"
                                  }`}
                                >
                                  {isSelected && (
                                    <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-3 flex-1">
                                <span className="font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 px-3 py-1 rounded-lg text-sm min-w-[2rem] text-center">
                                  {key.toUpperCase()}
                                </span>
                                <span className="text-gray-800 dark:text-gray-200 flex-1">
                                  {value}
                                </span>
                              </div>
                            </label>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                  <Button
                    onClick={handlePrev}
                    disabled={currentQuestion === 0}
                    variant="outline"
                    className="border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {Object.keys(selectedAnswers).length} of{" "}
                      {questions.length} answered
                    </p>
                  </div>

                  {currentQuestion === questions.length - 1 ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={
                        Object.keys(selectedAnswers).length !== questions.length
                      }
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-black hover:text-white font-semibold px-6 py-2 rounded-md shadow-lg transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      title={
                        Object.keys(selectedAnswers).length !== questions.length
                          ? "Answer all questions to submit"
                          : undefined
                      }
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Submit Quiz
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      disabled={currentQuestion === questions.length - 1}
                      className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-6 py-2 rounded-md shadow-lg transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </>
            ) : (
              /* Results Section */
              <div className="text-center py-8">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-400 shadow-lg mb-6">
                  <Trophy className="h-12 w-12 text-white" />
                </div>

                <h3 className="text-3xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                    Quiz Complete!
                  </span>
                </h3>

                <div className="bg-white/30 dark:bg-gray-800/30 rounded-2xl p-8 mb-8 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                        {
                          Object.entries(selectedAnswers).filter(
                            ([index, ans]) =>
                              questions[Number(index)].correct === ans
                          ).length
                        }
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        Correct
                      </div>
                    </div>
                    <div className="text-2xl text-gray-400">/</div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                        {questions.length}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        Total
                      </div>
                    </div>
                  </div>

                  

                  <div className="mt-6">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${getScorePercentage()}%` }}
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => setPush(true)}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl text-lg"
                >
                  <Home className="h-5 w-5 mr-2" />
                  Go to Home
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizModel;
