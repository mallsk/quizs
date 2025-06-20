import { BookOpen } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LogoutButton from "./LogoutButton";

export default function DashboardHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/20 dark:bg-gray-900/20 border-b border-black/20 dark:border-gray-700/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl shadow-lg dark:shadow-gray-800 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
              <BookOpen className="h-6 w-6 text-black dark:text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Quizs
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
}
