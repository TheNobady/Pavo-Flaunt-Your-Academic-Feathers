"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowRight,
  Award,
  BookOpen,
  MapPin,
  Sparkles,
  Target,
  TrendingUp,
  User,
  CheckCircle,
  Library,
  Settings,
  LogOut,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface UserData {
  role: string
  name: string
  age: string
  class: string
  location: string
  interests: string[]
  goals: string[]
  languages: string[]
  onboardingComplete: boolean
}

const PeacockIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2C8 2 5 5 5 9c0 2 1 4 3 5l-3 8h10l-3-8c2-1 3-3 3-5 0-4-3-7-7-7z" />
    <circle cx="12" cy="8" r="2" />
    <path d="M8 12c-1 0-2 1-2 2s1 2 2 2 2-1 2-2-1-2-2-2z" />
    <path d="M16 12c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2z" />
  </svg>
)

export default function DashboardPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [hasQuizResults, setHasQuizResults] = useState(false)
  const [quizResults, setQuizResults] = useState<any>(null)
  const [personalizedRecommendations, setPersonalizedRecommendations] = useState<any[]>([])
  const [upcomingDeadlines, setUpcomingDeadlines] = useState<any[]>([])

  useEffect(() => {
    const storedData = sessionStorage.getItem("pavoUserData") || localStorage.getItem("pavoUserData")
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        if (parsedData.onboardingComplete && parsedData.name && parsedData.role) {
          setUserData(parsedData)
          console.log("[v0] User data loaded successfully")
          if (!localStorage.getItem("pavoUserData")) {
            localStorage.setItem("pavoUserData", storedData)
          }
          if (!sessionStorage.getItem("pavoUserData")) {
            sessionStorage.setItem("pavoUserData", storedData)
          }
        } else {
          console.log("[v0] Incomplete onboarding data, redirecting")
          setTimeout(() => {
            router.push("/onboarding")
          }, 500)
        }
      } catch (error) {
        console.log("[v0] Error parsing user data:", error)
        setTimeout(() => {
          router.push("/onboarding")
        }, 500)
      }
    } else {
      console.log("[v0] No user data found, redirecting to onboarding")
      setTimeout(() => {
        router.push("/onboarding")
      }, 500)
    }

    const storedQuizResults = localStorage.getItem("pavoQuizResults")
    if (storedQuizResults) {
      try {
        const parsedResults = JSON.parse(storedQuizResults)
        const isValidQuiz =
          parsedResults &&
          parsedResults.result &&
          (parsedResults.result.career || parsedResults.result.stream) && // Check for either career or stream
          parsedResults.answers &&
          Object.keys(parsedResults.answers).length >= 5 && // Must have answered at least 5 questions
          parsedResults.quizType &&
          parsedResults.completed === true // Must be explicitly marked as completed

        console.log("[v0] Quiz validation:", {
          hasResult: !!parsedResults?.result,
          hasCareerOrStream: !!(parsedResults?.result?.career || parsedResults?.result?.stream),
          answerCount: Object.keys(parsedResults?.answers || {}).length,
          hasQuizType: !!parsedResults?.quizType,
          isCompleted: parsedResults?.completed,
        })

        setHasQuizResults(isValidQuiz)
        if (isValidQuiz) {
          setQuizResults(parsedResults)
        }
      } catch (error) {
        console.log("[v0] Quiz results parsing error:", error)
        setHasQuizResults(false)
      }
    } else {
      setHasQuizResults(false)
    }

    if (userData) {
      const recommendations = generatePersonalizedRecommendations(
        userData,
        hasQuizResults ? JSON.parse(localStorage.getItem("pavoQuizResults") || "{}") : null,
      )
      setPersonalizedRecommendations(recommendations)

      const deadlines = generateUpcomingDeadlines(userData)
      setUpcomingDeadlines(deadlines)
    }
  }, [router])

  const generatePersonalizedRecommendations = (user: UserData, quizResults: any) => {
    const recommendations = []

    if (quizResults && quizResults.result) {
      if (quizResults.logical >= 7 && quizResults.numerical >= 6) {
        recommendations.push({
          title: "Software Engineering Path",
          description: "Your logical and numerical skills are perfect for coding",
          type: "career",
          link: "/career-paths/software-engineer",
          priority: "high",
        })
      }
      if (quizResults.analytical >= 7) {
        recommendations.push({
          title: "Medical Entrance Preparation",
          description: "Strong analytical skills indicate medical aptitude",
          type: "preparation",
          link: "/ebooks?category=medical",
          priority: "high",
        })
      }
      if (quizResults.creative >= 6 && quizResults.spatial >= 6) {
        recommendations.push({
          title: "Design & Architecture Programs",
          description: "Your creative and spatial abilities are exceptional",
          type: "career",
          link: "/career-paths/graphic-designer",
          priority: "medium",
        })
      }
    }

    const userInterests = user.interests.join(" ").toLowerCase()

    if (userInterests.includes("technology") || userInterests.includes("science")) {
      recommendations.push({
        title: "Engineering Entrance Prep Books",
        description: "Access JEE and other engineering exam materials",
        type: "study",
        link: "/ebooks?level=intermediate&stream=science",
        priority: "high",
      })
    }

    if (userInterests.includes("science") || userInterests.includes("medical")) {
      recommendations.push({
        title: "NEET Preparation Guide",
        description: "Complete medical entrance preparation resources",
        type: "study",
        link: "/ebooks?category=medical",
        priority: "high",
      })
    }

    if (userInterests.includes("business") || userInterests.includes("commerce")) {
      recommendations.push({
        title: "Commerce Stream Opportunities",
        description: "Explore CA, MBA, and business career paths",
        type: "career",
        link: "/career-paths/chartered-accountant",
        priority: "medium",
      })
    }

    if (user.class === "class-10" || user.class === "10th") {
      recommendations.push({
        title: "Stream Selection Guide",
        description: "Choose the right stream for your 11th class based on your interests",
        type: "guidance",
        link: "/quiz",
        priority: "high",
      })
    }

    if (user.class === "class-12" || user.class === "12th" || user.class === "12th Pass") {
      recommendations.push({
        title: "College Application Deadlines",
        description: "Important admission dates for your location",
        type: "deadline",
        link: "/colleges?location=" + encodeURIComponent(user.location),
        priority: "urgent",
      })
    }

    const userGoals = user.goals.join(" ").toLowerCase()
    if (userGoals.includes("scholarship")) {
      recommendations.push({
        title: "Scholarship Opportunities",
        description: "Find financial aid and merit scholarships for your academic goals",
        type: "scholarship",
        link: "/scholarships",
        priority: "high",
      })
    }

    recommendations.push({
      title: `Government Colleges in ${user.location}`,
      description: "Explore nearby institutions with good placement records",
      type: "college",
      link: "/colleges?location=" + encodeURIComponent(user.location),
      priority: "medium",
    })

    return recommendations.slice(0, 4)
  }

  const generateUpcomingDeadlines = (user: UserData) => {
    const deadlines = []
    const currentDate = new Date()

    if (user.class === "12th" || user.class === "12th Pass") {
      deadlines.push({
        title: "JEE Main Registration",
        description: "Last date for engineering entrance exam",
        daysLeft: 25,
        type: "exam",
        urgent: false,
      })
      deadlines.push({
        title: "NEET Application",
        description: "Medical entrance exam registration",
        daysLeft: 18,
        type: "exam",
        urgent: true,
      })
    }

    if (user.class === "10th" || user.class === "10th Pass") {
      deadlines.push({
        title: "Stream Selection Deadline",
        description: "Choose your 11th class subjects",
        daysLeft: 12,
        type: "academic",
        urgent: true,
      })
    }

    deadlines.push({
      title: "Merit Scholarship Application",
      description: "Government scholarship for academic excellence",
      daysLeft: 15,
      type: "scholarship",
      urgent: false,
    })

    deadlines.push({
      title: "Minority Scholarship Scheme",
      description: "Financial aid for eligible students",
      daysLeft: 32,
      type: "scholarship",
      urgent: false,
    })

    return deadlines.slice(0, 3)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("pavoUserData")
    localStorage.removeItem("pavoQuizResults")
    sessionStorage.removeItem("pavoUserData")
    sessionStorage.removeItem("pavoQuizResults")
    router.push("/")
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <PeacockIcon className="w-10 h-10 text-white" />
          </div>
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-5 h-5 text-white animate-spin" />
          </div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <PeacockIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                  Pavo
                </h1>
                <p className="text-xs text-gray-600 font-medium">Flaunt Your Academic Feathers</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-orange-100 text-orange-800 border-orange-200 hidden sm:flex">
                {userData.role === "student" ? "Student" : "Parent"}
              </Badge>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-700 hover:bg-orange-50" asChild>
                  <Link href="/profile">
                    <User className="w-4 h-4 mr-2" />
                    {userData.name}
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-700 hover:bg-orange-50" asChild>
                  <Link href="/profile">
                    <Settings className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-700 hover:bg-red-50" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 via-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-xl animate-pulse">
              <span className="text-2xl animate-bounce">🦚</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-blue-600 to-green-600 bg-clip-text text-transparent">
              Welcome back, {userData.name}!
            </h1>
          </div>
          <p className="text-gray-600 text-lg font-medium">
            {userData.role === "student"
              ? "Continue your academic journey with personalized guidance"
              : "Track your child's academic progress and opportunities"}
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm"
            asChild
          >
            <Link href="/profile">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Profile Complete</p>
                    <p className="text-2xl font-bold text-gray-800">85%</p>
                  </div>
                  <User className="w-8 h-8 text-orange-500" />
                </div>
                <Progress value={85} className="mt-2 bg-orange-100" />
              </CardContent>
            </Link>
          </Card>

          <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Goal</p>
                  <p className="text-lg font-bold flex items-center text-gray-800">
                    {hasQuizResults && quizResults ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-600 mr-1" />
                        {userData.class === "class-10" || userData.class === "class-9" || userData.class === "class-8"
                          ? quizResults.result.stream
                          : quizResults.result.career}
                      </>
                    ) : (
                      "Take Assessment"
                    )}
                  </p>
                </div>
                <Target className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Discover Yourself</p>
                  <p className="text-lg font-bold text-gray-800">{hasQuizResults ? "Completed ✅" : "Pending"}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Location</p>
                  <p className="text-sm font-semibold text-gray-800">{userData.location}</p>
                </div>
                <MapPin className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card
            className={`border-0 hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/90 backdrop-blur-sm ${
              !hasQuizResults ? "ring-2 ring-orange-200 bg-gradient-to-br from-orange-50 to-orange-100" : ""
            }`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <Target className="w-12 h-12 text-orange-500 mb-4" />
                {hasQuizResults && <CheckCircle className="w-6 h-6 text-green-600" />}
              </div>
              <CardTitle className="text-gray-800 font-bold">
                {hasQuizResults ? "View Assessment Results" : "Career Assessment"}
              </CardTitle>
              <CardDescription className="text-gray-600 font-medium">
                {hasQuizResults
                  ? "Review your career discovery results and personalized recommendations"
                  : "Discover your ideal stream or career path with our comprehensive assessment"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href={hasQuizResults ? "/quiz/results" : "/quiz"}>
                  {hasQuizResults ? "View Results" : "Start Assessment"} <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
              <CardTitle className="text-gray-800 font-bold">Career Pathways</CardTitle>
              <CardDescription className="text-gray-600 font-medium">
                {hasQuizResults && quizResults
                  ? `Explore ${
                      userData.class === "class-10" || userData.class === "class-9" || userData.class === "class-8"
                        ? quizResults.result.stream
                        : quizResults.result.career
                    } and other paths`
                  : "Explore career paths based on your interests"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 font-semibold bg-transparent"
                asChild
              >
                <Link href="/career-paths">
                  Explore Paths <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <MapPin className="w-12 h-12 text-green-600 mb-4" />
              <CardTitle className="text-gray-800 font-bold">Find Colleges</CardTitle>
              <CardDescription className="text-gray-600 font-medium">
                {hasQuizResults &&
                quizResults &&
                !userData.class.includes("10") &&
                !userData.class.includes("9") &&
                !userData.class.includes("8")
                  ? `Colleges in ${userData.location} offering degrees for ${quizResults.result.career}`
                  : `Discover government colleges near ${userData.location}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full border-green-300 text-green-700 hover:bg-green-50 font-semibold bg-transparent"
                asChild
              >
                <Link href="/colleges">
                  Browse Colleges <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <Award className="w-12 h-12 text-orange-500 mb-4" />
              <CardTitle className="text-gray-800 font-bold">Scholarships</CardTitle>
              <CardDescription className="text-gray-600 font-medium">
                Find financial aid opportunities for your goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full border-orange-300 text-orange-700 hover:bg-orange-50 font-semibold bg-transparent"
                asChild
              >
                <Link href="/scholarships">
                  View Scholarships <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg flex items-center justify-center mb-4">
                <Library className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-gray-800 font-bold">E-Books Library</CardTitle>
              <CardDescription className="text-gray-600 font-medium">
                Access textbooks with interactive modules and earn rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <Badge className="bg-orange-100 text-orange-800 border-orange-200 text-xs">10 Free Books</Badge>
                <Badge variant="outline" className="text-xs border-gray-300">
                  4 Levels
                </Badge>
              </div>
              <Button
                variant="outline"
                className="w-full border-orange-300 text-orange-700 hover:bg-orange-50 font-semibold bg-transparent"
                asChild
              >
                <Link href="/ebooks">
                  Browse Books <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-gray-800 font-bold">AI Career Counselor</CardTitle>
              <CardDescription className="text-gray-600 font-medium">
                Get instant answers to your career questions in multiple languages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 font-semibold bg-transparent"
                asChild
              >
                <Link href="/chatbot">
                  Chat Now <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-green-200 rounded-lg flex items-center justify-center mb-4">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-gray-800 font-bold">Student Community</CardTitle>
              <CardDescription className="text-gray-600 font-medium">
                Connect with students from your stream and get peer support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full border-green-300 text-green-700 hover:bg-green-50 font-semibold bg-transparent"
                asChild
              >
                <Link href="/community">
                  Join Community <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mb-4">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-gray-800 font-bold">Find Mentors</CardTitle>
              <CardDescription className="text-gray-600 font-medium">
                Connect with alumni and professionals for personalized guidance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 font-semibold bg-transparent"
                asChild
              >
                <Link href="/mentorship">
                  Browse Mentors <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-green-200 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-gray-800 font-bold">Success Stories</CardTitle>
              <CardDescription className="text-gray-600 font-medium">
                Get inspired by achievers from government colleges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full border-green-300 text-green-700 hover:bg-green-50 font-semibold bg-transparent"
                asChild
              >
                <Link href="/success-stories">
                  Read Stories <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-gray-800 font-bold">Admission Predictor</CardTitle>
              <CardDescription className="text-gray-600 font-medium">
                Predict your chances of admission based on previous year cutoffs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full border-orange-300 text-orange-700 hover:bg-orange-50 font-semibold bg-transparent"
                asChild
              >
                <Link href="/admission-predictor">
                  Check Chances <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {userData.role === "parent" && (
            <Card className="border-0 hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mb-4">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-gray-800 font-bold">Parent Dashboard</CardTitle>
                <CardDescription className="text-gray-600 font-medium">
                  Simplified view of your child's academic progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 font-semibold bg-transparent"
                  asChild
                >
                  <Link href="/parent-dashboard">
                    View Dashboard <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800 font-bold">
                <BookOpen className="w-5 h-5 mr-2 text-orange-500" />
                Recommended for You
              </CardTitle>
              <CardDescription className="text-gray-600 font-medium">
                {hasQuizResults
                  ? "Based on your quiz results and interests"
                  : `Based on your interests: ${userData.interests.slice(0, 2).join(", ")}`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {personalizedRecommendations.length > 0 ? (
                personalizedRecommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg border border-orange-200 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-800">{rec.title}</p>
                        <Badge className={getPriorityColor(rec.priority)} variant="outline">
                          {rec.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 font-medium">{rec.description}</p>
                    </div>
                    <Button size="sm" variant="ghost" className="text-orange-600 hover:bg-orange-100" asChild>
                      <Link href={rec.link}>
                        View <ArrowRight className="ml-1 w-3 h-3" />
                      </Link>
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-600 font-medium">Complete your quiz to get personalized recommendations</p>
                  <Button
                    size="sm"
                    className="mt-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold"
                    asChild
                  >
                    <Link href="/quiz">Take Quiz</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800 font-bold">
                <Award className="w-5 h-5 mr-2 text-blue-600" />
                Upcoming Deadlines
              </CardTitle>
              <CardDescription className="text-gray-600 font-medium">Don't miss these important dates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300 bg-gradient-to-r from-blue-50 to-green-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-800">{deadline.title}</p>
                      {deadline.urgent && (
                        <Badge className="bg-red-100 text-red-800 border-red-200 text-xs">Urgent</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 font-medium">{deadline.description}</p>
                    <p className="text-xs text-orange-600 font-bold mt-1">{deadline.daysLeft} days left</p>
                  </div>
                  <Button
                    size="sm"
                    className={
                      deadline.urgent
                        ? "bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold"
                        : "border-blue-300 text-blue-700 hover:bg-blue-50 font-semibold"
                    }
                    variant={deadline.urgent ? "default" : "outline"}
                  >
                    {deadline.type === "scholarship" ? "Apply" : deadline.type === "exam" ? "Register" : "View"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
