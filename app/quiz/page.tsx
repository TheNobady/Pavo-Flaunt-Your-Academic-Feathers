"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, ArrowLeft, Clock, Target } from "lucide-react"
import { useRouter } from "next/navigation"
import { getQuizForClassAndStream, type QuizSet } from "@/lib/quiz-data"

interface QuizResults {
  quizType: string
  answers: { [key: number]: number }
  result: string
  recommendations?: string[]
}

export default function QuizPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes
  const [quizStarted, setQuizStarted] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizData, setQuizData] = useState<QuizSet | null>(null)
  const [userInfo, setUserInfo] = useState<any>(null)

  useEffect(() => {
    // Get user data to determine which quiz to show
    const userData = localStorage.getItem("pavoUserData")
    if (userData) {
      const parsed = JSON.parse(userData)
      setUserInfo(parsed)
      const quiz = getQuizForClassAndStream(parsed.class, parsed.stream)
      setQuizData(quiz)
    }
  }, [])

  useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleSubmitQuiz()
    }
  }, [timeLeft, quizStarted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNext = () => {
    if (selectedAnswer !== null && quizData) {
      setAnswers({ ...answers, [quizData.questions[currentQuestion].id]: selectedAnswer })
    }

    if (quizData && currentQuestion < quizData.questions.length - 1) {
      const nextQuestionIndex = currentQuestion + 1
      setCurrentQuestion(nextQuestionIndex)
      setSelectedAnswer(answers[quizData.questions[nextQuestionIndex]?.id] ?? null)
    } else {
      handleSubmitQuiz()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const prevQuestionIndex = currentQuestion - 1
      setCurrentQuestion(prevQuestionIndex)
      setSelectedAnswer(answers[quizData?.questions[prevQuestionIndex]?.id] ?? null)
    }
  }

  const calculateResults = (): QuizResults => {
    if (!quizData || !userInfo) {
      return { quizType: "unknown", answers, result: "No result" }
    }

    // Count answers for each option (a=0, b=1, c=2, d=3)
    const optionCounts = [0, 0, 0, 0]

    Object.values(answers).forEach((answer) => {
      if (answer >= 0 && answer <= 3) {
        optionCounts[answer]++
      }
    })

    // Find the most selected option
    const maxCount = Math.max(...optionCounts)
    const dominantOption = optionCounts.indexOf(maxCount)

    let result = ""
    let recommendations: string[] = []

    // Determine result based on quiz type and dominant answer
    if (userInfo.class === "class-8" || userInfo.class === "class-9" || userInfo.class === "class-10") {
      // Stream selection for 10th and below
      switch (dominantOption) {
        case 0:
          result = "Science Stream Recommended"
          recommendations = [
            "Consider taking Physics, Chemistry, Mathematics/Biology in 11th-12th",
            "Explore careers in Engineering, Medicine, Research, or Technology",
            "Focus on developing analytical and logical thinking skills",
          ]
          break
        case 1:
          result = "Commerce Stream Recommended"
          recommendations = [
            "Consider taking Accountancy, Business Studies, Economics in 11th-12th",
            "Explore careers in Finance, Business Management, or Entrepreneurship",
            "Develop skills in analysis, communication, and leadership",
          ]
          break
        case 2:
          result = "Arts/Humanities Stream Recommended"
          recommendations = [
            "Consider taking History, Political Science, Psychology, Literature in 11th-12th",
            "Explore careers in Civil Services, Journalism, Law, or Social Work",
            "Focus on developing communication and critical thinking skills",
          ]
          break
        default:
          result = "Mixed Interests - Explore Multiple Streams"
          recommendations = [
            "You show interest in multiple areas",
            "Consider taking aptitude tests for specific streams",
            "Speak with career counselors to explore options",
          ]
      }
    } else {
      // Career-specific results for 11th-12th students
      switch (userInfo.stream) {
        case "medical":
          const medicalCareers = [
            "Doctor (MBBS)",
            "Nurse (B.Sc. Nursing)",
            "Pharmacist (B.Pharm)",
            "Physiotherapist (BPT)",
          ]
          result = medicalCareers[dominantOption] || "Healthcare Professional"
          break
        case "non-medical":
          const engineeringCareers = [
            "Engineer (B.Tech)",
            "Scientist/Researcher",
            "Architect (B.Arch)",
            "IT Professional",
          ]
          result = engineeringCareers[dominantOption] || "STEM Professional"
          break
        case "commerce":
          const commerceCareers = [
            "Chartered Accountant (CA)",
            "Financial Analyst",
            "Business Manager",
            "Company Secretary/Lawyer",
          ]
          result = commerceCareers[dominantOption] || "Business Professional"
          break
        case "arts":
          const artsCareers = [
            "Civil Servant (IAS/IPS)",
            "Journalist/Media Professional",
            "Graphic/UX Designer",
            "Psychologist/Counselor",
          ]
          result = artsCareers[dominantOption] || "Arts Professional"
          break
        default:
          result = "Career Professional"
      }

      recommendations = [
        "This career path aligns with your interests and strengths",
        "Consider exploring related degree programs and colleges",
        "Connect with professionals in this field for guidance",
        "Look into internships and skill development opportunities",
      ]
    }

    return {
      quizType:
        userInfo.class === "class-10" || userInfo.class === "class-9" || userInfo.class === "class-8"
          ? "stream"
          : "career",
      answers,
      result,
      recommendations,
    }
  }

  const handleSubmitQuiz = () => {
    const results = calculateResults()
    localStorage.setItem("pavoQuizResults", JSON.stringify(results))
    router.push("/quiz/results")
  }

  const startQuiz = () => {
    setQuizStarted(true)
    setSelectedAnswer(null)
  }

  if (!quizData) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#FF9933] to-[#005A9C] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🦚</span>
          </div>
          <p className="text-lg text-gray-600">Loading your personalized quiz...</p>
        </div>
      </div>
    )
  }

  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-[#F7F7F7]">
        <header className="border-b backdrop-blur-sm sticky top-0 z-50 bg-white/90 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#005A9C] to-[#138808] rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-lg font-bold">🦚</span>
                </div>
                <h1 className="text-2xl font-bold text-[#333333] font-['Poppins']">Pavo</h1>
              </div>
              <Badge className="bg-[#FF9933]/10 text-[#FF9933] border-[#FF9933]/20 px-4 py-2 rounded-full font-medium">
                Career Discovery Quiz
              </Badge>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Card className="border-0 shadow-2xl bg-white rounded-2xl overflow-hidden">
            <CardHeader className="text-center bg-gradient-to-r from-[#FF9933]/10 via-[#005A9C]/10 to-[#138808]/10 pb-8">
              <div className="w-16 h-16 bg-[#FF9933]/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Target className="w-8 h-8 text-[#FF9933]" />
              </div>
              <CardTitle className="text-3xl text-[#333333] font-['Poppins'] mb-4">Discover Yourself</CardTitle>
              <CardDescription className="text-lg text-[#333333]/80 font-['Inter']">
                Embark on a journey of self-discovery and unlock your true potential. This personalized assessment
                reveals your unique strengths, passions, and natural talents to guide you toward the career path where
                you'll truly thrive and make your mark on the world.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-8">
              <div className="bg-gradient-to-r from-[#FF9933]/5 via-[#005A9C]/5 to-[#138808]/5 rounded-lg p-6 space-y-4 border border-[#005A9C]/10">
                <h3 className="font-semibold text-lg text-[#333333] font-['Poppins']">What to Expect:</h3>
                <ul className="space-y-2 text-[#333333]/80 font-['Inter']">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#FF9933] rounded-full" />
                    <span>{quizData.questions.length} carefully designed questions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#005A9C] rounded-full" />
                    <span>Personalized for your class and stream</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#138808] rounded-full" />
                    <span>30 minutes time limit</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#FF9933] rounded-full" />
                    <span>
                      {userInfo?.class === "class-8" || userInfo?.class === "class-9" || userInfo?.class === "class-10"
                        ? "Stream recommendations and AI guidance"
                        : "Career recommendations and degree guidance"}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="text-center p-4 border-2 border-[#005A9C]/20 rounded-xl bg-white shadow-lg">
                  <h4 className="font-semibold mb-2 text-[#333333] font-['Poppins']">Quiz Focus</h4>
                  <div className="space-y-1 text-sm text-[#333333]/70 font-['Inter']">
                    <div>{quizData.title}</div>
                    <div className="text-xs text-[#005A9C] font-medium">
                      {userInfo?.class} {userInfo?.stream && `- ${userInfo.stream}`}
                    </div>
                  </div>
                </div>

                <div className="text-center p-4 border-2 border-[#138808]/20 rounded-xl bg-white shadow-lg">
                  <h4 className="font-semibold mb-2 text-[#333333] font-['Poppins']">After Completion</h4>
                  <div className="space-y-1 text-sm text-[#333333]/70 font-['Inter']">
                    {userInfo?.class === "class-8" ||
                    userInfo?.class === "class-9" ||
                    userInfo?.class === "class-10" ? (
                      <>
                        <div>Stream recommendations</div>
                        <div>Subject selection guidance</div>
                        <div>Career pathway preview</div>
                        <div>Chat with AI mascot Pavo</div>
                      </>
                    ) : (
                      <>
                        <div>Career recommendations</div>
                        <div>Degree program matches</div>
                        <div>College suggestions</div>
                        <div>Updated dashboard goals</div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button
                  onClick={startQuiz}
                  size="lg"
                  className="px-8 py-4 bg-[#FF9933] hover:bg-[#FF9933]/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  Start Your Discovery <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <p className="text-sm text-[#333333]/70 mt-2 font-['Inter']">
                  Make sure you have 30 minutes of uninterrupted time
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <header className="border-b backdrop-blur-sm sticky top-0 z-50 bg-white/90 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#005A9C] to-[#138808] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-lg font-bold">🦚</span>
              </div>
              <h1 className="text-2xl font-bold text-[#333333] font-['Poppins']">Pavo</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="flex items-center space-x-1 bg-[#FF9933]/10 text-[#FF9933] border-[#FF9933]/20 px-3 py-1 rounded-full">
                <Clock className="w-3 h-3" />
                <span>{formatTime(timeLeft)}</span>
              </Badge>
              <Badge className="bg-[#005A9C]/10 text-[#005A9C] border-[#005A9C]/20 px-3 py-1 rounded-full">
                {currentQuestion + 1} of {quizData.questions.length}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#333333]/70 font-['Inter']">
              Question {currentQuestion + 1} of {quizData.questions.length}
            </span>
            <span className="text-sm text-[#333333]/70 font-['Inter']">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FF9933] via-[#005A9C] to-[#138808] transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </Progress>
        </div>

        <Card className="border-0 shadow-xl bg-white rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#FF9933]/5 via-[#005A9C]/5 to-[#138808]/5">
            <div className="flex items-center justify-between">
              <Badge className="capitalize bg-[#005A9C]/10 text-[#005A9C] border-[#005A9C]/20 px-3 py-1 rounded-full">
                {quizData.title}
              </Badge>
              <Badge className="bg-[#138808]/10 text-[#138808] border-[#138808]/20 px-3 py-1 rounded-full">
                Question {currentQuestion + 1}
              </Badge>
            </div>
            <CardTitle className="text-xl leading-relaxed text-[#333333] font-['Poppins']">
              {quizData.questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <RadioGroup
              value={selectedAnswer !== null ? selectedAnswer.toString() : ""}
              onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
            >
              <div className="space-y-3">
                {quizData.questions[currentQuestion].options.map((option, index) => (
                  <Label key={index} htmlFor={`option-${index}`} className="cursor-pointer">
                    <div
                      className={`flex items-center space-x-3 p-4 border-2 rounded-xl transition-all duration-200 font-['Inter'] ${
                        selectedAnswer === index
                          ? "border-[#FF9933] bg-[#FF9933]/5 shadow-md"
                          : "border-gray-200 hover:border-[#005A9C]/50 hover:bg-[#005A9C]/5"
                      }`}
                    >
                      <RadioGroupItem
                        value={index.toString()}
                        id={`option-${index}`}
                        className="border-[#005A9C] text-[#FF9933]"
                      />
                      <span className="flex-1 text-[#333333]">{option}</span>
                    </div>
                  </Label>
                ))}
              </div>
            </RadioGroup>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="border-2 border-[#005A9C] text-[#005A9C] hover:bg-[#005A9C] hover:text-white rounded-xl transition-all duration-200 disabled:opacity-50 bg-transparent"
              >
                <ArrowLeft className="mr-2 w-4 h-4" /> Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50"
              >
                {currentQuestion === quizData.questions.length - 1 ? "Submit Quiz" : "Next"}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
