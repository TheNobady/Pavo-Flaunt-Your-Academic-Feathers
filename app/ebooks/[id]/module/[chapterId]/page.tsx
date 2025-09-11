"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Trophy, Coins, XCircle, Clock, Award } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

const mockQuestions = [
  {
    id: 1,
    question: "What is the SI unit of force?",
    options: ["Newton", "Joule", "Watt", "Pascal"],
    correct: 0,
    explanation: "Newton (N) is the SI unit of force, named after Sir Isaac Newton.",
  },
  {
    id: 2,
    question: "Which law states that every action has an equal and opposite reaction?",
    options: ["First Law", "Second Law", "Third Law", "Law of Gravitation"],
    correct: 2,
    explanation: "Newton's Third Law states that for every action, there is an equal and opposite reaction.",
  },
  {
    id: 3,
    question: "What is the formula for kinetic energy?",
    options: ["mgh", "½mv²", "mv", "ma"],
    correct: 1,
    explanation: "Kinetic energy is given by KE = ½mv², where m is mass and v is velocity.",
  },
  {
    id: 4,
    question: "What happens to the acceleration when the net force on an object is zero?",
    options: ["Increases", "Decreases", "Becomes zero", "Remains constant"],
    correct: 2,
    explanation: "According to Newton's First Law, when net force is zero, acceleration is also zero.",
  },
  {
    id: 5,
    question: "Which quantity is conserved in an isolated system?",
    options: ["Force", "Acceleration", "Momentum", "Velocity"],
    correct: 2,
    explanation: "In an isolated system, momentum is conserved according to the law of conservation of momentum.",
  },
]

export default function ModulePage() {
  const params = useParams()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [moduleCompleted, setModuleCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes

  const chapterTitle = "Laws of Motion"
  const totalRewards = 12

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers]
      newAnswers[currentQuestion] = selectedAnswer
      setAnswers(newAnswers)
      setSelectedAnswer(null)

      if (currentQuestion < mockQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setShowResult(true)
        calculateResults(newAnswers)
      }
    }
  }

  const calculateResults = (finalAnswers: number[]) => {
    const correctAnswers = finalAnswers.filter((answer, index) => answer === mockQuestions[index].correct).length

    const percentage = (correctAnswers / mockQuestions.length) * 100
    if (percentage >= 70) {
      setModuleCompleted(true)
    }
  }

  const correctAnswers = answers.filter((answer, index) => answer === mockQuestions[index].correct).length
  const percentage = answers.length > 0 ? (correctAnswers / answers.length) * 100 : 0

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div
                className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  moduleCompleted ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {moduleCompleted ? (
                  <Trophy className="h-8 w-8 text-white" />
                ) : (
                  <XCircle className="h-8 w-8 text-white" />
                )}
              </div>
              <CardTitle className="text-2xl">{moduleCompleted ? "Module Completed!" : "Module Failed"}</CardTitle>
              <CardDescription>Chapter: {chapterTitle}</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-2xl font-bold text-green-600">{correctAnswers}</p>
                  <p className="text-sm text-gray-600">Correct</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">{mockQuestions.length - correctAnswers}</p>
                  <p className="text-sm text-gray-600">Wrong</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{percentage.toFixed(0)}%</p>
                  <p className="text-sm text-gray-600">Score</p>
                </div>
              </div>

              {moduleCompleted && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Coins className="h-5 w-5 text-yellow-500" />
                    <span className="font-semibold text-green-700">+{totalRewards} Rewards Earned!</span>
                  </div>
                  <p className="text-sm text-green-600">
                    Great job! You can now use these rewards for mentor sessions or buying more books.
                  </p>
                </div>
              )}

              {!moduleCompleted && (
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-red-700 font-semibold mb-2">You need 70% or higher to pass</p>
                  <p className="text-sm text-red-600">Review the chapter and try again to earn your rewards.</p>
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" asChild className="flex-1 bg-transparent">
                  <Link href={`/ebooks/${params.id}`}>Back to Book</Link>
                </Button>
                {!moduleCompleted && (
                  <Button className="flex-1" onClick={() => window.location.reload()}>
                    Try Again
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Review Answers */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Review Answers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockQuestions.map((question, index) => (
                <div key={question.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-start gap-3 mb-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                        answers[index] === question.correct ? "bg-green-500 text-white" : "bg-red-500 text-white"
                      }`}
                    >
                      {answers[index] === question.correct ? "✓" : "✗"}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold mb-2">{question.question}</p>
                      <p className="text-sm text-gray-600 mb-1">
                        Your answer:{" "}
                        <span className={answers[index] === question.correct ? "text-green-600" : "text-red-600"}>
                          {question.options[answers[index]]}
                        </span>
                      </p>
                      {answers[index] !== question.correct && (
                        <p className="text-sm text-green-600 mb-1">
                          Correct answer: {question.options[question.correct]}
                        </p>
                      )}
                      <p className="text-sm text-gray-500">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href={`/ebooks/${params.id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Book
            </Link>
          </Button>

          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Chapter Module</h1>
              <p className="text-gray-600">{chapterTitle}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-lg">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">{formatTime(timeLeft)}</span>
              </div>
              <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-lg">
                <Trophy className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-semibold text-yellow-800">{totalRewards} rewards</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>
                Question {currentQuestion + 1} of {mockQuestions.length}
              </span>
              <span>{Math.round(((currentQuestion + 1) / mockQuestions.length) * 100)}% Complete</span>
            </div>
            <Progress value={((currentQuestion + 1) / mockQuestions.length) * 100} className="h-2" />
          </div>
        </div>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{mockQuestions[currentQuestion].question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswer?.toString()}
              onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
            >
              <div className="space-y-3">
                {mockQuestions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                disabled={currentQuestion === 0}
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
              >
                Previous
              </Button>
              <Button onClick={handleNextQuestion} disabled={selectedAnswer === null}>
                {currentQuestion === mockQuestions.length - 1 ? "Finish Module" : "Next Question"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <Award className="h-4 w-4 text-blue-500 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800 mb-1">Module Instructions:</p>
                <ul className="space-y-1 text-sm">
                  <li>• Answer all questions to complete the module</li>
                  <li>• You need 70% or higher to pass and earn rewards</li>
                  <li>• You can retake the module if you don't pass</li>
                  <li>• Rewards can be used for mentor sessions and book purchases</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
