"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react"

interface Answer {
  result: string;
}

interface Props {
  topic: string;
}

export default function Learning({ topic }: Props) {
  const [ans, setAns] = useState<string>("");
    const fetchedRef = useRef(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.post<Answer>(
          "/api/user/learning",
          { topic },
          { withCredentials: true }
        );
        setAns(res.data.result);
      } catch (error) {
        console.error("Failed to fetch learning content", error);
        setAns("Something went wrong while fetching the content.");
      }
    };
if (!fetchedRef.current) {
    fetch();
    fetchedRef.current = true;
  }
  }, [topic]);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 capitalize">Learning: {topic}</h2>
      <div className="bg-white p-4 rounded shadow text-gray-800 whitespace-pre-wrap">
        {ans ? ans : "Loading..."}
      </div>
    </div>
  );
}