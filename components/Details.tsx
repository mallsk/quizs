"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Redirect } from "./Redirect";

type ApiResponse = {
  user: {
    name: string;
    email: string;
    image:string;
  };
};

export default function Details() {
const [user, setUser] = useState<ApiResponse["user"] | null>(null);
const [push,setPush] = useState(false);
const [learning,setLearning] = useState(false);

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
  }, []);
  if(push){
    return <Redirect to={"/dashboard/quiz"} />
  }
  if(learning){
    return <Redirect to={"/dashboard/learning"}/>
  }
  return (
  <div>
    {user && (
      <>
        <p>Hi {user.name}</p>
        {user.image && <img src={user.image} alt="Profile" />}
      </>
    )}
    <Button onClick={()=>{
      setPush(true);
    }}>Quiz</Button>
    <Button onClick={()=>{
      setLearning(true);
    }}>Learn</Button>
  </div>
);
}