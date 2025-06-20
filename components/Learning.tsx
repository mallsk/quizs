"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface Answer {
  result: string;
}

interface Props {
  topic: string;
}

export default function Learning({ topic }: Props) {
  const [ans, setAns] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchedRef = useRef(false);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (loading) {
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => (prev >= 95 ? prev : prev + 3));
      }, 700);
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
    const fetch = async () => {
      try {
        setError(null);
        setLoading(true);
        const res = await axios.post<Answer>(
          "/api/user/learning",
          { topic },
          { withCredentials: true }
        );
        setAns(res.data.result);
      } catch (error) {
        console.error("Failed to fetch learning content", error);
        setError(
          "Something went wrong while fetching the content. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    if (!fetchedRef.current) {
      fetch();
      fetchedRef.current = true;
    }
  }, [topic]);

  const handleGenerateQuiz = () => {
    // Navigate to quiz page with the current topic
    window.location.href = `/quiz?topic=${encodeURIComponent(topic)}`;
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
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Preparing comprehensive materials about{" "}
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
                This may take a few moments...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-xl">
        <CardContent className="py-12">
          <div className="text-center">
            <div className="inline-flex p-4 rounded-2xl bg-red-100 dark:bg-red-900/20 shadow-lg mb-6">
              <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Failed to Load Content
            </h2>
            <p className="text-lg text-red-600 dark:text-red-400 mb-6">
              {error}
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800 dark:text-gray-100">
            <div className="p-2 rounded-xl bg-gradient-to-br from-orange-400 to-pink-400 shadow-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="capitalize">Learning: {topic}</span>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Content Card */}
      <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-xl">
        <CardContent className="p-8">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap text-base">
              {ans}
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-8 py-3 rounded-md shadow-lg transition-all duration-300 hover:shadow-xl text-lg" onClick={()=>router.push("/dashboard")}>
          Home
        </Button>
        <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-8 py-3 rounded-md shadow-lg transition-all duration-300 hover:shadow-xl text-lg" onClick={()=>router.push("/dashboard/quiz")}>
          Quiz
        </Button>
      </div>

      {/* Action Card */}
      {/* <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-xl">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Ready to Test Your Knowledge?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Generate a quiz based on what you've learned about{" "}
                <span className="font-semibold text-orange-600 dark:text-orange-400 capitalize">
                  {topic}
                </span>
              </p>
            </div>
            <Button
              onClick={handleGenerateQuiz}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-2"
            >
              <Brain className="h-5 w-5" />
              Generate Quiz
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}
