import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
        {/* Main Slogan */}
        <div className="mb-12">
          <h1 className="font-bold mb-2 leading-tight">
            <span className="text-5xl md:text-7xl lg:text-8xl bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Learn Smarter,
            </span>
            <br />
            <span className="text-5xl md:text-7xl lg:text-8xl bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
              Quiz Better
            </span>
          </h1>
          <br />
          <p className="text-xl md:text-xl font-semibold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
            By the Students, For the Students, To the Students
          </p>
          <p className="text-base md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-semibold leading-relaxed">
            Personalized quizzes that adapt to your learning style. <br />{" "}
            Master any topic with AI-powered questions tailored just for you.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 text-lg"
          >
            Start Learning Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-orange-300 dark:border-orange-600 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 font-semibold px-8 py-4 rounded-full text-lg backdrop-blur-sm"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            See How It Works
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              10
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Active Learners
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2">
              50+
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Subject Areas
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              1K+
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Questions Generated
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
