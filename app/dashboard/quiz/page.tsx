"use client";
import QuizModel from "@/components/QuizModel";
import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, Sparkles, BookOpen, Loader2, ArrowRight } from "lucide-react";

export default function Quiz() {
  const [topic, setTopic] = useState("");
  const [submittedTopic, setSubmittedTopic] = useState("");
  const [question, setQuestions] = useState("15");
  const [language, setLanguage] = useState("english");
  const [loading, setLoading] = useState(false);
  const suggestions = [
    // Govt Exams
    "UPSC Civil Services",
    "SSC CGL",
    "IBPS PO",
    "RRB NTPC",
    "State PSC Exams",
    "NDA",
    "CDS",
    "Banking Awareness",

    // Law
    "Indian Constitution",
    "Fundamental Rights",
    "IPC Sections",
    "Legal GK",
    "Judicial System",

    // Coding
    "JavaScript",
    "Python",
    "C++",
    "Data Structures",
    "Algorithms",
    "ReactJS",
    "Operating Systems",
    "DBMS",
    "Computer Networks",

    // Science & Math
    "Mathematics",
    "Algebra",
    "Geometry",
    "Trigonometry",
    "Calculus",
    "Biology",
    "Cell Structure",
    "Genetics",
    "Chemistry",
    "Periodic Table",
    "Organic Chemistry",
    "Physics",
    "Motion",
    "Thermodynamics",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() !== "") {
      setLoading(true); // show loader
      setSubmittedTopic(topic);
    }
  };

  const onQuizLoaded = () => {
    setLoading(true); // hide loader & form
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-2">
      <div className="container mx-auto px-4 py-8">
        {!submittedTopic && (
          <div className="max-w-2xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-400 shadow-lg mb-6">
                <Brain className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  Generate Quiz
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
                Enter any topic and get a personalized quiz to your learning
                needs.
              </p>
            </div>

            {/* Quiz Generation Form */}
            <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-xl">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center justify-center gap-2">
                  <Sparkles className="h-6 w-6 text-orange-500" />
                  Create Your Quiz
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="topic"
                      className="text-lg font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Quiz Topic
                    </Label>
                    <Input
                      id="topic"
                      type="text"
                      list="topicSuggestions"
                      placeholder="e.g., JavaScript, World History, Biology, Mathematics, Current Affairs..."
                      className="w-full px-4 py-3 text-lg bg-white/80 dark:bg-gray-800/80 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-orange-400 dark:focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-800 transition-all duration-200"
                      value={topic}
                      onChange={(e) => {
                        const words = e.target.value.trim().split(/\s+/);
                        if (words.length <= 3) {
                          setTopic(e.target.value);
                        }
                      }}
                      required
                    />
                    <datalist id="topicSuggestions">
                      {suggestions.map((item, index) => (
                        <option key={index} value={item} />
                      ))}
                    </datalist>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Be specific for better questions. Try "React Hooks"
                      instead of just "React"
                    </p>
                    <div className="space-y-2">
                      <Label className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        Select Language
                      </Label>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <input
                            type="radio"
                            name="language"
                            value="english"
                            checked={language === "english"}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="accent-orange-500"
                          />
                          English
                        </label>
                        <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <input
                            type="radio"
                            name="language"
                            value="kannada"
                            checked={language === "kannada"}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="accent-orange-500"
                          />
                          Kannada
                        </label>
                      </div>
                      <Label className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        Select How many questions want
                      </Label>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <input
                            type="radio"
                            name="question"
                            value="10"
                            checked={question === "10"}
                            onChange={(e) => setQuestions(e.target.value)}
                            className="accent-orange-500"
                          />
                          10
                        </label>
                        <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <input
                            type="radio"
                            name="questions"
                            value="15"
                            checked={question === "15"}
                            onChange={(e) => setQuestions(e.target.value)}
                            className="accent-orange-500"
                          />
                          15
                        </label>
                        <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <input
                            type="radio"
                            name="questions"
                            value="20"
                            checked={question === "20"}
                            onChange={(e) => setQuestions(e.target.value)}
                            className="accent-orange-500"
                          />
                          20
                        </label>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={!topic.trim()}
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    Generate Quiz
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>

                {/* Features List */}
                <div className="mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
                    What you'll get:
                  </h3>
                  <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="inline-flex p-2 rounded-lg bg-orange-100 dark:bg-orange-900/20 mb-2">
                        <Brain className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        AI-Generated Questions
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="inline-flex p-2 rounded-lg bg-pink-100 dark:bg-pink-900/20 mb-2">
                        <BookOpen className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Multiple Choice Format
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="inline-flex p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20 mb-2">
                        <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Instant Results
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {submittedTopic && (
          // <div className="max-w-4xl mx-auto">
          //   <div className="mb-6 flex items-center justify-between">
          //     <div>
          //       <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          //         Quiz: <span className="text-orange-600 dark:text-orange-400">{submittedTopic}</span>
          //       </h2>
          //       <p className="text-gray-600 dark:text-gray-300">Answer all questions to see your results</p>
          //     </div>
          //   </div>
          <QuizModel
            topic={submittedTopic}
            language={language}
            question={question}
            onLoaded={onQuizLoaded}
          />
          // </div>
        )}
      </div>
    </div>
  );
}
