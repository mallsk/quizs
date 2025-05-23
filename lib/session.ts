import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";
import { NextRequest, NextResponse } from "next/server";

export async function getSessionData(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const { name, email, image, googleId } = session.user;
  return { name, email, image, googleId };
}
