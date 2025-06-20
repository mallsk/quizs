"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function LogoutButton() {
  return (
    <Button
      className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-6 py-2 rounded-md shadow-lg transition-all duration-300 hover:shadow-xl"
      onClick={() => {
        signOut();
      }}
    >
      Logout
    </Button>
  );
}
