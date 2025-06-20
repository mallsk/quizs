import { Brain, Target, BookOpen, Zap, Users, Trophy } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Features() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Personalization",
      description:
        "Our intelligent system creates quizzes tailored to your learning pace, strengths, and areas for improvement.",
    },
    {
      icon: Target,
      title: "Topic-Wise Learning",
      description:
        "Focus on specific subjects or topics. Deep dive into areas you want to master with targeted quiz sessions.",
    },
    {
      icon: BookOpen,
      title: "Comprehensive Coverage",
      description:
        "From mathematics to literature, science to history - generate quizzes for any subject you can think of.",
    },
    {
      icon: Zap,
      title: "Instant Generation",
      description:
        "Get personalized quizzes in seconds. No waiting, no delays - just immediate, engaging learning content.",
    },
    {
      icon: Users,
      title: "Adaptive Difficulty",
      description:
        "Questions automatically adjust to your skill level, ensuring you're always challenged but never overwhelmed.",
    },
    {
      icon: Trophy,
      title: "Progress Tracking",
      description:
        "Monitor your learning journey with detailed analytics and celebrate your achievements along the way.",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Why Choose Quizs?
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience the future of personalized learning with features
            designed to make studying engaging, effective, and enjoyable.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20"
            >
              <CardHeader className="text-center justify-center items-center">
                <div className="inline-flex p-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300 border border-gray-200/50 dark:border-gray-700/50">
                  <feature.icon className="h-8 w-8 text-gray-700 dark:text-gray-300" />
                  <CardTitle className="pl-2 text-xl font-bold text-gray-800 dark:text-gray-100">
                    {feature.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300 text-center leading-relaxed pb-4">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 dark:from-orange-500/20 dark:to-pink-500/20 rounded-3xl p-8 backdrop-blur-sm border border-orange-200/50 dark:border-orange-700/50">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Ready to Transform Your Learning?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
              Join thousands of learners who have already discovered the power
              of personalized quizzes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 text-lg">
                Get Started Free
              </button>
              <button className="border-2 border-orange-300 dark:border-orange-600 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 font-semibold px-8 py-4 rounded-full text-lg backdrop-blur-sm transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
