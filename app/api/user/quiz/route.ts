import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import chat from "@/lib/chat";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { topic } = await req.json();

  if (!topic) {
    return NextResponse.json({ error: "Topic is required" }, { status: 400 });
  }
  try {
    let result = await chat(topic);

    if (!result) {
      return NextResponse.json({ error: "No result from chat" }, { status: 500 });
    }

    result = result.replace(/```json/, '').replace(/```/, '').trim();
    const questions = JSON.parse(result);

    return NextResponse.json({ questions }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
