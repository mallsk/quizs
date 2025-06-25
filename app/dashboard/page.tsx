import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Redirect } from "@/components/Redirect";
import Details from "@/components/Details";
import Quizs from "@/components/Quizs";
import Footer from "@/components/Footer";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <Redirect to="/" />;
  }
  return (
    <main className="p-4 lg:pt-8 lg:pl-8 min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="lg:flex lg:justify-start lg:gap-26">
        <Details />
        <Quizs />
      </div>
    </main>
  );
}
