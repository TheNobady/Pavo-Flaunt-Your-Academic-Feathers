"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, DollarSign, Award, Clock, ExternalLink } from "lucide-react"
import Link from "next/link"

interface Scholarship {
  id: string
  name: string
  provider: string
  amount: string
  type: "Merit-based" | "Need-based" | "Category-specific" | "Sports" | "Arts" | "Research"
  eligibility: string[]
  deadline: string
  description: string
  applicationLink: string
  category: string[]
  requirements: string[]
  benefits: string[]
  isGovernment: boolean
}

const scholarshipTypes = ["All", "Merit-based", "Need-based", "Category-specific", "Sports", "Arts", "Research"]
const categories = [
  "All",
  "Government",
  "Higher Education",
  "School Education",
  "Science",
  "Research",
  "Minority",
  "SC/ST",
  "Girl Child",
  "Sports",
]

export default function ScholarshipsPage() {
  const [scholarshipData, setScholarshipData] = useState<Scholarship[]>([])
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:8080/api/scholarships")
      .then((res) => res.json())
      .then((data) => {
        setScholarshipData(data)
        setScholarships(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching scholarships:", error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    let filtered = scholarshipData

    if (searchTerm) {
      filtered = filtered.filter(
        (scholarship) =>
          scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
          scholarship.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedType !== "All") {
      filtered = filtered.filter((scholarship) => scholarship.type === selectedType)
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((scholarship) => scholarship.category.includes(selectedCategory))
    }

    setScholarships(filtered)
  }, [searchTerm, selectedType, selectedCategory])

  const getDeadlineStatus = (deadline: string) => {
    const deadlineDate = new Date(deadline)
    const today = new Date()
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return { status: "expired", text: "Expired", color: "bg-red-100 text-red-800 border-red-200" }
    if (diffDays <= 7)
      return {
        status: "urgent",
        text: `${diffDays} days left`,
        color: "bg-[#FF9933]/10 text-[#FF9933] border-[#FF9933]/20",
      }
    if (diffDays <= 30)
      return { status: "soon", text: `${diffDays} days left`, color: "bg-yellow-100 text-yellow-800 border-yellow-200" }
    return {
      status: "open",
      text: `${diffDays} days left`,
      color: "bg-[#138808]/10 text-[#138808] border-[#138808]/20",
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
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/dashboard"
                className="text-[#333333]/70 hover:text-[#333333] font-['Inter'] transition-colors"
              >
                Dashboard
              </Link>
              <Link href="/quiz" className="text-[#333333]/70 hover:text-[#333333] font-['Inter'] transition-colors">
                Quiz
              </Link>
              <Link
                href="/career-paths"
                className="text-[#333333]/70 hover:text-[#333333] font-['Inter'] transition-colors"
              >
                Careers
              </Link>
              <Link
                href="/colleges"
                className="text-[#333333]/70 hover:text-[#333333] font-['Inter'] transition-colors"
              >
                Colleges
              </Link>
              <Link href="/scholarships" className="text-[#FF9933] font-medium font-['Inter']">
                Scholarships
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-4 font-['Poppins']">
            Find Your Perfect <span className="text-[#FF9933]">Scholarship</span>
          </h1>
          <p className="text-lg text-[#333333]/80 max-w-2xl mx-auto font-['Inter'] leading-relaxed">
            Discover government and institutional scholarships that match your profile. Get financial support for your
            educational journey.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#333333]/60 w-4 h-4" />
              <Input
                placeholder="Search scholarships by name, provider, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-2 border-gray-200 focus:border-[#FF9933] rounded-xl bg-white shadow-sm font-['Inter']"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="md:w-auto border-2 border-[#005A9C] text-[#005A9C] hover:bg-[#005A9C] hover:text-white rounded-xl transition-all duration-200"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <div className="bg-white rounded-2xl p-6 border-0 shadow-xl mb-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block text-[#333333] font-['Poppins']">
                    Scholarship Type
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 focus:border-[#005A9C] rounded-xl bg-white font-['Inter'] outline-none transition-colors"
                  >
                    {scholarshipTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block text-[#333333] font-['Poppins']">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 focus:border-[#005A9C] rounded-xl bg-white font-['Inter'] outline-none transition-colors"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-6">
          <p className="text-[#333333]/70 font-['Inter']">
            Found <span className="font-semibold text-[#333333]">{scholarships.length}</span> scholarships
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        <div className="grid gap-6">
          {scholarships.map((scholarship) => {
            const deadlineInfo = getDeadlineStatus(scholarship.deadline)

            return (
              <div
                key={scholarship.id}
                className="bg-white rounded-2xl p-6 border-0 shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-y-1"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-[#333333] mb-1 font-['Poppins']">
                          {scholarship.name}
                        </h3>
                        <p className="text-[#333333]/70 font-['Inter']">{scholarship.provider}</p>
                      </div>
                      {scholarship.isGovernment && (
                        <Badge className="bg-[#005A9C]/10 text-[#005A9C] border-[#005A9C]/20 px-3 py-1 rounded-full">
                          Government
                        </Badge>
                      )}
                    </div>

                    <p className="text-[#333333]/80 mb-4 leading-relaxed font-['Inter']">{scholarship.description}</p>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-[#138808]" />
                        <span className="font-semibold text-[#333333] font-['Poppins']">{scholarship.amount}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-[#FF9933]" />
                        <Badge className="bg-[#FF9933]/10 text-[#FF9933] border-[#FF9933]/20 px-3 py-1 rounded-full">
                          {scholarship.type}
                        </Badge>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium mb-2 text-[#333333] font-['Poppins']">Eligibility Criteria:</h4>
                      <ul className="text-sm text-[#333333]/80 space-y-1 font-['Inter']">
                        {scholarship.eligibility.map((criteria, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-[#FF9933] rounded-full mt-2 flex-shrink-0" />
                            <span>{criteria}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {scholarship.category.map((cat, index) => (
                        <Badge
                          key={index}
                          className="text-xs bg-[#005A9C]/10 text-[#005A9C] border-[#005A9C]/20 px-2 py-1 rounded-md"
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="md:w-64 space-y-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Clock className="w-4 h-4 text-[#333333]/60" />
                        <span className="text-sm text-[#333333]/70 font-['Inter']">Deadline</span>
                      </div>
                      <Badge className={`${deadlineInfo.color} px-3 py-1 rounded-full`}>{deadlineInfo.text}</Badge>
                      <p className="text-xs text-[#333333]/70 mt-1 font-['Inter']">
                        {new Date(scholarship.deadline).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Button
                        className="w-full bg-[#FF9933] hover:bg-[#FF9933]/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                        asChild
                      >
                        <a href={scholarship.applicationLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Apply Now
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent border-2 border-[#005A9C] text-[#005A9C] hover:bg-[#005A9C] hover:text-white rounded-xl transition-all duration-200"
                        asChild
                      >
                        <Link href={`/scholarships/${scholarship.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {scholarships.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FF9933]/20 to-[#005A9C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#005A9C]" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[#333333] font-['Poppins']">No scholarships found</h3>
            <p className="text-[#333333]/70 font-['Inter']">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
