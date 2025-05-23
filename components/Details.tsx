"use client";
import axios from "axios";
import { useEffect, useState } from "react";

type ApiResponse = {
  user: {
    name: string;
    email: string;
    image:string;
  };
};

export default function Details() {
const [user, setUser] = useState<ApiResponse["user"] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>("/api/user", {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []); // ✅ run once on mount

  return (
  <div>
    {user && (
      <>
        <p>Hi {user.name}</p>
        {user.image && <img src={user.image} alt="Profile" />}
      </>
    )}
  </div>
);
}
