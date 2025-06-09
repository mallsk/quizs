import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";
import { Redirect } from "@/components/Redirect";
import Details from "@/components/Details";
import Quizs from "@/components/Quizs";
import Learning from "@/components/Learning";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <Redirect to="/" />;
  }
  return (
    <main className="p-6">
      <div className="mt-4">
        <Details />
        <Quizs />

        <LogoutButton />

      </div>
    </main>
  );
}
