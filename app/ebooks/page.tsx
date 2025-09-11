"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Star, Lock, Trophy, Coins, Download, Eye } from "lucide-react"
import Link from "next/link"

const difficultyLevels = [
  { id: "beginner", name: "Beginner", color: "bg-green-500", description: "Foundation concepts" },
  { id: "intermediate", name: "Intermediate", color: "bg-blue-500", description: "Building knowledge" },
  { id: "advanced", name: "Advanced", color: "bg-orange-500", description: "Complex topics" },
  { id: "pro", name: "Pro", color: "bg-red-500", description: "Expert level" },
]

const streams = [
  { id: "science-pcm", name: "Science (PCM)", subjects: ["Physics", "Chemistry", "Mathematics"] },
  { id: "science-pcb", name: "Science (PCB)", subjects: ["Physics", "Chemistry", "Biology"] },
  { id: "commerce", name: "Commerce", subjects: ["Accountancy", "Business Studies", "Economics"] },
  { id: "arts", name: "Arts", subjects: ["History", "Geography", "Political Science"] },
]

const mockBooks = [
  {
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
  },
  {
    id: 2,
    title: "Advanced Chemistry Class 12",
    subject: "Chemistry",
    class: "12th",
    stream: "science-pcm",
    difficulty: "advanced",
    chapters: 16,
    completedChapters: 0,
    isFree: false,
    cost: 100,
    rewards: 80,
    rating: 4.9,
    downloads: 8900,
    cover: "/chemistry-textbook.png",
  },
  {
    id: 3,
    title: "Business Studies Fundamentals",
    subject: "Business Studies",
    class: "11th",
    stream: "commerce",
    difficulty: "beginner",
    chapters: 12,
    completedChapters: 5,
    isFree: true,
    rewards: 40,
    rating: 4.6,
    downloads: 9800,
    cover: "/business-studies-textbook.jpg",
  },
  {
    id: 4,
    title: "Pro Mathematics Class 12",
    subject: "Mathematics",
    class: "12th",
    stream: "science-pcm",
    difficulty: "pro",
    chapters: 13,
    completedChapters: 0,
    isFree: false,
    cost: 150,
    rewards: 120,
    rating: 4.9,
    downloads: 5600,
    cover: "/advanced-mathematics-textbook.jpg",
  },
  {
    id: 5,
    title: "Biology Basics Class 10",
    subject: "Biology",
    class: "10th",
    stream: "science-pcb",
    difficulty: "beginner",
    chapters: 10,
    completedChapters: 8,
    isFree: true,
    rewards: 35,
    rating: 4.7,
    downloads: 15200,
    cover: "/biology-textbook.jpg",
  },
  {
    id: 6,
    title: "Economics Advanced Theory",
    subject: "Economics",
    class: "12th",
    stream: "commerce",
    difficulty: "advanced",
    chapters: 14,
    completedChapters: 2,
    isFree: false,
    cost: 120,
    rewards: 90,
    rating: 4.8,
    downloads: 7300,
    cover: "/economics-textbook.jpg",
  },
]

export default function EbooksPage() {
  const [selectedLevel, setSelectedLevel] = useState("beginner")
  const [selectedStream, setSelectedStream] = useState("all")
  const [userRewards] = useState(250) // Mock user rewards

  const filteredBooks = mockBooks.filter((book) => {
    const levelMatch = book.difficulty === selectedLevel
    const streamMatch = selectedStream === "all" || book.stream === selectedStream
    return levelMatch && streamMatch
  })

  const freeBooks = mockBooks.filter((book) => book.isFree).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-orange-500 to-green-600 text-white p-3 rounded-full shadow-lg">
                <div className="text-xl">🦚</div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
                  📚 E-Books Library
                </h1>
                <p className="text-gray-700 font-medium">Master your subjects with our comprehensive collection</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-yellow-200 px-4 py-2 rounded-xl shadow-md border border-yellow-300">
                <Coins className="h-5 w-5 text-yellow-700" />
                <span className="font-bold text-yellow-800">{userRewards} Rewards</span>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-300 font-semibold">
                {freeBooks} Free Books Available
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-xl">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-800">{mockBooks.length}</p>
                  <p className="text-sm text-gray-600 font-medium">Total Books</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-yellow-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-3 rounded-xl">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-800">
                    {mockBooks.reduce((acc, book) => acc + book.completedChapters, 0)}
                  </p>
                  <p className="text-sm text-gray-600 font-medium">Chapters Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-green-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-800">4.8</p>
                  <p className="text-sm text-gray-600 font-medium">Avg Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl">
                  <Download className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-800">
                    {(mockBooks.reduce((acc, book) => acc + book.downloads, 0) / 1000).toFixed(0)}K
                  </p>
                  <p className="text-sm text-gray-600 font-medium">Downloads</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Difficulty Level Selector */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Your Level</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {difficultyLevels.map((level) => (
              <Card
                key={level.id}
                className={`cursor-pointer transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl ${
                  selectedLevel === level.id ? "ring-2 ring-orange-500 shadow-xl scale-105" : "hover:scale-102"
                }`}
                onClick={() => setSelectedLevel(level.id)}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 ${level.color} rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg`}
                  >
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">{level.name}</h3>
                  <p className="text-sm text-gray-600 font-medium">{level.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stream Filter */}
        <div className="mb-8">
          <Tabs value={selectedStream} onValueChange={setSelectedStream}>
            <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur-sm border border-orange-200 shadow-lg">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white font-semibold"
              >
                All Streams
              </TabsTrigger>
              {streams.map((stream) => (
                <TabsTrigger
                  key={stream.id}
                  value={stream.id}
                  className="data-[state=active]:bg-orange-500 data-[state=active]:text-white font-semibold"
                >
                  {stream.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book) => (
            <Card
              key={book.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-gray-200 hover:scale-105"
            >
              <div className="relative">
                <img src={book.cover || "/placeholder.svg"} alt={book.title} className="w-full h-48 object-cover" />
                <div className="absolute top-3 right-3">
                  {book.isFree ? (
                    <Badge className="bg-green-500 text-white font-semibold shadow-lg">Free</Badge>
                  ) : (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold shadow-lg">
                      <Coins className="h-3 w-3 mr-1" />
                      {book.cost}
                    </Badge>
                  )}
                </div>
                <div className="absolute top-3 left-3">
                  <Badge className="bg-white/90 text-gray-800 border border-gray-300 font-semibold">
                    {book.class} Class
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-gray-800">{book.title}</CardTitle>
                <CardDescription className="text-gray-600 font-medium">{book.subject}</CardDescription>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-semibold">{book.rating}</span>
                  <span className="text-gray-500">•</span>
                  <Download className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{book.downloads.toLocaleString()}</span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-700">Progress</span>
                    <span className="font-semibold text-gray-800">
                      {book.completedChapters}/{book.chapters} chapters
                    </span>
                  </div>
                  <Progress value={(book.completedChapters / book.chapters) * 100} className="h-3" />
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-sm text-green-700">
                    <Trophy className="h-4 w-4" />
                    <span className="font-semibold">{book.rewards} rewards</span>
                  </div>
                  <Badge
                    className={`${difficultyLevels.find((l) => l.id === book.difficulty)?.color} text-white font-semibold`}
                  >
                    {difficultyLevels.find((l) => l.id === book.difficulty)?.name}
                  </Badge>
                </div>

                <div className="flex gap-3">
                  <Button
                    asChild
                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg"
                  >
                    <Link href={`/ebooks/${book.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      {book.completedChapters > 0 ? "Continue" : "Start Reading"}
                    </Link>
                  </Button>
                  {!book.isFree && (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={userRewards < book.cost}
                      className="border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent"
                    >
                      {userRewards >= book.cost ? (
                        <>
                          <Coins className="h-4 w-4 mr-1" />
                          Buy
                        </>
                      ) : (
                        <Lock className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-gray-200">
              <BookOpen className="h-20 w-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-700 mb-3">No books found</h3>
              <p className="text-gray-600 font-medium">Try selecting a different level or stream</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
