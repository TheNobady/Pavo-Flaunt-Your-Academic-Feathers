"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Star,
  Trophy,
  Coins,
  Download,
  ArrowLeft,
  Play,
  CheckCircle,
  Lock,
  FileText,
  Award,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

const mockBook = {
  id: 1,
  title: "NCERT Physics Class 11",
  subject: "Physics",
  class: "11th",
  stream: "science-pcm",
  difficulty: "beginner",
  chapters: 15,
  completedChapters: 3,
  isFree: true,
  rewards: 50,
  rating: 4.8,
  downloads: 12500,
  cover: "/physics-textbook.png",
  description:
    "Comprehensive physics textbook covering fundamental concepts for Class 11 students. Includes detailed explanations, examples, and practice problems.",
  author: "NCERT",
  pages: 320,
  language: "English",
  chapters_data: [
    { id: 1, title: "Physical World", pages: 15, completed: true, moduleCompleted: true, rewards: 5 },
    { id: 2, title: "Units and Measurements", pages: 22, completed: true, moduleCompleted: true, rewards: 8 },
    { id: 3, title: "Motion in a Straight Line", pages: 28, completed: true, moduleCompleted: false, rewards: 10 },
    { id: 4, title: "Motion in a Plane", pages: 25, completed: false, moduleCompleted: false, rewards: 10 },
    { id: 5, title: "Laws of Motion", pages: 30, completed: false, moduleCompleted: false, rewards: 12 },
    { id: 6, title: "Work, Energy and Power", pages: 26, completed: false, moduleCompleted: false, rewards: 10 },
    {
      id: 7,
      title: "System of Particles and Rotational Motion",
      pages: 35,
      completed: false,
      moduleCompleted: false,
      rewards: 15,
    },
    { id: 8, title: "Gravitation", pages: 24, completed: false, moduleCompleted: false, rewards: 10 },
    {
      id: 9,
      title: "Mechanical Properties of Solids",
      pages: 20,
      completed: false,
      moduleCompleted: false,
      rewards: 8,
    },
    {
      id: 10,
      title: "Mechanical Properties of Fluids",
      pages: 22,
      completed: false,
      moduleCompleted: false,
      rewards: 9,
    },
    { id: 11, title: "Thermal Properties of Matter", pages: 18, completed: false, moduleCompleted: false, rewards: 7 },
    { id: 12, title: "Thermodynamics", pages: 25, completed: false, moduleCompleted: false, rewards: 10 },
    { id: 13, title: "Kinetic Theory", pages: 20, completed: false, moduleCompleted: false, rewards: 8 },
    { id: 14, title: "Oscillations", pages: 22, completed: false, moduleCompleted: false, rewards: 9 },
    { id: 15, title: "Waves", pages: 28, completed: false, moduleCompleted: false, rewards: 12 },
  ],
}

export default function EbookDetailPage() {
  const params = useParams()
  const [userRewards] = useState(250)
  const [activeTab, setActiveTab] = useState("overview")

  const totalRewards = mockBook.chapters_data.reduce((acc, chapter) => acc + chapter.rewards, 0)
  const earnedRewards = mockBook.chapters_data
    .filter((chapter) => chapter.moduleCompleted)
    .reduce((acc, chapter) => acc + chapter.rewards, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/ebooks">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Library
            </Link>
          </Button>
        </div>

        {/* Book Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <img
                  src={mockBook.cover || "/placeholder.svg"}
                  alt={mockBook.title}
                  className="w-full h-80 object-cover rounded-lg mb-4"
                />
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-semibold">{mockBook.rating}</span>
                    <span className="text-gray-500">•</span>
                    <Download className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{mockBook.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-green-500" />
                    <span className="text-sm">
                      {earnedRewards}/{totalRewards} rewards earned
                    </span>
                  </div>
                  <Progress value={(earnedRewards / totalRewards) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{mockBook.title}</CardTitle>
                    <CardDescription className="text-lg">
                      {mockBook.subject} • {mockBook.class} Class
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-500">Free</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">{mockBook.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <FileText className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                    <p className="text-sm font-semibold">{mockBook.pages}</p>
                    <p className="text-xs text-gray-600">Pages</p>
                  </div>
                  <div className="text-center">
                    <BookOpen className="h-6 w-6 text-green-500 mx-auto mb-1" />
                    <p className="text-sm font-semibold">{mockBook.chapters}</p>
                    <p className="text-xs text-gray-600">Chapters</p>
                  </div>
                  <div className="text-center">
                    <Award className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
                    <p className="text-sm font-semibold">{totalRewards}</p>
                    <p className="text-xs text-gray-600">Max Rewards</p>
                  </div>
                  <div className="text-center">
                    <Trophy className="h-6 w-6 text-purple-500 mx-auto mb-1" />
                    <p className="text-sm font-semibold">
                      {mockBook.completedChapters}/{mockBook.chapters}
                    </p>
                    <p className="text-xs text-gray-600">Progress</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button size="lg" className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    Continue Reading
                  </Button>
                  <Button variant="outline" size="lg">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Chapters List */}
        <Card>
          <CardHeader>
            <CardTitle>Chapters & Modules</CardTitle>
            <CardDescription>Complete each chapter and solve its module to earn rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockBook.chapters_data.map((chapter, index) => (
                <div
                  key={chapter.id}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    chapter.completed ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        chapter.completed ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {chapter.completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold">{chapter.title}</h3>
                      <p className="text-sm text-gray-600">{chapter.pages} pages</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-sm">
                      <Coins className="h-4 w-4 text-yellow-500" />
                      <span className={chapter.moduleCompleted ? "text-green-600 font-semibold" : "text-gray-600"}>
                        {chapter.rewards} rewards
                      </span>
                    </div>

                    {chapter.completed ? (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                        {chapter.moduleCompleted ? (
                          <Badge className="bg-green-500">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Module Complete
                          </Badge>
                        ) : (
                          <Button size="sm" asChild>
                            <Link href={`/ebooks/${mockBook.id}/module/${chapter.id}`}>Take Module</Link>
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          disabled={index > 0 && !mockBook.chapters_data[index - 1].completed}
                          asChild={index === 0 || mockBook.chapters_data[index - 1].completed}
                        >
                          {index === 0 || mockBook.chapters_data[index - 1].completed ? (
                            <Link href={`/ebooks/${mockBook.id}/chapter/${chapter.id}`}>
                              {index === mockBook.completedChapters ? "Continue" : "Start"}
                            </Link>
                          ) : (
                            <>
                              <Lock className="h-3 w-3 mr-1" />
                              Locked
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
