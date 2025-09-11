"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Search,
  MessageSquare,
  Users,
  TrendingUp,
  Clock,
  ThumbsUp,
  MessageCircle,
  Pin,
  Star,
  Plus,
  Video,
  Phone,
} from "lucide-react"
import Link from "next/link"

interface ForumPost {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar?: string
    role: "Student" | "Mentor" | "Alumni"
    reputation: number
    stream?: string
  }
  category: string
  tags: string[]
  createdAt: Date
  replies: number
  likes: number
  views: number
  isPinned: boolean
  isAnswered: boolean
  lastActivity: Date
}

interface Category {
  id: string
  name: string
  description: string
  icon: string
  postCount: number
  color: string
}

const streams = [
  "All Streams",
  "Science (PCM)",
  "Science (PCB)",
  "Commerce",
  "Arts/Humanities",
  "Vocational",
  "Engineering",
  "Medical",
  "Management",
]

const categories: Category[] = [
  {
    id: "general",
    name: "General Discussion",
    description: "General academic and career discussions",
    icon: "💬",
    postCount: 245,
    color: "bg-[#005A9C]/10 text-[#005A9C] border-[#005A9C]/20",
  },
  {
    id: "stream-connections",
    name: "Stream Connections",
    description: "Connect with students from your stream",
    icon: "🤝",
    postCount: 312,
    color: "bg-[#138808]/10 text-[#138808] border-[#138808]/20",
  },
  {
    id: "entrance-exams",
    name: "Entrance Exams",
    description: "JEE, NEET, and other entrance exam discussions",
    icon: "📝",
    postCount: 189,
    color: "bg-[#FF9933]/10 text-[#FF9933] border-[#FF9933]/20",
  },
  {
    id: "college-life",
    name: "College Life",
    description: "Campus experiences and student life",
    icon: "🎓",
    postCount: 156,
    color: "bg-[#005A9C]/10 text-[#005A9C] border-[#005A9C]/20",
  },
  {
    id: "career-guidance",
    name: "Career Guidance",
    description: "Career advice and professional development",
    icon: "🚀",
    postCount: 134,
    color: "bg-[#FF9933]/10 text-[#FF9933] border-[#FF9933]/20",
  },
  {
    id: "study-groups",
    name: "Study Groups",
    description: "Form and join study groups with peers",
    icon: "👥",
    postCount: 87,
    color: "bg-[#138808]/10 text-[#138808] border-[#138808]/20",
  },
  {
    id: "scholarships",
    name: "Scholarships & Financial Aid",
    description: "Scholarship opportunities and financial planning",
    icon: "💰",
    postCount: 98,
    color: "bg-[#FF9933]/10 text-[#FF9933] border-[#FF9933]/20",
  },
  {
    id: "study-tips",
    name: "Study Tips & Resources",
    description: "Study strategies and learning resources",
    icon: "📚",
    postCount: 167,
    color: "bg-[#005A9C]/10 text-[#005A9C] border-[#005A9C]/20",
  },
]

const mockPosts: ForumPost[] = [
  {
    id: "1",
    title: "How to prepare for JEE Main in 6 months?",
    content:
      "I'm in 12th grade and have 6 months left for JEE Main. What's the best strategy to cover all topics effectively?",
    author: {
      name: "Rahul Kumar",
      role: "Student",
      reputation: 45,
      stream: "Science (PCM)",
    },
    category: "entrance-exams",
    tags: ["JEE Main", "Preparation", "Strategy", "PCM"],
    createdAt: new Date("2024-01-15"),
    replies: 23,
    likes: 45,
    views: 234,
    isPinned: false,
    isAnswered: true,
    lastActivity: new Date("2024-01-16"),
  },
  {
    id: "stream-connect-1",
    title: "Commerce students - Let's connect and share resources!",
    content:
      "Looking for Commerce stream students to form a study group for CA Foundation and other competitive exams. We can share notes, discuss concepts, and motivate each other!",
    author: {
      name: "Priya Sharma",
      role: "Student",
      reputation: 67,
      stream: "Commerce",
    },
    category: "stream-connections",
    tags: ["Commerce", "Study Group", "CA Foundation", "Networking"],
    createdAt: new Date("2024-01-14"),
    replies: 18,
    likes: 32,
    views: 189,
    isPinned: true,
    isAnswered: false,
    lastActivity: new Date("2024-01-16"),
  },
  {
    id: "2",
    title: "Best Government Engineering Colleges in Delhi",
    content:
      "Can someone share their experiences about DTU, NSUT, and IGDTUW? Which one should I prioritize in counseling?",
    author: {
      name: "Arjun Singh",
      role: "Student",
      reputation: 23,
      stream: "Engineering",
    },
    category: "college-life",
    tags: ["Delhi", "Engineering", "Government Colleges"],
    createdAt: new Date("2024-01-14"),
    replies: 18,
    likes: 32,
    views: 189,
    isPinned: true,
    isAnswered: false,
    lastActivity: new Date("2024-01-16"),
  },
  {
    id: "3",
    title: "Scholarship opportunities for SC/ST students",
    content:
      "I'm looking for scholarship programs specifically for SC/ST students pursuing engineering. Any recommendations?",
    author: {
      name: "Arjun Singh",
      role: "Student",
      reputation: 23,
      stream: "Engineering",
    },
    category: "scholarships",
    tags: ["SC/ST", "Scholarships", "Engineering"],
    createdAt: new Date("2024-01-13"),
    replies: 15,
    likes: 28,
    views: 156,
    isPinned: false,
    isAnswered: true,
    lastActivity: new Date("2024-01-15"),
  },
  {
    id: "4",
    title: "Career prospects in Computer Science vs Information Technology",
    content:
      "I'm confused between CSE and IT branches. What are the key differences in terms of curriculum and job opportunities?",
    author: {
      name: "Sneha Patel",
      role: "Student",
      reputation: 89,
      stream: "Engineering",
    },
    category: "career-guidance",
    tags: ["Computer Science", "Information Technology", "Career"],
    createdAt: new Date("2024-01-12"),
    replies: 31,
    likes: 56,
    views: 298,
    isPinned: false,
    isAnswered: true,
    lastActivity: new Date("2024-01-16"),
  },
  {
    id: "5",
    title: "Effective study schedule for Class 12 boards + competitive exams",
    content: "How do you balance board exam preparation with JEE/NEET preparation? Looking for a practical time table.",
    author: {
      name: "Dr. Rajesh Kumar",
      role: "Mentor",
      reputation: 234,
      stream: "All Streams",
    },
    category: "study-tips",
    tags: ["Time Management", "Board Exams", "Competitive Exams"],
    createdAt: new Date("2024-01-11"),
    replies: 42,
    likes: 78,
    views: 445,
    isPinned: true,
    isAnswered: false,
    lastActivity: new Date("2024-01-16"),
  },
  {
    id: "6",
    title: "Life at IIT Delhi - An Alumni's Perspective",
    content:
      "Sharing my 4-year journey at IIT Delhi, from academics to placements. AMA about campus life and opportunities!",
    author: {
      name: "Amit Verma",
      role: "Alumni",
      reputation: 456,
      stream: "Engineering",
    },
    category: "college-life",
    tags: ["IIT Delhi", "Alumni Experience", "Campus Life"],
    createdAt: new Date("2024-01-10"),
    replies: 67,
    likes: 123,
    views: 567,
    isPinned: false,
    isAnswered: false,
    lastActivity: new Date("2024-01-16"),
  },
]

export default function CommunityForumPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStream, setSelectedStream] = useState("All Streams")
  const [sortBy, setSortBy] = useState("recent")
  const [filterBy, setFilterBy] = useState("all")

  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory

    const matchesStream =
      selectedStream === "All Streams" ||
      post.author.stream === selectedStream ||
      post.tags.some((tag) => tag.toLowerCase().includes(selectedStream.toLowerCase()))

    const matchesFilter =
      filterBy === "all" ||
      (filterBy === "answered" && post.isAnswered) ||
      (filterBy === "unanswered" && !post.isAnswered) ||
      (filterBy === "pinned" && post.isPinned)

    return matchesSearch && matchesCategory && matchesStream && matchesFilter
  })

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1

    switch (sortBy) {
      case "recent":
        return b.lastActivity.getTime() - a.lastActivity.getTime()
      case "popular":
        return b.likes - a.likes
      case "replies":
        return b.replies - a.replies
      case "views":
        return b.views - a.views
      default:
        return 0
    }
  })

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Mentor":
        return "bg-[#FF9933]/10 text-[#FF9933] border-[#FF9933]/20"
      case "Alumni":
        return "bg-[#005A9C]/10 text-[#005A9C] border-[#005A9C]/20"
      case "Student":
        return "bg-[#138808]/10 text-[#138808] border-[#138808]/20"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Mentor":
        return <Star className="w-3 h-3" />
      case "Alumni":
        return <Users className="w-3 h-3" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <header className="border-b backdrop-blur-sm sticky top-0 z-50 bg-white/90 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-[#005A9C] hover:bg-[#005A9C]/10 rounded-lg font-['Inter']"
                asChild
              >
                <Link href="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#FF9933] to-[#005A9C] rounded-xl flex items-center justify-center shadow-lg">
                  <div className="text-white text-lg font-bold">🦚</div>
                </div>
                <h1 className="text-xl font-bold text-[#333333] font-['Poppins']">Community Forum</h1>
              </div>
            </div>
            <Button
              className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              asChild
            >
              <Link href="/community/new-post">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#333333] font-['Poppins']">
            Connect with the <span className="text-[#FF9933]">Pavo Community</span>
          </h1>
          <p className="text-xl text-[#333333]/80 max-w-2xl mx-auto font-['Inter'] leading-relaxed">
            Ask questions, share experiences, and connect with students from your stream, mentors, and alumni
          </p>
        </div>

        <Tabs defaultValue="discussions" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white rounded-xl shadow-lg border-2 border-gray-200">
            <TabsTrigger
              value="discussions"
              className="data-[state=active]:bg-[#FF9933] data-[state=active]:text-white rounded-lg font-['Inter'] font-medium"
            >
              Discussions
            </TabsTrigger>
            <TabsTrigger
              value="live-chats"
              className="data-[state=active]:bg-[#FF9933] data-[state=active]:text-white rounded-lg font-['Inter'] font-medium"
            >
              Live Chats
            </TabsTrigger>
            <TabsTrigger
              value="categories"
              className="data-[state=active]:bg-[#FF9933] data-[state=active]:text-white rounded-lg font-['Inter'] font-medium"
            >
              Categories
            </TabsTrigger>
            <TabsTrigger
              value="stream-connect"
              className="data-[state=active]:bg-[#FF9933] data-[state=active]:text-white rounded-lg font-['Inter'] font-medium"
            >
              Stream Connect
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live-chats" className="space-y-6">
            <Card className="border-0 shadow-xl bg-white rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#FF9933]/5 via-[#005A9C]/5 to-[#138808]/5">
                <CardTitle className="text-[#333333] font-['Poppins']">Active Chat Rooms</CardTitle>
                <CardDescription className="text-[#333333]/80 font-['Inter']">
                  Join live discussions with students, mentors, and alumni. Get instant help and connect in real-time.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-[#FF9933]/50 transition-all duration-200 hover:shadow-lg bg-white">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-[#005A9C]/10 rounded-full flex items-center justify-center">
                        <span className="text-[#005A9C] font-semibold font-['Poppins']">PCM</span>
                      </div>
                      <div>
                        <p className="font-medium text-[#333333] font-['Poppins']">Physics Doubt Clearing Session</p>
                        <p className="text-sm text-[#333333]/70 font-['Inter']">
                          Science (PCM) • 45 participants • 12 online
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="w-2 h-2 bg-[#138808] rounded-full"></div>
                          <span className="text-xs text-[#138808] font-['Inter']">Active now</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-2 border-[#005A9C] text-[#005A9C] hover:bg-[#005A9C] hover:text-white rounded-lg bg-transparent"
                      >
                        <Video className="w-4 h-4 mr-2" />
                        Video Call
                      </Button>
                      <Button
                        size="sm"
                        className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                        asChild
                      >
                        <Link href="/community/chat/pcm-physics">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Join Chat
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-[#FF9933]/50 transition-all duration-200 hover:shadow-lg bg-white">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-[#138808]/10 rounded-full flex items-center justify-center">
                        <span className="text-[#138808] font-semibold font-['Poppins']">COM</span>
                      </div>
                      <div>
                        <p className="font-medium text-[#333333] font-['Poppins']">CA Foundation Study Group</p>
                        <p className="text-sm text-[#333333]/70 font-['Inter']">
                          Commerce • 32 participants • 8 online
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="w-2 h-2 bg-[#138808] rounded-full"></div>
                          <span className="text-xs text-[#138808] font-['Inter']">Active now</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-2 border-[#005A9C] text-[#005A9C] hover:bg-[#005A9C] hover:text-white rounded-lg bg-transparent"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Voice Call
                      </Button>
                      <Button
                        size="sm"
                        className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                        asChild
                      >
                        <Link href="/community/chat/commerce-ca">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Join Chat
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-[#FF9933]/50 transition-all duration-200 hover:shadow-lg bg-white">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-[#FF9933]/10 rounded-full flex items-center justify-center">
                        <span className="text-[#FF9933] font-semibold font-['Poppins']">ART</span>
                      </div>
                      <div>
                        <p className="font-medium text-[#333333] font-['Poppins']">UPSC Preparation Discussion</p>
                        <p className="text-sm text-[#333333]/70 font-['Inter']">
                          Arts/Humanities • 67 participants • 15 online
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="w-2 h-2 bg-[#138808] rounded-full"></div>
                          <span className="text-xs text-[#138808] font-['Inter']">Active now</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-2 border-[#005A9C] text-[#005A9C] hover:bg-[#005A9C] hover:text-white rounded-lg bg-transparent"
                      >
                        <Video className="w-4 h-4 mr-2" />
                        Video Call
                      </Button>
                      <Button
                        size="sm"
                        className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                        asChild
                      >
                        <Link href="/community/chat/arts-upsc">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Join Chat
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#FF9933]/5 via-[#005A9C]/5 to-[#138808]/5">
                <CardTitle className="text-[#333333] font-['Poppins']">Create Your Own Chat Room</CardTitle>
                <CardDescription className="text-[#333333]/80 font-['Inter']">
                  Start a new discussion room for your specific topic or study group
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Button className="h-20 flex-col space-y-2 bg-[#FF9933] hover:bg-[#FF9933]/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                    <Users className="w-6 h-6" />
                    <span>Study Group Chat</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col space-y-2 bg-transparent border-2 border-[#005A9C] text-[#005A9C] hover:bg-[#005A9C] hover:text-white rounded-xl transition-all duration-200"
                  >
                    <MessageSquare className="w-6 h-6" />
                    <span>Topic Discussion</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stream-connect" className="space-y-6">
            <Card className="border-0 shadow-xl bg-white rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#FF9933]/5 via-[#005A9C]/5 to-[#138808]/5">
                <CardTitle className="text-[#333333] font-['Poppins']">Connect with Your Stream</CardTitle>
                <CardDescription className="text-[#333333]/80 font-['Inter']">
                  Find and connect with students from your academic stream. Share resources, form study groups, and
                  support each other.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {streams.slice(1).map((stream) => (
                    <Card
                      key={stream}
                      className="border-2 border-gray-200 hover:border-[#FF9933]/50 transition-all duration-200 hover:shadow-lg cursor-pointer bg-white rounded-xl"
                    >
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl mb-2">
                            {stream.includes("Science")
                              ? "🔬"
                              : stream.includes("Commerce")
                                ? "💼"
                                : stream.includes("Arts")
                                  ? "🎨"
                                  : stream.includes("Engineering")
                                    ? "⚙️"
                                    : stream.includes("Medical")
                                      ? "🏥"
                                      : "📚"}
                          </div>
                          <h3 className="font-semibold mb-2 text-[#333333] font-['Poppins']">{stream}</h3>
                          <p className="text-sm text-[#333333]/70 mb-3 font-['Inter']">
                            {Math.floor(Math.random() * 200) + 50} active students
                          </p>
                          <div className="space-y-2">
                            <Button
                              size="sm"
                              className="w-full bg-[#FF9933] hover:bg-[#FF9933]/90 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                              onClick={() => {
                                setSelectedStream(stream)
                                setSelectedCategory("stream-connections")
                              }}
                            >
                              Join Community
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full bg-transparent border-2 border-[#005A9C] text-[#005A9C] hover:bg-[#005A9C] hover:text-white rounded-lg transition-all duration-200"
                              asChild
                            >
                              <Link href={`/community/chat/${stream.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}>
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Live Chat
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Featured Stream Discussions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">PCM</span>
                      </div>
                      <div>
                        <p className="font-medium">Physics Doubt Clearing Session</p>
                        <p className="text-sm text-muted-foreground">Science (PCM) • 45 participants</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Join
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-semibold">COM</span>
                      </div>
                      <div>
                        <p className="font-medium">CA Foundation Study Group</p>
                        <p className="text-sm text-muted-foreground">Commerce • 32 participants</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Join
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-semibold">ART</span>
                      </div>
                      <div>
                        <p className="font-medium">UPSC Preparation Discussion</p>
                        <p className="text-sm text-muted-foreground">Arts/Humanities • 67 participants</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Join
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Card
                  key={category.id}
                  className="border-2 border-gray-200 hover:border-[#FF9933]/50 transition-all duration-200 hover:shadow-xl cursor-pointer bg-white rounded-xl overflow-hidden"
                >
                  <CardHeader className="pb-4 bg-gradient-to-r from-[#FF9933]/5 via-[#005A9C]/5 to-[#138808]/5">
                    <div className="flex items-center justify-between">
                      <div className="text-3xl">{category.icon}</div>
                      <Badge className={`${category.color} px-3 py-1 rounded-full`}>{category.postCount} posts</Badge>
                    </div>
                    <CardTitle className="text-lg text-[#333333] font-['Poppins']">{category.name}</CardTitle>
                    <CardDescription className="text-[#333333]/80 font-['Inter']">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-[#005A9C] hover:bg-[#005A9C]/10 rounded-lg font-['Inter']"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      Browse Discussions
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="discussions" className="space-y-6">
            <Card className="border-0 shadow-xl bg-white rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-5 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-[#333333]/60" />
                    <Input
                      placeholder="Search discussions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-2 border-gray-200 focus:border-[#FF9933] rounded-xl bg-white shadow-sm font-['Inter']"
                    />
                  </div>

                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="border-2 border-gray-200 focus:border-[#005A9C] rounded-xl bg-white font-['Inter']">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-2 border-gray-200 bg-white shadow-lg">
                      <SelectItem value="all" className="font-['Inter'] hover:bg-[#FF9933]/5">
                        All Categories
                      </SelectItem>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id}
                          className="font-['Inter'] hover:bg-[#FF9933]/5"
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedStream} onValueChange={setSelectedStream}>
                    <SelectTrigger className="border-2 border-gray-200 focus:border-[#005A9C] rounded-xl bg-white font-['Inter']">
                      <SelectValue placeholder="All Streams" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-2 border-gray-200 bg-white shadow-lg">
                      {streams.map((stream) => (
                        <SelectItem key={stream} value={stream} className="font-['Inter'] hover:bg-[#FF9933]/5">
                          {stream}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="border-2 border-gray-200 focus:border-[#005A9C] rounded-xl bg-white font-['Inter']">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-2 border-gray-200 bg-white shadow-lg">
                      <SelectItem value="recent" className="font-['Inter'] hover:bg-[#FF9933]/5">
                        Most Recent
                      </SelectItem>
                      <SelectItem value="popular" className="font-['Inter'] hover:bg-[#FF9933]/5">
                        Most Popular
                      </SelectItem>
                      <SelectItem value="replies" className="font-['Inter'] hover:bg-[#FF9933]/5">
                        Most Replies
                      </SelectItem>
                      <SelectItem value="views" className="font-['Inter'] hover:bg-[#FF9933]/5">
                        Most Views
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterBy} onValueChange={setFilterBy}>
                    <SelectTrigger className="border-2 border-gray-200 focus:border-[#005A9C] rounded-xl bg-white font-['Inter']">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-2 border-gray-200 bg-white shadow-lg">
                      <SelectItem value="all" className="font-['Inter'] hover:bg-[#FF9933]/5">
                        All Posts
                      </SelectItem>
                      <SelectItem value="answered" className="font-['Inter'] hover:bg-[#FF9933]/5">
                        Answered
                      </SelectItem>
                      <SelectItem value="unanswered" className="font-['Inter'] hover:bg-[#FF9933]/5">
                        Unanswered
                      </SelectItem>
                      <SelectItem value="pinned" className="font-['Inter'] hover:bg-[#FF9933]/5">
                        Pinned
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between">
              <p className="text-[#333333]/70 font-['Inter']">
                Showing {sortedPosts.length} discussion{sortedPosts.length !== 1 ? "s" : ""}
              </p>
              <div className="flex items-center space-x-2 text-sm text-[#333333]/70">
                <TrendingUp className="w-4 h-4 text-[#FF9933]" />
                <span className="font-['Inter']">
                  Active community with {mockPosts.reduce((sum, post) => sum + post.replies, 0)} replies
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {sortedPosts.map((post) => (
                <Card
                  key={post.id}
                  className="border-2 border-gray-200 hover:border-[#FF9933]/50 transition-all duration-200 hover:shadow-xl bg-white rounded-xl overflow-hidden"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                        <AvatarFallback className="bg-[#005A9C]/10 text-[#005A9C] font-['Poppins'] font-semibold">
                          {post.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {post.isPinned && <Pin className="w-4 h-4 text-[#FF9933]" />}
                            <Link href={`/community/post/${post.id}`}>
                              <h3 className="text-lg font-semibold hover:text-[#FF9933] transition-colors cursor-pointer text-[#333333] font-['Poppins']">
                                {post.title}
                              </h3>
                            </Link>
                            {post.isAnswered && (
                              <Badge className="bg-[#138808]/10 text-[#138808] border-[#138808]/20 text-xs px-2 py-1 rounded-full">
                                Answered
                              </Badge>
                            )}
                          </div>
                        </div>

                        <p className="text-[#333333]/80 mb-3 line-clamp-2 font-['Inter']">{post.content}</p>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              className="text-xs bg-[#005A9C]/10 text-[#005A9C] border-[#005A9C]/20 px-2 py-1 rounded-md"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-[#333333]/70">
                            <div className="flex items-center space-x-1">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="text-xs bg-[#FF9933]/10 text-[#FF9933] font-['Poppins']">
                                  {post.author.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-['Inter']">{post.author.name}</span>
                              <Badge className={`${getRoleColor(post.author.role)} text-xs px-2 py-1 rounded-full`}>
                                <div className="flex items-center space-x-1">
                                  {getRoleIcon(post.author.role)}
                                  <span>{post.author.role}</span>
                                </div>
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4 text-[#005A9C]" />
                              <span className="font-['Inter']">{post.createdAt.toLocaleDateString()}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-[#333333]/70">
                            <div className="flex items-center space-x-1">
                              <ThumbsUp className="w-4 h-4 text-[#FF9933]" />
                              <span className="font-['Inter']">{post.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="w-4 h-4 text-[#138808]" />
                              <span className="font-['Inter']">{post.replies}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="font-['Inter']">{post.views} views</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {sortedPosts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF9933]/20 to-[#005A9C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-[#005A9C]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#333333] font-['Poppins']">No discussions found</h3>
                <p className="text-[#333333]/70 mb-4 font-['Inter']">Try adjusting your search criteria or filters</p>
                <Button
                  className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                  asChild
                >
                  <Link href="/community/new-post">Start a New Discussion</Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Card className="mt-8 border-0 shadow-xl bg-white rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#FF9933]/5 via-[#005A9C]/5 to-[#138808]/5">
            <CardTitle className="text-center text-[#333333] font-['Poppins']">Community Statistics</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-[#FF9933] mb-2 font-['Poppins']">1,247</div>
                <div className="text-sm text-[#333333]/70 font-['Inter']">Active Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#005A9C] mb-2 font-['Poppins']">
                  {categories.reduce((sum, cat) => sum + cat.postCount, 0)}
                </div>
                <div className="text-sm text-[#333333]/70 font-['Inter']">Total Discussions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#138808] mb-2 font-['Poppins']">
                  {mockPosts.reduce((sum, post) => sum + post.replies, 0)}
                </div>
                <div className="text-sm text-[#333333]/70 font-['Inter']">Total Replies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#FF9933] mb-2 font-['Poppins']">89%</div>
                <div className="text-sm text-[#333333]/70 font-['Inter']">Questions Answered</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 border-0 shadow-xl bg-white rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#FF9933]/5 via-[#005A9C]/5 to-[#138808]/5">
            <CardTitle className="text-[#333333] font-['Poppins']">Community Guidelines</CardTitle>
            <CardDescription className="text-[#333333]/80 font-['Inter']">
              Help us maintain a supportive and respectful environment
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#138808]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#138808] text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-[#333333] font-['Poppins']">Be Respectful</p>
                    <p className="text-sm text-[#333333]/80 font-['Inter']">
                      Treat all community members with respect and kindness
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#138808]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#138808] text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-[#333333] font-['Poppins']">Stay On Topic</p>
                    <p className="text-sm text-[#333333]/80 font-['Inter']">
                      Keep discussions relevant to academics and careers
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#138808]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#138808] text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-[#333333] font-['Poppins']">Help Others</p>
                    <p className="text-sm text-[#333333]/80 font-['Inter']">
                      Share your knowledge and experiences to help peers
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#FF9933]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#FF9933] text-sm font-bold">✗</span>
                  </div>
                  <div>
                    <p className="font-medium text-[#333333] font-['Poppins']">No Spam or Self-Promotion</p>
                    <p className="text-sm text-[#333333]/80 font-['Inter']">
                      Avoid excessive promotional content or spam
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#FF9933]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#FF9933] text-sm font-bold">✗</span>
                  </div>
                  <div>
                    <p className="font-medium text-[#333333] font-['Poppins']">No Harassment</p>
                    <p className="text-sm text-[#333333]/80 font-['Inter']">
                      Harassment or bullying will not be tolerated
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#FF9933]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#FF9933] text-sm font-bold">✗</span>
                  </div>
                  <div>
                    <p className="font-medium text-[#333333] font-['Poppins']">No Misinformation</p>
                    <p className="text-sm text-[#333333]/80 font-['Inter']">
                      Ensure information shared is accurate and helpful
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
