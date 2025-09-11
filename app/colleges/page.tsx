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

const colleges: College[] = [
  {
    id: "du",
    name: "University of Delhi",
    location: "New Delhi",
    state: "Delhi",
    type: "Central University",
    established: 1922,
    ranking: 12,
    rating: 4.2,
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc.", "M.Com", "Ph.D."],
    fees: {
      undergraduate: "₹15,000 - ₹25,000",
      postgraduate: "₹20,000 - ₹35,000",
    },
    facilities: ["Library", "Hostels", "Sports Complex", "Medical Center", "Wi-Fi Campus"],
    admissionProcess: "CUET (UG/PG)",
    cutoff: {
      general: 95,
      obc: 92,
      sc: 88,
      st: 85,
    },
    placement: {
      averagePackage: "₹6-8 LPA",
      topRecruiters: ["TCS", "Infosys", "Deloitte", "KPMG"],
    },
  },
  {
    id: "jnu",
    name: "Jawaharlal Nehru University",
    location: "New Delhi",
    state: "Delhi",
    type: "Central University",
    established: 1969,
    ranking: 8,
    rating: 4.5,
    courses: ["B.A.", "M.A.", "M.Phil.", "Ph.D.", "M.Sc.", "M.Tech"],
    fees: {
      undergraduate: "₹5,000 - ₹15,000",
      postgraduate: "₹10,000 - ₹25,000",
    },
    facilities: ["Central Library", "Hostels", "Health Center", "Sports Facilities", "Computer Center"],
    admissionProcess: "JNUEE",
    cutoff: {
      general: 92,
      obc: 89,
      sc: 85,
      st: 82,
    },
    placement: {
      averagePackage: "₹7-10 LPA",
      topRecruiters: ["Civil Services", "Research Institutes", "NGOs", "Media Houses"],
    },
  },
  {
    id: "bhu",
    name: "Banaras Hindu University",
    location: "Varanasi",
    state: "Uttar Pradesh",
    type: "Central University",
    established: 1916,
    ranking: 15,
    rating: 4.1,
    courses: ["B.A.", "B.Sc.", "B.Tech", "MBBS", "M.A.", "M.Sc.", "M.Tech"],
    fees: {
      undergraduate: "₹8,000 - ₹20,000",
      postgraduate: "₹12,000 - ₹30,000",
    },
    facilities: ["Vishwanath Temple", "Central Library", "Hostels", "Hospital", "Sports Complex"],
    admissionProcess: "BHU UET/PET",
    cutoff: {
      general: 88,
      obc: 85,
      sc: 80,
      st: 75,
    },
    placement: {
      averagePackage: "₹5-8 LPA",
      topRecruiters: ["TCS", "Wipro", "Government Sectors", "Healthcare"],
    },
  },
  {
    id: "jamia",
    name: "Jamia Millia Islamia",
    location: "New Delhi",
    state: "Delhi",
    type: "Central University",
    established: 1920,
    ranking: 18,
    rating: 4.0,
    courses: ["B.A.", "B.Tech", "B.Arch", "MBA", "M.A.", "M.Tech"],
    fees: {
      undergraduate: "₹10,000 - ₹25,000",
      postgraduate: "₹15,000 - ₹35,000",
    },
    facilities: ["Dr. A.P.J. Abdul Kalam Library", "Hostels", "Medical Center", "Sports Complex"],
    admissionProcess: "JMI Entrance Test",
    cutoff: {
      general: 85,
      obc: 82,
      sc: 78,
      st: 75,
    },
    placement: {
      averagePackage: "₹6-9 LPA",
      topRecruiters: ["Infosys", "TCS", "Media Companies", "Government"],
    },
  },
  {
    id: "presidency-kolkata",
    name: "Presidency University",
    location: "Kolkata",
    state: "West Bengal",
    type: "State University",
    established: 1817,
    ranking: 25,
    rating: 4.3,
    courses: ["B.A.", "B.Sc.", "M.A.", "M.Sc.", "Ph.D."],
    fees: {
      undergraduate: "₹5,000 - ₹15,000",
      postgraduate: "₹8,000 - ₹20,000",
    },
    facilities: ["Heritage Library", "Hostels", "Laboratories", "Auditorium"],
    admissionProcess: "Merit Based + Entrance",
    cutoff: {
      general: 90,
      obc: 87,
      sc: 83,
      st: 80,
    },
    placement: {
      averagePackage: "₹5-7 LPA",
      topRecruiters: ["Research Institutes", "Banks", "Civil Services", "Academia"],
    },
  },
  {
    id: "loyola-chennai",
    name: "Loyola College",
    location: "Chennai",
    state: "Tamil Nadu",
    type: "Government College",
    established: 1925,
    ranking: 30,
    rating: 4.2,
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc.", "M.Com"],
    fees: {
      undergraduate: "₹8,000 - ₹18,000",
      postgraduate: "₹12,000 - ₹25,000",
    },
    facilities: ["Library", "Hostels", "Sports Complex", "Computer Labs", "Chapel"],
    admissionProcess: "Merit Based",
    cutoff: {
      general: 87,
      obc: 84,
      sc: 80,
      st: 77,
    },
    placement: {
      averagePackage: "₹4-6 LPA",
      topRecruiters: ["TCS", "Cognizant", "Banks", "Government"],
    },
  },
]

const states = ["All States", "Delhi", "Uttar Pradesh", "West Bengal", "Tamil Nadu", "Maharashtra", "Karnataka"]
const collegeTypes = ["All Types", "Central University", "State University", "Deemed University", "Government College"]
const courses = ["All Courses", "B.A.", "B.Sc.", "B.Tech", "B.Com", "MBBS", "M.A.", "M.Sc.", "M.Tech", "MBA"]

export default function CollegesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedState, setSelectedState] = useState("All States")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedCourse, setSelectedCourse] = useState("All Courses")
  const [filteredColleges, setFilteredColleges] = useState(colleges)
  const [userLocation, setUserLocation] = useState<string>("")
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("ranking")

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
