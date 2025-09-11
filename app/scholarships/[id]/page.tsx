"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Sparkles,
  Calendar,
  DollarSign,
  Users,
  Award,
  ExternalLink,
  CheckCircle,
  FileText,
  AlertCircle,
} from "lucide-react"
import { useRouter, useParams } from "next/navigation"

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
  detailedInfo: {
    overview: string
    applicationProcess: string[]
    selectionCriteria: string[]
    renewalConditions: string[]
    contactInfo: {
      phone: string
      email: string
      website: string
      address: string
    }
  }
}

const scholarshipData: { [key: string]: Scholarship } = {
  "pm-scholarship": {
    id: "pm-scholarship",
    name: "PM Scholarship Scheme",
    provider: "Government of India",
    amount: "₹2,500/month",
    type: "Merit-based",
    eligibility: ["Class 12 passed with 85%+", "Family income < ₹6 lakh", "Indian citizen"],
    deadline: "2024-12-31",
    description: "Scholarship for meritorious students from economically weaker sections to pursue higher education.",
    applicationLink: "https://scholarships.gov.in",
    category: ["Government", "Higher Education"],
    requirements: ["Income certificate", "Mark sheets", "Caste certificate (if applicable)"],
    benefits: ["Monthly stipend", "Fee reimbursement", "Book allowance"],
    isGovernment: true,
    detailedInfo: {
      overview:
        "The Prime Minister's Scholarship Scheme is designed to encourage higher education among students from economically weaker sections of society. This merit-cum-means scholarship provides financial assistance to deserving students who have demonstrated academic excellence but lack the financial resources to pursue higher education.",
      applicationProcess: [
        "Register on the National Scholarship Portal",
        "Fill the online application form with accurate details",
        "Upload required documents in prescribed format",
        "Submit the application before the deadline",
        "Track application status through the portal",
        "Attend verification process if selected",
      ],
      selectionCriteria: [
        "Academic merit (minimum 85% in Class 12)",
        "Family income verification",
        "Document verification",
        "Priority given to first-generation learners",
        "State-wise quota allocation",
      ],
      renewalConditions: [
        "Maintain minimum 75% attendance",
        "Secure at least 60% marks in annual examinations",
        "Submit renewal application annually",
        "No change in family income status",
        "Continue in the same course",
      ],
      contactInfo: {
        phone: "+91-11-23381611",
        email: "pmscholarship@gov.in",
        website: "https://scholarships.gov.in",
        address: "Ministry of Education, Shastri Bhawan, New Delhi - 110001",
      },
    },
  },
  "inspire-scholarship": {
    id: "inspire-scholarship",
    name: "INSPIRE Scholarship",
    provider: "Department of Science & Technology",
    amount: "₹80,000/year",
    type: "Merit-based",
    eligibility: ["Top 1% in Class 12", "Pursuing Science stream", "Age < 27 years"],
    deadline: "2024-11-15",
    description: "Scholarship to attract talented students to pursue science education and research.",
    applicationLink: "https://online-inspire.gov.in",
    category: ["Science", "Research", "Government"],
    requirements: ["Class 12 certificate", "Admission proof", "Bank details"],
    benefits: ["Annual scholarship", "Research opportunities", "Mentorship"],
    isGovernment: true,
    detailedInfo: {
      overview:
        "The INSPIRE (Innovation in Science Pursuit for Inspired Research) Scholarship is a flagship program of the Department of Science & Technology to attract talented youth to science education and research. It aims to build the required critical human resource pool for strengthening and expanding the science & technology system and R&D base.",
      applicationProcess: [
        "Check eligibility criteria carefully",
        "Register on INSPIRE online portal",
        "Fill application with academic details",
        "Upload Class 12 marksheet and certificates",
        "Provide college admission details",
        "Submit bank account information",
        "Track application status online",
      ],
      selectionCriteria: [
        "Top 1% students in Class 12 board examinations",
        "Must be pursuing Basic/Natural Sciences",
        "Age limit of 27 years",
        "Indian nationality required",
        "Merit-based selection process",
      ],
      renewalConditions: [
        "Maintain good academic performance",
        "Continue in science stream",
        "Submit annual progress reports",
        "Participate in INSPIRE camps/programs",
        "No change in course without approval",
      ],
      contactInfo: {
        phone: "+91-11-26590271",
        email: "inspire@dst.gov.in",
        website: "https://online-inspire.gov.in",
        address: "Department of Science & Technology, Technology Bhawan, New Delhi - 110016",
      },
    },
  },
}

export default function ScholarshipDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [scholarship, setScholarship] = useState<Scholarship | null>(null)

  useEffect(() => {
    const scholarshipId = params.id as string
    if (scholarshipId && scholarshipData[scholarshipId]) {
      setScholarship(scholarshipData[scholarshipId])
    }
  }, [params.id])

  if (!scholarship) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-5 h-5 text-primary-foreground animate-spin" />
          </div>
          <p className="text-muted-foreground">Loading scholarship details...</p>
        </div>
      </div>
    )
  }

  const getDeadlineStatus = (deadline: string) => {
    const deadlineDate = new Date(deadline)
    const today = new Date()
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return { status: "expired", text: "Expired", color: "bg-red-100 text-red-800" }
    if (diffDays <= 7)
      return { status: "urgent", text: `${diffDays} days left`, color: "bg-orange-100 text-orange-800" }
    if (diffDays <= 30) return { status: "soon", text: `${diffDays} days left`, color: "bg-yellow-100 text-yellow-800" }
    return { status: "open", text: `${diffDays} days left`, color: "bg-green-100 text-green-800" }
  }

  const deadlineInfo = getDeadlineStatus(scholarship.deadline)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-primary">Pavo</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Badge variant="outline">{scholarship.type}</Badge>
            {scholarship.isGovernment && <Badge className="bg-blue-100 text-blue-800">Government</Badge>}
            <Badge className={deadlineInfo.color}>{deadlineInfo.text}</Badge>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{scholarship.name}</h1>
          <p className="text-lg text-muted-foreground mb-4">{scholarship.provider}</p>
          <p className="text-muted-foreground leading-relaxed">{scholarship.description}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Amount</span>
            </div>
            <div className="text-xl font-bold text-primary">{scholarship.amount}</div>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Deadline</span>
            </div>
            <div className="text-sm font-semibold">{new Date(scholarship.deadline).toLocaleDateString()}</div>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Type</span>
            </div>
            <div className="text-sm font-semibold">{scholarship.type}</div>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Categories</span>
            </div>
            <div className="text-sm font-semibold">{scholarship.category.length}</div>
          </div>
        </div>

        {/* Apply Now Section */}
        <div className="bg-primary/5 rounded-lg p-6 border border-primary/20 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Ready to Apply?</h3>
              <p className="text-muted-foreground">Don't miss this opportunity. Apply before the deadline.</p>
            </div>
            <Button size="lg" asChild>
              <a href={scholarship.applicationLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Apply Now
              </a>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="bg-card rounded-lg p-6 border">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{scholarship.detailedInfo.overview}</p>
            </div>

            {/* Application Process */}
            <div className="bg-card rounded-lg p-6 border">
              <h2 className="text-xl font-semibold mb-4">Application Process</h2>
              <div className="space-y-4">
                {scholarship.detailedInfo.applicationProcess.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-semibold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Selection Criteria */}
            <div className="bg-card rounded-lg p-6 border">
              <h2 className="text-xl font-semibold mb-4">Selection Criteria</h2>
              <ul className="space-y-2">
                {scholarship.detailedInfo.selectionCriteria.map((criteria, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{criteria}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Renewal Conditions */}
            <div className="bg-card rounded-lg p-6 border">
              <h2 className="text-xl font-semibold mb-4">Renewal Conditions</h2>
              <ul className="space-y-2">
                {scholarship.detailedInfo.renewalConditions.map((condition, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{condition}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Eligibility */}
            <div className="bg-card rounded-lg p-6 border">
              <h3 className="text-lg font-semibold mb-4">Eligibility Criteria</h3>
              <ul className="space-y-2">
                {scholarship.eligibility.map((criteria, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{criteria}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Documents */}
            <div className="bg-card rounded-lg p-6 border">
              <h3 className="text-lg font-semibold mb-4">Required Documents</h3>
              <ul className="space-y-2">
                {scholarship.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <FileText className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-card rounded-lg p-6 border">
              <h3 className="text-lg font-semibold mb-4">Benefits</h3>
              <ul className="space-y-2">
                {scholarship.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Award className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className="bg-card rounded-lg p-6 border">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {scholarship.category.map((cat, index) => (
                  <Badge key={index} variant="secondary">
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-card rounded-lg p-6 border">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-muted-foreground">Phone</div>
                  <div className="font-medium">{scholarship.detailedInfo.contactInfo.phone}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Email</div>
                  <div className="font-medium">{scholarship.detailedInfo.contactInfo.email}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Website</div>
                  <div className="font-medium text-primary">{scholarship.detailedInfo.contactInfo.website}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Address</div>
                  <div className="font-medium">{scholarship.detailedInfo.contactInfo.address}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
