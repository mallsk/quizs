import authOptions from "@/lib/auth";
import { findUser, getQuiz } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.googleId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await findUser(session.user.googleId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const quizzes = await getQuiz(user.googleId);
    if (!quizzes || quizzes.length === 0) {
      return NextResponse.json(
        { error: "No quiz data found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ quizzes: quizzes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
