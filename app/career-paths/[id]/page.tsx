"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, Clock, DollarSign, TrendingUp, CheckCircle, ChevronRight } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
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
  detailedInfo: {
    overview: string
    dayInLife: string[]
    workEnvironment: string
    challenges: string[]
    rewards: string[]
    futureOutlook: string
  }
}

const careerPathsData: { [key: string]: CareerPath } = {
  "software-engineer": {
    id: "software-engineer",
    title: "Software Engineer",
    category: "Technology",
    description: "Design, develop, and maintain software applications and systems",
    duration: "4 years",
    averageSalary: "₹8-15 LPA",
    demandLevel: "High",
    requiredEducation: ["B.Tech Computer Science", "B.Tech IT", "BCA", "MCA"],
    keySkills: ["Programming", "Problem Solving", "Data Structures", "Algorithms", "Software Design"],
    careerProgression: [
      { level: "Entry", title: "Junior Developer", experience: "0-2 years", salary: "₹3-6 LPA" },
      { level: "Mid", title: "Software Engineer", experience: "2-5 years", salary: "₹6-12 LPA" },
      { level: "Senior", title: "Senior Engineer", experience: "5-8 years", salary: "₹12-20 LPA" },
      { level: "Lead", title: "Tech Lead", experience: "8+ years", salary: "₹20-35 LPA" },
    ],
    relatedCareers: ["Data Scientist", "Product Manager", "DevOps Engineer"],
    detailedInfo: {
      overview:
        "Software engineers are the architects of the digital world. They design, develop, test, and maintain software applications that power everything from mobile apps to enterprise systems. This field offers excellent growth opportunities and the chance to work on cutting-edge technologies.",
      dayInLife: [
        "Review and plan daily tasks with the team",
        "Write and debug code for new features",
        "Participate in code reviews and team meetings",
        "Test applications and fix bugs",
        "Collaborate with designers and product managers",
        "Learn new technologies and frameworks",
      ],
      workEnvironment:
        "Most software engineers work in office environments or remotely. The work involves long hours at a computer, collaborative team projects, and continuous learning to keep up with rapidly evolving technologies.",
      challenges: [
        "Keeping up with rapidly changing technology",
        "Debugging complex technical issues",
        "Meeting tight project deadlines",
        "Balancing technical debt with new features",
      ],
      rewards: [
        "High salary and excellent benefits",
        "Opportunity to create innovative solutions",
        "Flexible work arrangements",
        "Strong job security and growth prospects",
      ],
      futureOutlook:
        "The demand for software engineers continues to grow rapidly with digital transformation across industries. Emerging fields like AI, blockchain, and IoT are creating new opportunities for specialization.",
    },
  },
  doctor: {
    id: "doctor",
    title: "Medical Doctor",
    category: "Healthcare",
    description: "Diagnose and treat patients, promote health and prevent disease",
    duration: "5.5 years + internship",
    averageSalary: "₹10-25 LPA",
    demandLevel: "High",
    requiredEducation: ["MBBS", "MD/MS (Specialization)"],
    keySkills: ["Medical Knowledge", "Patient Care", "Communication", "Critical Thinking", "Empathy"],
    careerProgression: [
      { level: "Entry", title: "Junior Resident", experience: "0-3 years", salary: "₹5-8 LPA" },
      { level: "Mid", title: "Senior Resident", experience: "3-6 years", salary: "₹8-15 LPA" },
      { level: "Senior", title: "Consultant", experience: "6-10 years", salary: "₹15-30 LPA" },
      { level: "Lead", title: "Senior Consultant", experience: "10+ years", salary: "₹30-50 LPA" },
    ],
    relatedCareers: ["Surgeon", "Pediatrician", "Cardiologist"],
    detailedInfo: {
      overview:
        "Medical doctors are healthcare professionals who diagnose, treat, and prevent illnesses and injuries. They play a crucial role in maintaining public health and improving quality of life for patients across all age groups.",
      dayInLife: [
        "Examine patients and review medical histories",
        "Order and interpret diagnostic tests",
        "Develop treatment plans and prescribe medications",
        "Perform medical procedures when necessary",
        "Consult with other healthcare professionals",
        "Maintain detailed patient records",
      ],
      workEnvironment:
        "Doctors work in various settings including hospitals, clinics, private practices, and community health centers. The work can be physically and emotionally demanding, often requiring long hours and being on-call.",
      challenges: [
        "High-stress decision making in critical situations",
        "Long and irregular working hours",
        "Emotional burden of patient care",
        "Continuous medical education requirements",
      ],
      rewards: [
        "Making a direct positive impact on people's lives",
        "High social respect and recognition",
        "Excellent earning potential",
        "Diverse specialization opportunities",
      ],
      futureOutlook:
        "Healthcare demand continues to grow with an aging population and increasing health awareness. Telemedicine and digital health technologies are creating new opportunities for medical practice.",
    },
  },
  // Add more detailed career paths as needed
}

export default function CareerPathDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [careerPath, setCareerPath] = useState<CareerPath | null>(null)

  useEffect(() => {
    const pathId = params.id as string
    if (pathId && careerPathsData[pathId]) {
      setCareerPath(careerPathsData[pathId])
    }
  }, [params.id])

  if (!careerPath) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#005A9C] to-[#138808] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <div className="text-lg font-bold">🦚</div>
          </div>
          <p className="text-[#333333]/70 font-['Inter']">Loading career details...</p>
        </div>
      </div>
    )
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Badge className="bg-[#005A9C]/10 text-[#005A9C] border-[#005A9C]/20 px-3 py-1 rounded-full font-medium">
              {careerPath.category}
            </Badge>
            <Badge className={getDemandColor(careerPath.demandLevel)}>{careerPath.demandLevel} Demand</Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-[#333333] font-['Poppins']">{careerPath.title}</h1>
          <p className="text-xl text-[#333333]/80 mb-6 font-['Inter'] leading-relaxed">{careerPath.description}</p>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-2 border-[#FF9933]/20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 text-[#FF9933] mx-auto mb-2" />
                <div className="font-semibold text-[#333333] font-['Poppins']">Duration</div>
                <div className="text-[#333333]/70 font-['Inter']">{careerPath.duration}</div>
              </CardContent>
            </Card>
            <Card className="border-2 border-[#138808]/20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
              <CardContent className="p-6 text-center">
                <DollarSign className="w-8 h-8 text-[#138808] mx-auto mb-2" />
                <div className="font-semibold text-[#333333] font-['Poppins']">Average Salary</div>
                <div className="text-[#333333]/70 font-['Inter']">{careerPath.averageSalary}</div>
              </CardContent>
            </Card>
            <Card className="border-2 border-[#005A9C]/20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-[#005A9C] mx-auto mb-2" />
                <div className="font-semibold text-[#333333] font-['Poppins']">Job Demand</div>
                <div className="text-[#333333]/70 font-['Inter']">{careerPath.demandLevel}</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mb-8 border-0 shadow-xl bg-white rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#FF9933]/5 via-[#005A9C]/5 to-[#138808]/5">
            <CardTitle className="text-[#333333] font-['Poppins']">Career Overview</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-[#333333]/80 leading-relaxed font-['Inter']">
              {careerPath.detailedInfo?.overview || "Detailed overview coming soon..."}
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8 border-0 shadow-xl bg-white rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#FF9933]/5 via-[#005A9C]/5 to-[#138808]/5">
            <CardTitle className="text-[#333333] font-['Poppins']">Career Progression Path</CardTitle>
            <CardDescription className="text-[#333333]/70 font-['Inter']">
              Typical career advancement timeline and salary growth
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {careerPath.careerProgression.map((stage, index) => (
                <div key={stage.level} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#FF9933] to-[#005A9C] rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-semibold">{index + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-[#333333] font-['Poppins']">{stage.title}</h4>
                        <p className="text-sm text-[#333333]/70 font-['Inter']">{stage.experience}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-[#138808] font-['Poppins']">{stage.salary}</div>
                        <div className="text-sm text-[#333333]/70 font-['Inter']">{stage.level} Level</div>
                      </div>
                    </div>
                  </div>
                  {index < careerPath.careerProgression.length - 1 && (
                    <ChevronRight className="w-5 h-5 text-[#005A9C]" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 border-0 shadow-xl bg-white rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#FF9933]/5 via-[#005A9C]/5 to-[#138808]/5">
            <CardTitle className="text-[#333333] font-['Poppins']">Education Requirements</CardTitle>
            <CardDescription className="text-[#333333]/70 font-['Inter']">
              Qualifications needed to pursue this career
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-[#333333] font-['Poppins']">Required Degrees</h4>
                <div className="space-y-2">
                  {careerPath.requiredEducation.map((education) => (
                    <div key={education} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-[#138808]" />
                      <span className="text-[#333333]/80 font-['Inter']">{education}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-[#333333] font-['Poppins']">Key Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {careerPath.keySkills.map((skill) => (
                    <Badge
                      key={skill}
                      className="bg-[#005A9C]/10 text-[#005A9C] border-[#005A9C]/20 px-3 py-1 rounded-full"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {careerPath.detailedInfo?.dayInLife && (
          <Card className="mb-8 border-0 shadow-xl bg-white rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#FF9933]/5 via-[#005A9C]/5 to-[#138808]/5">
              <CardTitle className="text-lg text-[#333333] font-['Poppins']">A Day in the Life</CardTitle>
              <CardDescription className="text-[#333333]/70 font-['Inter']">
                Typical daily activities and responsibilities
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {careerPath.detailedInfo.dayInLife.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-[#FF9933]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-[#FF9933] font-semibold">{index + 1}</span>
                    </div>
                    <span className="text-sm text-[#333333]/80 font-['Inter']">{activity}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {careerPath.detailedInfo?.challenges && careerPath.detailedInfo?.rewards && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-0 shadow-xl bg-white rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-red-50 to-[#FF9933]/10">
                <CardTitle className="text-lg text-[#333333] font-['Poppins']">Challenges</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  {careerPath.detailedInfo.challenges.map((challenge, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#FF9933] rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-[#333333]/80 font-['Inter']">{challenge}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#138808]/10 to-green-50">
                <CardTitle className="text-lg text-[#333333] font-['Poppins']">Rewards</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  {careerPath.detailedInfo.rewards.map((reward, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#138808] rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-[#333333]/80 font-['Inter']">{reward}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Card className="mb-8 border-0 shadow-xl bg-white rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#FF9933]/5 via-[#005A9C]/5 to-[#138808]/5">
            <CardTitle className="text-[#333333] font-['Poppins']">Related Career Paths</CardTitle>
            <CardDescription className="text-[#333333]/70 font-['Inter']">
              Other careers you might be interested in
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3">
              {careerPath.relatedCareers.map((career) => (
                <Badge
                  key={career}
                  className="px-4 py-2 bg-[#005A9C]/10 text-[#005A9C] border-[#005A9C]/20 rounded-full font-medium hover:bg-[#005A9C]/20 transition-colors"
                >
                  {career}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#005A9C]/20 bg-gradient-to-r from-[#FF9933]/5 via-[#005A9C]/5 to-[#138808]/5 shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-white/50">
            <CardTitle className="text-[#333333] font-['Poppins']">Ready to Start Your Journey?</CardTitle>
            <CardDescription className="text-[#333333]/80 font-['Inter']">
              Take the next steps towards this career path
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-4">
              <Button
                size="lg"
                className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                asChild
              >
                <Link href="/colleges">
                  Find Colleges <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-[#005A9C] text-[#005A9C] hover:bg-[#005A9C] hover:text-white rounded-xl transition-all duration-200 bg-transparent"
                asChild
              >
                <Link href="/scholarships">
                  Explore Scholarships <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
