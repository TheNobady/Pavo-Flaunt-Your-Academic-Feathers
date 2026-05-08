"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Search, Clock, DollarSign, Target } from "lucide-react"
import Link from "next/link"

interface CareerPath {
  id: string
  title: string
  category: string
  description: string
  duration: string
  averageSalary: string
  demandLevel: "High" | "Medium" | "Low"
  requiredEducation: string[]
  keySkills: string[]
  careerProgression: {
    level: string
    title: string
    experience: string
    salary: string
  }[]
  relatedCareers: string[]
}

const categories = ["All", "Technology", "Healthcare", "Finance", "Engineering", "Education", "Design"]

export default function CareerPathsPage() {
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredPaths, setFilteredPaths] = useState<CareerPath[]>([])
  const [userRecommendations, setUserRecommendations] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/career-paths`)
      .then((res) => res.json())
      .then((data) => {
        setCareerPaths(data)
        setFilteredPaths(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching career paths:", error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    // Check for quiz results to show personalized recommendations
    const quizResults = localStorage.getItem("pavoQuizResults")
    if (quizResults) {
      const results = JSON.parse(quizResults)
      const recommendations = generateRecommendations(results)
      setUserRecommendations(recommendations)
    }
  }, [])

  useEffect(() => {
    let filtered = careerPaths

    if (selectedCategory !== "All") {
      filtered = filtered.filter((path) => path.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (path) =>
          path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          path.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          path.keySkills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    setFilteredPaths(filtered)
  }, [searchTerm, selectedCategory])

  const generateRecommendations = (results: any): string[] => {
    const recommendations = []

    if (results.logical >= 6 && results.numerical >= 6) {
      recommendations.push("software-engineer")
    }
    if (results.analytical >= 7 && results.verbal >= 5) {
      recommendations.push("doctor")
    }
    if (results.numerical >= 7 && results.analytical >= 6) {
      recommendations.push("chartered-accountant")
    }
    if (results.spatial >= 6 && results.numerical >= 5) {
      recommendations.push("civil-engineer")
    }
    if (results.verbal >= 6 && results.creative >= 5) {
      recommendations.push("teacher")
    }
    if (results.creative >= 7 && results.spatial >= 6) {
      recommendations.push("graphic-designer")
    }

    return recommendations
  }

  const getDemandColor = (level: string) => {
    switch (level) {
      case "High":
        return "bg-[#138808]/10 text-[#138808] border-[#138808]/20"
      case "Medium":
        return "bg-[#FF9933]/10 text-[#FF9933] border-[#FF9933]/20"
      case "Low":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRecommendationReason = (pathId: string): string => {
    const quizResults = localStorage.getItem("pavoQuizResults")
    if (!quizResults) return "aptitude"

    const results = JSON.parse(quizResults)

    switch (pathId) {
      case "software-engineer":
        return "logical and numerical"
      case "doctor":
        return "analytical and verbal"
      case "chartered-accountant":
        return "numerical and analytical"
      case "civil-engineer":
        return "spatial and numerical"
      case "teacher":
        return "verbal and creative"
      case "graphic-designer":
        return "creative and spatial"
      default:
        return "aptitude"
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <header className="border-b backdrop-blur-sm sticky top-0 z-50 bg-white/90 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#005A9C] to-[#138808] rounded-xl flex items-center justify-center shadow-lg">
                <div className="text-lg font-bold">🦚</div>
              </div>
              <h1 className="text-2xl font-bold text-[#333333] font-['Poppins']">Pavo</h1>
            </div>
            <Badge className="bg-[#FF9933]/10 text-[#FF9933] border-[#FF9933]/20 px-4 py-2 rounded-full font-medium">
              Career Pathways
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-[#333333] font-['Poppins']">
            Explore <span className="text-[#FF9933]">Career Pathways</span>
          </h1>
          <p className="text-xl text-[#333333]/80 max-w-2xl mx-auto font-['Inter'] leading-relaxed">
            Discover detailed roadmaps from education to your dream career, with progression paths and salary insights
          </p>
        </div>

        {userRecommendations.length > 0 && (
          <div className="mb-8">
            <Card className="border-2 border-[#005A9C]/20 bg-gradient-to-r from-[#FF9933]/5 via-[#005A9C]/5 to-[#138808]/5 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-white/50">
                <CardTitle className="flex items-center text-[#333333] font-['Poppins']">
                  <Target className="w-5 h-5 mr-2 text-[#FF9933]" />
                  Recommended for You
                </CardTitle>
                <CardDescription className="text-[#333333]/80 font-['Inter']">
                  Based on your aptitude quiz results, these careers match your strengths
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userRecommendations.slice(0, 3).map((pathId) => {
                    const path = careerPaths.find((p) => p.id === pathId)
                    if (!path) return null

                    return (
                      <Card
                        key={path.id}
                        className="border-2 border-[#005A9C]/30 hover:border-[#FF9933]/50 transition-all duration-200 hover:shadow-lg bg-white rounded-xl"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <Badge className="bg-[#005A9C]/10 text-[#005A9C] border-[#005A9C]/20 px-3 py-1 rounded-full">
                              {Math.floor(Math.random() * 15) + 85}% Match
                            </Badge>
                            <Badge className={getDemandColor(path.demandLevel)}>{path.demandLevel} Demand</Badge>
                          </div>
                          <CardTitle className="text-lg text-[#333333] font-['Poppins']">{path.title}</CardTitle>
                          <CardDescription className="text-sm text-[#333333]/70 font-['Inter']">
                            {path.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm mb-3">
                            <span className="flex items-center text-[#333333]/80 font-['Inter']">
                              <DollarSign className="w-4 h-4 mr-1 text-[#138808]" />
                              {path.averageSalary}
                            </span>
                            <span className="flex items-center text-[#333333]/80 font-['Inter']">
                              <Clock className="w-4 h-4 mr-1 text-[#005A9C]" />
                              {path.duration}
                            </span>
                          </div>
                          <div className="mb-3">
                            <p className="text-xs text-[#333333]/70 font-['Inter']">
                              <strong>Why recommended:</strong> Strong match with your {getRecommendationReason(pathId)}{" "}
                              skills
                            </p>
                          </div>
                          <Button
                            size="sm"
                            className="w-full bg-[#FF9933] hover:bg-[#FF9933]/90 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                            asChild
                          >
                            <Link href={`/career-paths/${path.id}`}>
                              View Details <ArrowRight className="ml-2 w-3 h-3" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-[#005A9C] text-[#005A9C] hover:bg-[#005A9C] hover:text-white rounded-lg bg-transparent"
                    asChild
                  >
                    <Link href="/quiz">Retake Quiz</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-[#138808] text-[#138808] hover:bg-[#138808] hover:text-white rounded-lg bg-transparent"
                    asChild
                  >
                    <Link href="/mentorship">Get Expert Advice</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#333333]/60 w-4 h-4" />
            <Input
              placeholder="Search careers, skills, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-2 border-gray-200 focus:border-[#FF9933] rounded-xl bg-white shadow-sm font-['Inter']"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48 border-2 border-gray-200 focus:border-[#005A9C] rounded-xl bg-white shadow-sm font-['Inter']">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-2 border-gray-200 bg-white shadow-lg">
              {categories.map((category) => (
                <SelectItem key={category} value={category} className="font-['Inter'] hover:bg-[#FF9933]/5">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPaths.map((path) => (
            <Card
              key={path.id}
              className="border-2 border-gray-200 hover:border-[#FF9933]/50 transition-all duration-200 hover:shadow-xl bg-white rounded-xl overflow-hidden"
            >
              <CardHeader className="bg-gradient-to-r from-[#FF9933]/5 via-[#005A9C]/5 to-[#138808]/5">
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-[#005A9C]/10 text-[#005A9C] border-[#005A9C]/20 px-3 py-1 rounded-full font-medium">
                    {path.category}
                  </Badge>
                  <Badge className={getDemandColor(path.demandLevel)}>{path.demandLevel} Demand</Badge>
                </div>
                <CardTitle className="text-xl text-[#333333] font-['Poppins']">{path.title}</CardTitle>
                <CardDescription className="text-[#333333]/70 font-['Inter']">{path.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-[#333333]/80 font-['Inter']">
                    <Clock className="w-4 h-4 mr-2 text-[#005A9C]" />
                    <span>{path.duration}</span>
                  </div>
                  <div className="flex items-center text-[#333333]/80 font-['Inter']">
                    <DollarSign className="w-4 h-4 mr-2 text-[#138808]" />
                    <span>{path.averageSalary}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2 text-[#333333] font-['Poppins']">Key Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {path.keySkills.slice(0, 3).map((skill) => (
                      <Badge
                        key={skill}
                        className="text-xs bg-[#138808]/10 text-[#138808] border-[#138808]/20 px-2 py-1 rounded-md"
                      >
                        {skill}
                      </Badge>
                    ))}
                    {path.keySkills.length > 3 && (
                      <Badge className="text-xs bg-gray-100 text-gray-600 border-gray-200 px-2 py-1 rounded-md">
                        +{path.keySkills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <Button
                  className="w-full bg-[#FF9933] hover:bg-[#FF9933]/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                  asChild
                >
                  <Link href={`/career-paths/${path.id}`}>
                    View Career Path <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPaths.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FF9933]/20 to-[#005A9C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#005A9C]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#333333] font-['Poppins']">No careers found</h3>
            <p className="text-[#333333]/70 font-['Inter']">Try adjusting your search terms or category filter</p>
          </div>
        )}

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto border-2 border-[#005A9C]/20 bg-gradient-to-r from-[#FF9933]/5 via-[#005A9C]/5 to-[#138808]/5 shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-white/50">
              <CardTitle className="text-2xl text-[#333333] font-['Poppins']">Need Personalized Guidance?</CardTitle>
              <CardDescription className="text-lg text-[#333333]/80 font-['Inter']">
                Take our aptitude quiz to get career recommendations tailored to your strengths
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Button
                size="lg"
                className="px-8 py-4 bg-[#FF9933] hover:bg-[#FF9933]/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                asChild
              >
                <Link href="/quiz">
                  Take Aptitude Quiz <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
