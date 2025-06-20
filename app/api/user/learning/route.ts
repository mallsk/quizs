import authOptions from "@/lib/auth";
import learn from "@/lib/learn";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.googleId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const result = await learn(topic);

    if (!result) {
      return NextResponse.json(
        { error: "No result from chat" },
        { status: 500 }
      );
    }

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error("Learn API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
