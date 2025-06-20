"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Trophy,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import Skeleton from "./Skeleton"

type Question = {
  question: string
  options: { [key: string]: string }
  correct: string
}

type QuizAttempt = {
  id: number
  userId: string
  topic: string
  questions: Question[]
  userAnswers: { [key: string]: string }
  score: number
  createdAt: string
}

export default function Quizs() {
  const [quizs, setQuizs] = useState<QuizAttempt[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedQuizId, setExpandedQuizId] = useState<number | null>(null)
  const [pageByQuiz, setPageByQuiz] = useState<{ [key: number]: number }>({})

  useEffect(() => {
    async function fetchQuizs() {
      try {
        setError(null)
        const res = await axios.get<{ quizzes: QuizAttempt[] }>("/api/user/quizs", {
          withCredentials: true,
        })
        setQuizs(res.data.quizzes)
      } catch (err) {
        console.error("Error fetching quizzes:", err)
        setError("Failed to load quiz attempts. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchQuizs()
  }, [])

  const handleExpand = (quizId: number) => {
    setExpandedQuizId((prev) => (prev === quizId ? null : quizId))
    setPageByQuiz((prev) => ({ ...prev, [quizId]: 0 }))
  }

  const handlePageChange = (quizId: number, direction: "prev" | "next") => {
    setPageByQuiz((prev) => {
      const currentPage = prev[quizId] || 0
      const maxPage = quizs.find((q) => q.id === quizId)?.questions.length || 1
      const newPage = direction === "prev" ? Math.max(currentPage - 1, 0) : Math.min(currentPage + 1, maxPage - 1)
      return { ...prev, [quizId]: newPage }
    })
  }

  const getScorePercentage = (score: number, total: number) => {
    return Math.round((score / total) * 100)
  }

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600 dark:text-green-400"
    if (percentage >= 60) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  const getBadgeColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
    if (percentage >= 60) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
    return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
  }

  // Loading State
  if (loading) {
    return (
      <div className="lg:w-2/4 lg:pt-18">
        {/* Mobile Layout */}
        <div className="lg:hidden px-4 py-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                Quiz Attempts
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Review your progress</p>
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block p-8 rounded-2xl min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
          <div className="max-w-5xl mx-auto px-4 py-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  Your Quiz Attempts
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300">Review your quiz attempts and track your progress.</p>
            </div>
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error State
  if (error) {
    return (
      <div className="lg:w-2/4 lg:pt-18">
        {/* Mobile Error */}
        <div className="lg:hidden px-4 py-4">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-3" />
              <p className="text-red-600 dark:text-red-400 mb-4 text-sm">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                size="sm"
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-4 py-2 rounded-full"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Desktop Error */}
        <div className="hidden lg:block min-h-screen rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
          <div className="max-w-5xl mx-auto px-4 py-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  Your Quiz Attempts
                </span>
              </h2>
              <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 py-12">
                <CardContent className="flex flex-col items-center justify-center">
                  <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                  <p className="text-lg text-red-600 dark:text-red-400 mb-4">{error}</p>
                  <Button
                    onClick={() => window.location.reload()}
                    className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-6 py-2 rounded-full"
                  >
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="lg:w-2/4 lg:pt-18">
      {/* Mobile Layout */}
      <div className="lg:hidden px-4 py-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">
            <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Quiz Attempts
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Review your progress</p>
        </div>

        {quizs.length === 0 ? (
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 text-center py-8">
            <CardContent>
              <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">No Quiz Attempts</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">Start taking quizzes to see them here.</p>
              <Button
                size="sm"
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-4 py-2 rounded-full"
              >
                Take Quiz
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {quizs.map((quiz) => {
              const currentPage = pageByQuiz[quiz.id] || 0
              const question = quiz.questions[currentPage]
              const userAnswer = quiz.userAnswers[currentPage.toString()]
              const scorePercentage = getScorePercentage(quiz.score, quiz.questions.length)
              const isExpanded = expandedQuizId === quiz.id

              return (
                <Card
                  key={quiz.id}
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <CardHeader
                    className="cursor-pointer hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-200 p-4"
                    onClick={() => handleExpand(quiz.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg font-bold capitalize text-gray-800 dark:text-gray-100 mb-2 truncate">
                          {quiz.topic}
                        </CardTitle>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                            <Calendar className="h-3 w-3" />
                            <span className="truncate">{new Date(quiz.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Trophy className="h-3 w-3 text-orange-500" />
                            <span className={`font-semibold text-sm ${getScoreColor(scorePercentage)}`}>
                              {quiz.score}/{quiz.questions.length}
                            </span>
                            <Badge className={`${getBadgeColor(scorePercentage)} text-xs px-2 py-0.5`}>
                              {scorePercentage}%
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="ml-3 flex-shrink-0">
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  {isExpanded && question && (
                    <CardContent className="border-t border-white/20 dark:border-gray-700/20">
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">
                          Q{currentPage + 1}: {question.question}
                        </h4>

                        <div className="space-y-2">
                          {Object.entries(question.options).map(([key, value]) => {
                            const isCorrect = key === question.correct
                            const isSelected = key === userAnswer

                            return (
                              <div
                                key={key}
                                className={`p-3 rounded-lg border transition-all duration-200 ${
                                  isCorrect
                                    ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-600"
                                    : isSelected
                                      ? "bg-red-50 dark:bg-red-900/50 border-red-300 dark:border-red-600"
                                      : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-start gap-2 flex-1 min-w-0">
                                    <span className="font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs flex-shrink-0">
                                      {key.toUpperCase()}
                                    </span>
                                    <span className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
                                      {value}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1 flex-shrink-0">
                                    {isCorrect && (
                                      <div className="flex items-center gap-1 text-green-700 dark:text-green-400 font-medium text-xs">
                                        <CheckCircle className="h-3 w-3" />
                                        <span className="hidden sm:inline">Correct</span>
                                      </div>
                                    )}
                                    {isSelected && key !== question.correct && (
                                      <div className="flex items-center gap-1 text-red-700 dark:text-red-400 font-medium text-xs">
                                        <XCircle className="h-3 w-3" />
                                        <span className="hidden sm:inline">Wrong</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-white/30 dark:bg-gray-800/30 rounded-lg p-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(quiz.id, "prev")}
                          disabled={currentPage === 0}
                          className="border-orange-300 dark:border-orange-600 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 disabled:opacity-50 disabled:cursor-not-allowed text-xs px-2 py-1"
                        >
                          <ChevronLeft className="h-3 w-3 mr-1" />
                          Prev
                        </Button>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                            {currentPage + 1}/{quiz.questions.length}
                          </span>
                          <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <div
                              className="bg-gradient-to-r from-orange-500 to-pink-500 h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${((currentPage + 1) / quiz.questions.length) * 100}%` }}
                            />
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(quiz.id, "next")}
                          disabled={currentPage === quiz.questions.length - 1}
                          className="border-orange-300 dark:border-orange-600 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 disabled:opacity-50 disabled:cursor-not-allowed text-xs px-2 py-1"
                        >
                          Next
                          <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block rounded-2xl min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                Your Quiz Attempts
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300">Review your quiz attempts and track your progress.</p>
          </div>

          {quizs.length === 0 ? (
            <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 text-center py-12">
              <CardContent>
                <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">No Quiz Attempts Yet</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Start taking quizzes to see your attempts here.</p>
                <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-6 py-2 rounded-full">
                  Take Your First Quiz
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {quizs.map((quiz) => {
                const currentPage = pageByQuiz[quiz.id] || 0
                const question = quiz.questions[currentPage]
                const userAnswer = quiz.userAnswers[currentPage.toString()]
                const scorePercentage = getScorePercentage(quiz.score, quiz.questions.length)
                const isExpanded = expandedQuizId === quiz.id

                return (
                  <Card
                    key={quiz.id}
                    className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <CardHeader
                      className="cursor-pointer hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-200"
                      onClick={() => handleExpand(quiz.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl font-bold capitalize text-gray-800 dark:text-gray-100 mb-2">
                            {quiz.topic}
                          </CardTitle>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                              <Calendar className="h-4 w-4" />
                              {new Date(quiz.createdAt).toLocaleString()}
                            </div>
                            <div className="flex items-center gap-2">
                              <Trophy className="h-4 w-4 text-orange-500" />
                              <span className={`font-semibold ${getScoreColor(scorePercentage)}`}>
                                {quiz.score} / {quiz.questions.length}
                              </span>
                              <Badge className={getBadgeColor(scorePercentage)}>{scorePercentage}%</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          )}
                        </div>
                      </div>
                    </CardHeader>

                    {isExpanded && question && (
                      <CardContent className="border-t border-white/20 dark:border-gray-700/20 pt-6">
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                            Question {currentPage + 1}: {question.question}
                          </h4>

                          <div className="space-y-3">
                            {Object.entries(question.options).map(([key, value]) => {
                              const isCorrect = key === question.correct
                              const isSelected = key === userAnswer

                              return (
                                <div
                                  key={key}
                                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                                    isCorrect
                                      ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-600"
                                      : isSelected
                                        ? "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-600"
                                        : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <span className="font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 px-2 py-1 rounded-lg text-sm">
                                        {key.toUpperCase()}
                                      </span>
                                      <span className="text-gray-800 dark:text-gray-200">{value}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      {isCorrect && (
                                        <div className="flex items-center gap-1 text-green-700 dark:text-green-400 font-medium text-sm">
                                          <CheckCircle className="h-4 w-4" />
                                          Correct
                                        </div>
                                      )}
                                      {isSelected && key !== question.correct && (
                                        <div className="flex items-center gap-1 text-red-700 dark:text-red-400 font-medium text-sm">
                                          <XCircle className="h-4 w-4" />
                                          Your answer
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>

                        <div className="flex items-center justify-between bg-white/30 dark:bg-gray-800/30 rounded-xl p-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(quiz.id, "prev")}
                            disabled={currentPage === 0}
                            className="border-orange-300 dark:border-orange-600 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Previous
                          </Button>

                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                              {currentPage + 1} of {quiz.questions.length}
                            </span>
                            <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-orange-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${((currentPage + 1) / quiz.questions.length) * 100}%` }}
                              />
                            </div>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(quiz.id, "next")}
                            disabled={currentPage === quiz.questions.length - 1}
                            className="border-orange-300 dark:border-orange-600 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Next
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
