import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginButton from "@/components/LoginButton";
import type { Session } from "next-auth";
export default async function Home() {
 
  const session: Session | null = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div>
      <h1>Welcome to the Quiz App!</h1>
      <p>Please sign in to continue.</p>
      <LoginButton />
    </div>
  );
}
