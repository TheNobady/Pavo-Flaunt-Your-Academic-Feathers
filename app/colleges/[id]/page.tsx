"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, BookOpen, Award, Building, Wifi, Car } from "lucide-react"
import { useRouter, useParams } from "next/navigation"

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
  detailedInfo: {
    overview: string
    campusLife: string[]
    admissionRequirements: string[]
    scholarships: string[]
    contactInfo: {
      phone: string
      email: string
      website: string
      address: string
    }
  }
}

const collegeData: { [key: string]: College } = {
  du: {
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
    detailedInfo: {
      overview:
        "The University of Delhi is one of India's premier institutions of higher learning. Established in 1922, it has grown to become a comprehensive university with 16 faculties, 86 departments, and 91 colleges spread across the city. DU is known for its academic excellence, diverse student body, and vibrant campus life.",
      campusLife: [
        "Active student societies and cultural clubs",
        "Annual cultural festival 'Antardhvani'",
        "Inter-college sports competitions",
        "Regular seminars and guest lectures",
        "Student-run magazines and publications",
        "Community service programs",
      ],
      admissionRequirements: [
        "CUET (UG) for undergraduate programs",
        "CUET (PG) for postgraduate programs",
        "Minimum 50% marks in qualifying examination",
        "Valid category certificate (if applicable)",
        "Medical fitness certificate",
      ],
      scholarships: [
        "Merit-cum-Means Scholarship",
        "SC/ST/OBC Fee Concession",
        "Minority Scholarship Scheme",
        "Sports Scholarship",
        "Need-based Financial Assistance",
      ],
      contactInfo: {
        phone: "+91-11-27666666",
        email: "info@du.ac.in",
        website: "www.du.ac.in",
        address: "University of Delhi, Delhi - 110007",
      },
    },
  },
  jnu: {
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
    detailedInfo: {
      overview:
        "Jawaharlal Nehru University is renowned for its academic excellence and vibrant intellectual environment. Established in 1969, JNU has consistently been ranked among the top universities in India. The university is known for its strong emphasis on research, diverse academic programs, and inclusive campus culture.",
      campusLife: [
        "Active student politics and debates",
        "Cultural diversity with students from across India",
        "Regular film screenings and cultural events",
        "Student-run canteens and cooperative stores",
        "Beautiful campus with peacocks and deer",
        "Strong tradition of social activism",
      ],
      admissionRequirements: [
        "JNUEE (JNU Entrance Examination)",
        "Bachelor's degree for PG programs",
        "Master's degree for M.Phil/Ph.D programs",
        "Minimum qualifying marks as per category",
        "Valid certificates for reservation benefits",
      ],
      scholarships: [
        "UGC Fellowship for research scholars",
        "Merit Scholarship for undergraduate students",
        "Financial assistance for economically weaker sections",
        "International student scholarships",
        "Special scholarships for differently-abled students",
      ],
      contactInfo: {
        phone: "+91-11-26704000",
        email: "registrar@jnu.ac.in",
        website: "www.jnu.ac.in",
        address: "Jawaharlal Nehru University, New Delhi - 110067",
      },
    },
  },
}

const facilityIcons: { [key: string]: any } = {
  Library: BookOpen,
  Hostels: Building,
  "Sports Complex": Award,
  "Medical Center": Building,
  "Wi-Fi Campus": Wifi,
  "Central Library": BookOpen,
  "Health Center": Building,
  "Sports Facilities": Award,
  "Computer Center": Building,
  Parking: Car,
}

export default function CollegeDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [college, setCollege] = useState<College | null>(null)

  useEffect(() => {
    const collegeId = params.id as string
    if (collegeId && collegeData[collegeId]) {
      setCollege(collegeData[collegeId])
    }
  }, [params.id])

  if (!college) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#005A9C] to-[#138808] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <div className="text-lg font-bold">🦚</div>
          </div>
          <p className="text-[#333333]/70 font-['Inter']">Loading college details...</p>
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
                <div className="text-lg font-bold">🦚</div>
              </div>
              <h1 className="text-2xl font-bold text-[#333333] font-['Poppins']">Pavo</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="text-[#005A9C] hover:bg-[#005A9C]/10 rounded-lg font-['Inter']"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Badge className="bg-[#005A9C]/10 text-[#005A9C] border-[#005A9C]/20 px-3 py-1 rounded-full font-medium">
              {college.type}
            </Badge>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-[#FF9933] fill-current" />
              <span className="text-sm font-semibold text-[#333333]">{college.rating}</span>
            </div>
            <Badge className="bg-[#138808]/10 text-[#138808] border-[#138808]/20 px-3 py-1 rounded-full font-medium">
              Rank #{college.ranking}
            </Badge>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-2 font-['Poppins']">{college.name}</h1>
          <p className="text-lg text-[#333333]/80 mb-4 font-['Inter']">
            {college.location}, {college.state}
          </p>
          <p className="text-[#333333]/70 font-['Inter']">Established {college.established}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border-2 border-[#FF9933]/20 shadow-lg">
            <div className="text-2xl font-bold text-[#FF9933] font-['Poppins']">{college.courses.length}+</div>
            <div className="text-sm text-[#333333]/70 font-['Inter']">Courses</div>
          </div>
          <div className="bg-white rounded-xl p-4 border-2 border-[#005A9C]/20 shadow-lg">
            <div className="text-2xl font-bold text-[#005A9C] font-['Poppins']">{college.rating}</div>
            <div className="text-sm text-[#333333]/70 font-['Inter']">Rating</div>
          </div>
          <div className="bg-white rounded-xl p-4 border-2 border-[#138808]/20 shadow-lg">
            <div className="text-2xl font-bold text-[#138808] font-['Poppins']">#{college.ranking}</div>
            <div className="text-sm text-[#333333]/70 font-['Inter']">NIRF Ranking</div>
          </div>
          <div className="bg-white rounded-xl p-4 border-2 border-[#FF9933]/20 shadow-lg">
            <div className="text-2xl font-bold text-[#FF9933] font-['Poppins']">{college.placement.averagePackage}</div>
            <div className="text-sm text-[#333333]/70 font-['Inter']">Avg Package</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-6 border-0 shadow-xl">
              <h2 className="text-xl font-semibold mb-4 text-[#333333] font-['Poppins']">Overview</h2>
              <p className="text-[#333333]/80 leading-relaxed font-['Inter']">{college.detailedInfo.overview}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-0 shadow-xl">
              <h2 className="text-xl font-semibold mb-4 text-[#333333] font-['Poppins']">Courses Offered</h2>
              <div className="flex flex-wrap gap-2">
                {college.courses.map((course, index) => (
                  <Badge
                    key={index}
                    className="bg-[#005A9C]/10 text-[#005A9C] border-[#005A9C]/20 px-3 py-1 rounded-full"
                  >
                    {course}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-0 shadow-xl">
              <h2 className="text-xl font-semibold mb-4 text-[#333333] font-['Poppins']">Facilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {college.facilities.map((facility, index) => {
                  const IconComponent = facilityIcons[facility] || Building
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <IconComponent className="w-5 h-5 text-[#FF9933]" />
                      <span className="text-[#333333]/80 font-['Inter']">{facility}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-0 shadow-xl">
              <h2 className="text-xl font-semibold mb-4 text-[#333333] font-['Poppins']">Campus Life</h2>
              <ul className="space-y-2">
                {college.detailedInfo.campusLife.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#FF9933] rounded-full mt-2 flex-shrink-0" />
                    <span className="text-[#333333]/80 font-['Inter']">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border-0 shadow-xl">
              <h3 className="text-lg font-semibold mb-4 text-[#333333] font-['Poppins']">Admission Information</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 text-[#333333] font-['Poppins']">Entrance Exam</h4>
                  <Badge className="bg-[#005A9C]/10 text-[#005A9C] border-[#005A9C]/20 px-3 py-1 rounded-full">
                    {college.admissionProcess}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-[#333333] font-['Poppins']">Cut-off Percentiles</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#333333]/70 font-['Inter']">General:</span>
                      <span className="font-medium text-[#333333] font-['Poppins']">{college.cutoff.general}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#333333]/70 font-['Inter']">OBC:</span>
                      <span className="font-medium text-[#333333] font-['Poppins']">{college.cutoff.obc}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#333333]/70 font-['Inter']">SC:</span>
                      <span className="font-medium text-[#333333] font-['Poppins']">{college.cutoff.sc}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#333333]/70 font-['Inter']">ST:</span>
                      <span className="font-medium text-[#333333] font-['Poppins']">{college.cutoff.st}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-0 shadow-xl">
              <h3 className="text-lg font-semibold mb-4 text-[#333333] font-['Poppins']">Fee Structure</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-[#333333]/70 font-['Inter']">Undergraduate</div>
                  <div className="font-medium text-[#138808] font-['Poppins']">{college.fees.undergraduate}</div>
                </div>
                <div>
                  <div className="text-sm text-[#333333]/70 font-['Inter']">Postgraduate</div>
                  <div className="font-medium text-[#138808] font-['Poppins']">{college.fees.postgraduate}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-0 shadow-xl">
              <h3 className="text-lg font-semibold mb-4 text-[#333333] font-['Poppins']">Placement Statistics</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-[#333333]/70 font-['Inter']">Average Package</div>
                  <div className="font-medium text-lg text-[#FF9933] font-['Poppins']">
                    {college.placement.averagePackage}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-[#333333]/70 mb-2 font-['Inter']">Top Recruiters</div>
                  <div className="flex flex-wrap gap-1">
                    {college.placement.topRecruiters.map((recruiter, index) => (
                      <Badge
                        key={index}
                        className="text-xs bg-[#138808]/10 text-[#138808] border-[#138808]/20 px-2 py-1 rounded-md"
                      >
                        {recruiter}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-0 shadow-xl">
              <h3 className="text-lg font-semibold mb-4 text-[#333333] font-['Poppins']">Contact Information</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-[#333333]/70 font-['Inter']">Phone</div>
                  <div className="font-medium text-[#333333] font-['Poppins']">
                    {college.detailedInfo.contactInfo.phone}
                  </div>
                </div>
                <div>
                  <div className="text-[#333333]/70 font-['Inter']">Email</div>
                  <div className="font-medium text-[#333333] font-['Poppins']">
                    {college.detailedInfo.contactInfo.email}
                  </div>
                </div>
                <div>
                  <div className="text-[#333333]/70 font-['Inter']">Website</div>
                  <div className="font-medium text-[#005A9C] font-['Poppins']">
                    {college.detailedInfo.contactInfo.website}
                  </div>
                </div>
                <div>
                  <div className="text-[#333333]/70 font-['Inter']">Address</div>
                  <div className="font-medium text-[#333333] font-['Poppins']">
                    {college.detailedInfo.contactInfo.address}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
