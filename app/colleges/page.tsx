"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ArrowRight, Search, MapPin, Star, Users, Filter, Target } from "lucide-react"
import Link from "next/link"

interface College {
  id: string
  name: string
  location: string
  state: string
  type: "Central University" | "State University" | "Deemed University" | "Government College"
  established: number
  ranking: number
  rating: number
  courses: string[]
  fees: {
    undergraduate: string
    postgraduate: string
  }
  facilities: string[]
  admissionProcess: string
  cutoff: {
    general: number
    obc: number
    sc: number
    st: number
  }
  placement: {
    averagePackage: string
    topRecruiters: string[]
  }
  distance?: number
}

const states = ["All States", "Delhi", "Uttar Pradesh", "West Bengal", "Tamil Nadu", "Maharashtra", "Karnataka"]
const collegeTypes = ["All Types", "Central University", "State University", "Deemed University", "Government College"]
const courses = ["All Courses", "B.A.", "B.Sc.", "B.Tech", "B.Com", "MBBS", "M.A.", "M.Sc.", "M.Tech", "MBA"]

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedState, setSelectedState] = useState("All States")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedCourse, setSelectedCourse] = useState("All Courses")
  const [filteredColleges, setFilteredColleges] = useState<College[]>([])
  const [userLocation, setUserLocation] = useState<string>("")
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("ranking")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/colleges`)
      .then((res) => res.json())
      .then((data) => {
        setColleges(data)
        setFilteredColleges(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching colleges:", error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    // Get user location from onboarding data
    const userData = localStorage.getItem("pavoUserData")
    if (userData) {
      const parsed = JSON.parse(userData)
      setUserLocation(parsed.location || "")
    }
  }, [])

  useEffect(() => {
    let filtered = colleges

    // Apply filters
    if (selectedState !== "All States") {
      filtered = filtered.filter((college) => college.state === selectedState)
    }

    if (selectedType !== "All Types") {
      filtered = filtered.filter((college) => college.type === selectedType)
    }

    if (selectedCourse !== "All Courses") {
      filtered = filtered.filter((college) => college.courses.includes(selectedCourse))
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (college) =>
          college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          college.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          college.courses.some((course) => course.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Sort colleges
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "ranking":
          return a.ranking - b.ranking
        case "rating":
          return b.rating - a.rating
        case "fees":
          return (
            Number.parseInt(a.fees.undergraduate.split("-")[0].replace(/[₹,]/g, "")) -
            Number.parseInt(b.fees.undergraduate.split("-")[0].replace(/[₹,]/g, ""))
          )
        case "established":
          return b.established - a.established
        default:
          return a.ranking - b.ranking
      }
    })

    setFilteredColleges(filtered)
  }, [searchTerm, selectedState, selectedType, selectedCourse, sortBy])

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <header className="border-b backdrop-blur-sm sticky top-0 z-50 bg-white/90 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#005A9C] to-[#138808] rounded-xl flex items-center justify-center shadow-lg">
                <div className="text-white text-lg font-bold">🦚</div>
              </div>
              <h1 className="text-2xl font-bold text-[#333333] font-['Poppins']">Pavo</h1>
            </div>
            <Badge className="bg-[#FF9933]/10 text-[#FF9933] border-[#FF9933]/20 px-4 py-2 rounded-full font-medium">
              College Directory
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-[#333333] font-['Poppins']">
            Find Your Perfect <span className="text-[#FF9933]">Government College</span>
          </h1>
          <p className="text-xl text-[#333333]/80 max-w-2xl mx-auto font-['Inter'] leading-relaxed">
            Discover top government colleges across India with detailed information about courses, fees, and admissions
          </p>
          {userLocation && (
            <p className="text-sm text-[#333333]/70 mt-2 font-['Inter']">
              Showing colleges near <span className="font-semibold text-[#005A9C]">{userLocation}</span>
            </p>
          )}
        </div>

        {userLocation && (
          <div className="mb-8">
            <Card className="border-2 border-[#005A9C]/20 bg-gradient-to-r from-[#FF9933]/5 via-[#005A9C]/5 to-[#138808]/5 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-white/50">
                <CardTitle className="flex items-center text-[#333333] font-['Poppins']">
                  <Target className="w-5 h-5 mr-2 text-[#FF9933]" />
                  Recommended Near You
                </CardTitle>
                <CardDescription className="text-[#333333]/80 font-['Inter']">
                  Top government colleges in and around {userLocation}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredColleges.slice(0, 3).map((college) => (
                    <Card
                      key={college.id}
                      className="border-2 border-[#005A9C]/30 hover:border-[#FF9933]/50 transition-all duration-200 hover:shadow-lg bg-white rounded-xl"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <Badge className="bg-[#138808]/10 text-[#138808] border-[#138808]/20 px-3 py-1 rounded-full">
                            Near You
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-[#FF9933] fill-current" />
                            <span className="text-sm font-semibold text-[#333333]">{college.rating}</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg text-[#333333] font-['Poppins']">{college.name}</CardTitle>
                        <CardDescription className="flex items-center text-sm text-[#333333]/70 font-['Inter']">
                          <MapPin className="w-3 h-3 mr-1 text-[#005A9C]" />
                          {college.location}, {college.state}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-[#333333]/70 font-['Inter']">Ranking:</span>
                            <span className="font-semibold text-[#005A9C] font-['Poppins']">#{college.ranking}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#333333]/70 font-['Inter']">UG Fees:</span>
                            <span className="font-semibold text-[#138808] font-['Poppins']">
                              {college.fees.undergraduate}
                            </span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="w-full mt-3 bg-[#FF9933] hover:bg-[#FF9933]/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                          asChild
                        >
                          <Link href={`/colleges/${college.id}`}>
                            View Details <ArrowRight className="ml-2 w-3 h-3" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="space-y-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#333333]/60 w-4 h-4" />
              <Input
                placeholder="Search colleges, locations, or courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-2 border-gray-200 focus:border-[#FF9933] rounded-xl bg-white shadow-sm font-['Inter']"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 border-2 border-[#005A9C] text-[#005A9C] hover:bg-[#005A9C] hover:text-white rounded-xl transition-all duration-200"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </Button>
          </div>

          {showFilters && (
            <Card className="border-0 shadow-xl bg-white rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[#333333] font-['Poppins'] font-medium">State</Label>
                    <Select value={selectedState} onValueChange={setSelectedState}>
                      <SelectTrigger className="border-2 border-gray-200 focus:border-[#005A9C] rounded-lg bg-white font-['Inter']">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-2 border-gray-200 bg-white shadow-lg">
                        {states.map((state) => (
                          <SelectItem key={state} value={state} className="font-['Inter'] hover:bg-[#FF9933]/5">
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#333333] font-['Poppins'] font-medium">College Type</Label>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="border-2 border-gray-200 focus:border-[#005A9C] rounded-lg bg-white font-['Inter']">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-2 border-gray-200 bg-white shadow-lg">
                        {collegeTypes.map((type) => (
                          <SelectItem key={type} value={type} className="font-['Inter'] hover:bg-[#FF9933]/5">
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#333333] font-['Poppins'] font-medium">Course</Label>
                    <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                      <SelectTrigger className="border-2 border-gray-200 focus:border-[#005A9C] rounded-lg bg-white font-['Inter']">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-2 border-gray-200 bg-white shadow-lg">
                        {courses.map((course) => (
                          <SelectItem key={course} value={course} className="font-['Inter'] hover:bg-[#FF9933]/5">
                            {course}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#333333] font-['Poppins'] font-medium">Sort By</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="border-2 border-gray-200 focus:border-[#005A9C] rounded-lg bg-white font-['Inter']">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-2 border-gray-200 bg-white shadow-lg">
                        <SelectItem value="ranking" className="font-['Inter'] hover:bg-[#FF9933]/5">
                          Ranking
                        </SelectItem>
                        <SelectItem value="rating" className="font-['Inter'] hover:bg-[#FF9933]/5">
                          Rating
                        </SelectItem>
                        <SelectItem value="fees" className="font-['Inter'] hover:bg-[#FF9933]/5">
                          Fees (Low to High)
                        </SelectItem>
                        <SelectItem value="established" className="font-['Inter'] hover:bg-[#FF9933]/5">
                          Established Year
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-[#333333]/70 font-['Inter']">
            Showing {filteredColleges.length} colleges
            {selectedState !== "All States" && ` in ${selectedState}`}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColleges.map((college) => (
            <Card
              key={college.id}
              className="border-2 border-gray-200 hover:border-[#FF9933]/50 transition-all duration-200 hover:shadow-xl bg-white rounded-xl overflow-hidden"
            >
              <CardHeader className="bg-gradient-to-r from-[#FF9933]/5 via-[#005A9C]/5 to-[#138808]/5">
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-[#005A9C]/10 text-[#005A9C] border-[#005A9C]/20 px-3 py-1 rounded-full font-medium">
                    {college.type}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-[#FF9933] fill-current" />
                    <span className="text-sm font-semibold text-[#333333]">{college.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-xl text-[#333333] font-['Poppins']">{college.name}</CardTitle>
                <CardDescription className="flex items-center text-[#333333]/70 font-['Inter']">
                  <MapPin className="w-4 h-4 mr-1 text-[#005A9C]" />
                  {college.location}, {college.state}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-[#333333]/70 font-['Inter']">Ranking:</span>
                    <div className="font-semibold text-[#005A9C] font-['Poppins']">#{college.ranking}</div>
                  </div>
                  <div>
                    <span className="text-[#333333]/70 font-['Inter']">Established:</span>
                    <div className="font-semibold text-[#333333] font-['Poppins']">{college.established}</div>
                  </div>
                </div>

                <div>
                  <span className="text-sm text-[#333333]/70 font-['Inter']">UG Fees:</span>
                  <div className="font-semibold text-[#138808] font-['Poppins']">{college.fees.undergraduate}</div>
                </div>

                <div>
                  <span className="text-sm text-[#333333]/70 mb-2 block font-['Inter']">Popular Courses:</span>
                  <div className="flex flex-wrap gap-1">
                    {college.courses.slice(0, 4).map((course) => (
                      <Badge
                        key={course}
                        className="text-xs bg-[#138808]/10 text-[#138808] border-[#138808]/20 px-2 py-1 rounded-md"
                      >
                        {course}
                      </Badge>
                    ))}
                    {college.courses.length > 4 && (
                      <Badge className="text-xs bg-gray-100 text-gray-600 border-gray-200 px-2 py-1 rounded-md">
                        +{college.courses.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-[#333333]/70">
                  <span className="flex items-center font-['Inter']">
                    <Users className="w-4 h-4 mr-1 text-[#005A9C]" />
                    {college.admissionProcess}
                  </span>
                </div>

                <Button
                  className="w-full bg-[#FF9933] hover:bg-[#FF9933]/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                  asChild
                >
                  <Link href={`/colleges/${college.id}`}>
                    View Details <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredColleges.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FF9933]/20 to-[#005A9C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#005A9C]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#333333] font-['Poppins']">No colleges found</h3>
            <p className="text-[#333333]/70 font-['Inter']">Try adjusting your search terms or filters</p>
          </div>
        )}

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto border-2 border-[#005A9C]/20 bg-gradient-to-r from-[#FF9933]/5 via-[#005A9C]/5 to-[#138808]/5 shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-white/50">
              <CardTitle className="text-2xl text-[#333333] font-['Poppins']">Need Help Choosing?</CardTitle>
              <CardDescription className="text-lg text-[#333333]/80 font-['Inter']">
                Take our aptitude quiz to get personalized college recommendations
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
