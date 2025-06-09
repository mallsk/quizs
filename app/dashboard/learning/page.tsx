"use client";
import Learning from "@/components/Learning";
import { useState } from "react";

export default function LearningPage(){
    const [topic, setTopic] = useState("");
    const [submittedTopic, setSubmittedTopic] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() !== "") {
      setLoading(true);     // show loader
      setSubmittedTopic(topic);
    }
  };
    return (
        <div className="p-4">
        {!submittedTopic && (
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            placeholder="Enter quiz topic"
            className="border px-2 py-1 rounded mr-2 w-72"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            Learn
          </button>
        </form>
      )}
      
      {submittedTopic && (
        <Learning topic={submittedTopic}/>
      )}
    </div>
    )
}