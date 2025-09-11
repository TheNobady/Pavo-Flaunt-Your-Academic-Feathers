"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Search, Star, MapPin, Calendar, MessageCircle, Video, Users } from "lucide-react"
import Link from "next/link"

interface Mentor {
  id: string
  name: string
  title: string
  company: string
  field: string
  experience: number
  rating: number
  reviews: number
  location: string
  languages: string[]
  expertise: string[]
  education: string
  bio: string
  availability: "available" | "busy" | "offline"
  sessionTypes: ("chat" | "video" | "group")[]
  price: number
  image?: string
}

const mentors: Mentor[] = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    title: "Senior Software Engineer",
    company: "Google India",
    field: "Computer Science",
    experience: 8,
    rating: 4.9,
    reviews: 127,
    location: "Bangalore, Karnataka",
    languages: ["English", "Hindi", "Kannada"],
    expertise: ["Software Development", "Data Structures", "System Design", "Career Guidance"],
    education: "IIT Delhi - B.Tech CSE, Stanford - MS CS",
    bio: "Passionate about helping students navigate their tech careers. Started from a government college and now working at Google.",
    availability: "available",
    sessionTypes: ["chat", "video", "group"],
    price: 500,
    image: "/indian-woman-software-engineer.jpg",
  },
  {
    id: "2",
    name: "Dr. Rajesh Kumar",
    title: "Cardiologist",
    company: "AIIMS Delhi",
    field: "Medicine",
    experience: 12,
    rating: 4.8,
    reviews: 89,
    location: "New Delhi",
    languages: ["English", "Hindi", "Punjabi"],
    expertise: ["Medical Career Guidance", "NEET Preparation", "Residency Planning"],
    education: "AIIMS Delhi - MBBS, MD Cardiology",
    bio: "Helping aspiring doctors achieve their dreams. Specializing in guiding students through medical entrance exams and career planning.",
    availability: "busy",
    sessionTypes: ["chat", "video"],
    price: 800,
    image: "/indian-male-doctor.jpg",
  },
  {
    id: "3",
    name: "CA Meera Patel",
    title: "Chartered Accountant",
    company: "Deloitte India",
    field: "Finance & Accounting",
    experience: 6,
    rating: 4.7,
    reviews: 156,
    location: "Mumbai, Maharashtra",
    languages: ["English", "Hindi", "Gujarati"],
    expertise: ["CA Preparation", "Finance Career", "Audit", "Taxation"],
    education: "Mumbai University - B.Com, ICAI - CA",
    bio: "From a small town government college to Big 4 consulting. Here to guide commerce students in their journey.",
    availability: "available",
    sessionTypes: ["chat", "video", "group"],
    price: 400,
    image: "/indian-woman-chartered-accountant.jpg",
  },
  {
    id: "4",
    name: "Prof. Amit Singh",
    title: "IAS Officer",
    company: "Government of India",
    field: "Civil Services",
    experience: 15,
    rating: 4.9,
    reviews: 203,
    location: "New Delhi",
    languages: ["English", "Hindi", "Urdu"],
    expertise: ["UPSC Preparation", "Public Administration", "Policy Making", "Leadership"],
    education: "JNU Delhi - MA Political Science",
    bio: "Cracked UPSC in first attempt from a government college. Passionate about guiding future civil servants.",
    availability: "available",
    sessionTypes: ["chat", "video", "group"],
    price: 1000,
    image: "/indian-male-ias-officer.jpg",
  },
  {
    id: "5",
    name: "Er. Sunita Reddy",
    title: "Civil Engineer",
    company: "L&T Construction",
    field: "Civil Engineering",
    experience: 10,
    rating: 4.6,
    reviews: 78,
    location: "Hyderabad, Telangana",
    languages: ["English", "Hindi", "Telugu"],
    expertise: ["Civil Engineering", "Construction Management", "Project Planning"],
    education: "NIT Warangal - B.Tech Civil Engineering",
    bio: "Leading major infrastructure projects across India. Helping engineering students build successful careers.",
    availability: "available",
    sessionTypes: ["chat", "video"],
    price: 600,
    image: "/indian-woman-civil-engineer.jpg",
  },
  {
    id: "6",
    name: "Dr. Arjun Nair",
    title: "Research Scientist",
    company: "ISRO",
    field: "Space Technology",
    experience: 9,
    rating: 4.8,
    reviews: 92,
    location: "Bangalore, Karnataka",
    languages: ["English", "Hindi", "Malayalam"],
    expertise: ["Space Technology", "Research", "Physics", "Aerospace Engineering"],
    education: "IISc Bangalore - PhD Physics",
    bio: "Working on India's space missions. Passionate about inspiring students to pursue careers in space technology and research.",
    availability: "busy",
    sessionTypes: ["chat", "video", "group"],
    price: 700,
    image: "/indian-male-space-scientist.jpg",
  },
]

export default function MentorshipPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedField, setSelectedField] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedAvailability, setSelectedAvailability] = useState("all")

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise.some((exp) => exp.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesField = selectedField === "all" || mentor.field.toLowerCase().includes(selectedField.toLowerCase())
    const matchesLocation =
      selectedLocation === "all" || mentor.location.toLowerCase().includes(selectedLocation.toLowerCase())
    const matchesAvailability = selectedAvailability === "all" || mentor.availability === selectedAvailability

    return matchesSearch && matchesField && matchesLocation && matchesAvailability
  })

  const fields = [...new Set(mentors.map((mentor) => mentor.field))]
  const locations = [...new Set(mentors.map((mentor) => mentor.location.split(",")[1]?.trim() || mentor.location))]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <Users className="w-6 h-6 text-primary" />
                <h1 className="text-xl font-bold">Find Mentors</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Connect with <span className="text-primary">Expert Mentors</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get personalized guidance from successful professionals and alumni who started their journey from government
            colleges
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search mentors, fields, expertise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedField} onValueChange={setSelectedField}>
                <SelectTrigger>
                  <SelectValue placeholder="All Fields" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fields</SelectItem>
                  {fields.map((field) => (
                    <SelectItem key={field} value={field}>
                      {field}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                <SelectTrigger>
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredMentors.length} mentor{filteredMentors.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <Card key={mentor.id} className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={mentor.image || "/placeholder.svg"} alt={mentor.name} />
                      <AvatarFallback>
                        {mentor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{mentor.name}</h3>
                      <p className="text-sm text-muted-foreground">{mentor.title}</p>
                      <p className="text-sm font-medium text-primary">{mentor.company}</p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      mentor.availability === "available"
                        ? "default"
                        : mentor.availability === "busy"
                          ? "secondary"
                          : "outline"
                    }
                    className={mentor.availability === "available" ? "bg-green-100 text-green-800" : ""}
                  >
                    {mentor.availability}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{mentor.rating}</span>
                    <span className="text-muted-foreground">({mentor.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{mentor.location.split(",")[0]}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Expertise:</p>
                  <div className="flex flex-wrap gap-1">
                    {mentor.expertise.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {mentor.expertise.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{mentor.expertise.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Languages:</p>
                  <p className="text-sm">{mentor.languages.join(", ")}</p>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">Session Types:</span>
                    <div className="flex space-x-1">
                      {mentor.sessionTypes.includes("chat") && <MessageCircle className="w-4 h-4 text-primary" />}
                      {mentor.sessionTypes.includes("video") && <Video className="w-4 h-4 text-primary" />}
                      {mentor.sessionTypes.includes("group") && <Users className="w-4 h-4 text-primary" />}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-primary">₹{mentor.price}</span>
                      <span className="text-sm text-muted-foreground">/session</span>
                    </div>
                    <Button size="sm" disabled={mentor.availability === "offline"} asChild>
                      <Link href={`/mentorship/${mentor.id}`}>
                        {mentor.availability === "available" ? "Book Session" : "View Profile"}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMentors.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No mentors found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
          </div>
        )}

        {/* How it Works Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-center">How Mentorship Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">1. Find Your Mentor</h3>
                <p className="text-sm text-muted-foreground">
                  Browse through our verified mentors and find the perfect match for your career goals
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">2. Book a Session</h3>
                <p className="text-sm text-muted-foreground">
                  Choose from chat, video call, or group sessions based on your preference and budget
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">3. Get Guidance</h3>
                <p className="text-sm text-muted-foreground">
                  Receive personalized advice, career planning, and ongoing support from industry experts
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
