"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Github, Linkedin, Mail, Heart, MessageSquare, Send, ExternalLink, Code, Coffee, X, Twitter, TwitterIcon, LucideTwitter } from "lucide-react"

export default function Footer() {
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    email: "",
    feedback: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!feedbackForm.name || !feedbackForm.email || !feedbackForm.feedback) {
      return
    }

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Feedback submitted:", feedbackForm)

      // Reset form and close modal
      setFeedbackForm({ name: "", email: "", feedback: "" })
      setFeedbackOpen(false)

      // You could show a success toast here
      alert("Thank you for your feedback! We appreciate your input.")
    } catch (error) {
      console.error("Failed to submit feedback:", error)
      alert("Failed to submit feedback. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFeedbackForm((prev) => ({ ...prev, [field]: value }))
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-md border-t border-white/20 dark:border-gray-700/20 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {/* About Developer */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <Code className="h-5 w-5 text-orange-500" />
              About Developer
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Built with passion by a dedicated developer who loves creating innovative learning experiences.
            </p>
            <div className="flex flex-col space-y-2">
              <a
                href="https://github.com/mallsk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 text-sm"
              >
                <Github className="h-4 w-4" />
                GitHub Profile
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://x.com/malls_k"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 text-sm"
              >
                <X className="h-4 w-4" />
                X Profile
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="mailto:skollermallikarjun@gmail.com"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 text-sm"
              >
                <Mail className="h-4 w-4" />
                Contact Email
              </a>
            </div>
          </div>

          {/* Quick Links
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <a
                href="/home"
                className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 text-sm"
              >
                Dashboard
              </a>
              <a
                href="/quiz"
                className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 text-sm"
              >
                Generate Quiz
              </a>
              <a
                href="/learning"
                className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 text-sm"
              >
                Learning Materials
              </a>
              <a
                href="/profile"
                className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 text-sm"
              >
                Profile
              </a>
            </div>
          </div> */}

          {/* Support
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Support</h3>
            <div className="flex flex-col space-y-2">
              <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
                <DialogTrigger asChild>
                  <button className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 text-sm text-left">
                    <MessageSquare className="h-4 w-4" />
                    Send Feedback
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-white/20 dark:border-gray-700/20">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl font-bold text-gray-800 dark:text-gray-100">
                      <MessageSquare className="h-5 w-5 text-orange-500" />
                      Send Feedback
                    </DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-gray-300">
                      We'd love to hear your thoughts! Your feedback helps us improve the platform.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleFeedbackSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        value={feedbackForm.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        className="bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-600 focus:border-orange-400 dark:focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={feedbackForm.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-600 focus:border-orange-400 dark:focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="feedback" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Feedback *
                      </Label>
                      <Textarea
                        id="feedback"
                        placeholder="Share your thoughts, suggestions, or report any issues..."
                        value={feedbackForm.feedback}
                        onChange={(e) => handleInputChange("feedback", e.target.value)}
                        required
                        rows={4}
                        className="bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-600 focus:border-orange-400 dark:focus:border-orange-500 resize-none"
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setFeedbackOpen(false)}
                        className="flex-1 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting || !feedbackForm.name || !feedbackForm.email || !feedbackForm.feedback}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Feedback
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
              <a
                href="mailto:support@quizs.com"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 text-sm"
              >
                <Mail className="h-4 w-4" />
                Support Email
              </a>
              <a
                href="/help"
                className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 text-sm"
              >
                Help Center
              </a>
            </div>
          </div> */}

          {/* Technology
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Built With</h3>
            <div className="flex flex-col space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <span>Next.js 15</span>
              <span>React 18</span>
              <span>TypeScript</span>
              <span>Tailwind CSS</span>
              <span>PostgreSQL/Prisma</span>
              <span>Shadcn/ui</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Coffee className="h-4 w-4 text-orange-500" />
              Made with lots of coffee
            </div>
          </div> */}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 dark:border-gray-700/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <span>© {currentYear} Quizs Platform. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for learners everywhere</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4 text-xs text-gray-500 dark:text-gray-400">
            <a href="/privacy" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              Privacy Policy
            </a>
            <span className="hidden md:inline">•</span>
            <a href="/terms" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              Terms of Service
            </a>
            <span className="hidden md:inline">•</span>
            <a href="/cookies" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
