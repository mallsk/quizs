import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { createQuizAttempt } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const { topic, questions, userAnswers, score } = body;

  if (
    !topic ||
    !questions ||
    typeof userAnswers !== "object" ||
    Object.keys(userAnswers).length === 0 ||
    typeof score !== "number"
  ) {
    return NextResponse.json({ error: "Missing or invalid data" }, { status: 400 });
  }

  try {
    const quizAttempt = await createQuizAttempt({
      userId: session.user.googleId!,
      topic,
      questions,
      userAnswers,
      score,
    });
    return NextResponse.json({ success: true, quizAttempt }, { status: 201 });
  } catch (error) {
    console.error("Error storing quiz attempt:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}