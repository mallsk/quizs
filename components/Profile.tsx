"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { BookOpen, Brain } from "lucide-react"
import { useRouter } from "next/navigation"

type ApiResponse = {
  user: {
    name: string
    email: string
    image: string
  }
}

export default function Profile() {
  const [user, setUser] = useState<ApiResponse["user"] | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>("/api/user", {
          withCredentials: true,
        })
        setUser(response.data.user)
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      {/* Mobile Layout */}
      <div className="lg:hidden w-full px-4 pt-20 pb-4">
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 rounded-2xl p-4 shadow-lg">
          {/* Profile Info - Side by Side on Mobile */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center shadow-lg flex-shrink-0">
              <img
                src={user?.image || "/placeholder.svg?height=64&width=64"}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover border-2 border-white"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 truncate">
                {user?.name || "Loading..."}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">Learning Enthusiast</p>
            </div>
          </div>

          {/* Buttons - Side by Side on Mobile */}
          <div className="flex gap-3">
            <Button
              onClick={() => router.push("/dashboard/quiz")}
              className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-2.5 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-2 text-sm"
            >
              <Brain className="h-4 w-4" />
              Quiz
            </Button>
            <Button
              onClick={() => router.push("/dashboard/learning")}
              variant="outline"
              className="flex-1 border-2 border-orange-300 dark:border-orange-600 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 font-semibold py-2.5 rounded-xl backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2 text-sm"
            >
              <BookOpen className="h-4 w-4" />
              Learn
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Sidebar */}
      <div className="hidden lg:pl-18 lg:pt-26 lg:block pt-16 lg:w-82 flex-shrink-0">
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 rounded-2xl p-6 sticky top-32">
          {/* Profile Info - Stacked on Desktop */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center shadow-lg">
              <img
                src={user?.image || "/placeholder.svg?height=80&width=80"}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border-2 border-white"
              />
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">{user?.name || "Loading..."}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">Learning Enthusiast</p>
          </div>

          {/* Buttons - Stacked on Desktop */}
          <div className="space-y-3">
            <Button
              onClick={() => router.push("/dashboard/quiz")}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Brain className="h-5 w-5" />
              Quiz
            </Button>
            <Button
              onClick={() => router.push("/dashboard/learning")}
              variant="outline"
              className="w-full border-2 border-orange-300 dark:border-orange-600 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 font-semibold py-3 rounded-xl backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2"
            >
              <BookOpen className="h-5 w-5" />
              Learn
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
