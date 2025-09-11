"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, Star, MapPin, Calendar, Award, GraduationCap, Quote, ExternalLink } from "lucide-react"
import Link from "next/link"

interface SuccessStory {
  id: string
  name: string
  currentPosition: string
  company: string
  field: string
  college: string
  graduationYear: number
  location: string
  achievement: string
  story: string
  quote: string
  image?: string
  linkedIn?: string
  achievements: string[]
  journey: {
    phase: string
    description: string
    year: string
  }[]
  advice: string
  tags: string[]
}

const successStories: SuccessStory[] = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    currentPosition: "Senior Software Engineer",
    company: "Google India",
    field: "Technology",
    college: "Delhi College of Engineering (now DTU)",
    graduationYear: 2016,
    location: "Bangalore, Karnataka",
    achievement: "Leading AI/ML projects at Google, Published 15+ research papers",
    story:
      "Coming from a middle-class family in a small town, I never imagined I'd work at Google. DCE gave me the foundation and opportunities to dream big. The faculty supported my research interests, and the diverse peer group taught me collaboration. Today, I lead a team of 20+ engineers working on cutting-edge AI projects.",
    quote: "Government colleges don't limit your dreams - they provide the platform to achieve them.",
    image: "/success-priya-sharma.jpg",
    linkedIn: "https://linkedin.com/in/priya-sharma-google",
    achievements: [
      "Led 5+ major AI/ML projects at Google",
      "Published 15+ research papers in top-tier conferences",
      "Mentored 50+ junior engineers",
      "Speaker at international tech conferences",
      "Patent holder for 3 innovative algorithms",
    ],
    journey: [
      {
        phase: "College Years",
        description: "Focused on computer science fundamentals, participated in coding competitions",
        year: "2012-2016",
      },
      {
        phase: "First Job",
        description: "Started as Software Developer at a startup, learned full-stack development",
        year: "2016-2018",
      },
      {
        phase: "Career Growth",
        description: "Joined Microsoft as SDE-2, specialized in machine learning",
        year: "2018-2020",
      },
      {
        phase: "Google Journey",
        description: "Joined Google as Senior SWE, now leading AI/ML initiatives",
        year: "2020-Present",
      },
    ],
    advice:
      "Focus on building strong fundamentals. Government colleges provide excellent technical education - make the most of it. Participate in competitions, contribute to open source, and never stop learning.",
    tags: ["Technology", "AI/ML", "Google", "Research"],
  },
  {
    id: "2",
    name: "Dr. Rajesh Kumar",
    currentPosition: "Cardiologist & Department Head",
    company: "AIIMS Delhi",
    field: "Medicine",
    college: "Maulana Azad Medical College",
    graduationYear: 2012,
    location: "New Delhi",
    achievement: "Performed 500+ successful cardiac surgeries, Medical research pioneer",
    story:
      "From a government school to MAMC to AIIMS - my journey proves that with determination, anything is possible. MAMC provided world-class medical education and exposure to diverse cases. The rigorous training prepared me for the challenges of modern medicine. Today, I'm proud to serve patients and train the next generation of doctors.",
    quote: "Government medical colleges produce doctors with both skill and compassion.",
    image: "/success-rajesh-kumar.jpg",
    achievements: [
      "Performed 500+ successful cardiac surgeries",
      "Published 25+ medical research papers",
      "Developed innovative surgical techniques",
      "Trained 100+ medical residents",
      "Recipient of National Medical Excellence Award",
    ],
    journey: [
      {
        phase: "Medical College",
        description: "MBBS from MAMC, topped university in final year",
        year: "2006-2012",
      },
      {
        phase: "Residency",
        description: "MD in Internal Medicine from AIIMS, specialized in cardiology",
        year: "2012-2015",
      },
      {
        phase: "Fellowship",
        description: "Advanced cardiac surgery fellowship, international training",
        year: "2015-2017",
      },
      {
        phase: "Leadership Role",
        description: "Appointed as Department Head, leading cardiac care initiatives",
        year: "2017-Present",
      },
    ],
    advice:
      "Medicine is a noble profession that requires dedication and continuous learning. Government medical colleges provide the best clinical exposure. Focus on patient care and never stop updating your knowledge.",
    tags: ["Medicine", "Cardiology", "AIIMS", "Surgery"],
  },
  {
    id: "3",
    name: "CA Meera Patel",
    currentPosition: "Partner & CFO",
    company: "Deloitte India",
    field: "Finance",
    college: "Shri Ram College of Commerce, DU",
    graduationYear: 2014,
    location: "Mumbai, Maharashtra",
    achievement: "Youngest partner at Deloitte India, Financial advisory expert",
    story:
      "SRCC gave me more than just a commerce degree - it gave me confidence and analytical skills. The college's emphasis on practical learning and industry exposure helped me understand real-world finance. Starting from audit associate to becoming the youngest partner, every step taught me something new. Today, I advise Fortune 500 companies on their financial strategies.",
    quote: "Government colleges teach you to work hard and stay grounded - qualities essential for success.",
    image: "/success-meera-patel.jpg",
    achievements: [
      "Youngest partner in Deloitte India's history",
      "Led financial advisory for 50+ major corporations",
      "Expert in mergers and acquisitions",
      "Recognized as 'CFO of the Year' by Business Today",
      "Mentor to 200+ CA aspirants",
    ],
    journey: [
      {
        phase: "College Foundation",
        description: "B.Com (Hons) from SRCC, active in finance society and competitions",
        year: "2011-2014",
      },
      {
        phase: "CA Articleship",
        description: "Completed CA while working at a Big 4 firm, gained practical experience",
        year: "2014-2017",
      },
      {
        phase: "Rapid Growth",
        description: "Promoted to Manager, then Senior Manager in record time",
        year: "2017-2020",
      },
      {
        phase: "Partnership",
        description: "Became youngest partner, now leading major client relationships",
        year: "2020-Present",
      },
    ],
    advice:
      "Commerce education from government colleges is world-class. Focus on practical applications, internships, and building professional networks. The CA qualification combined with strong college foundation opens unlimited opportunities.",
    tags: ["Finance", "CA", "Deloitte", "Advisory"],
  },
  {
    id: "4",
    name: "IAS Amit Singh",
    currentPosition: "District Collector",
    company: "Government of India",
    field: "Civil Services",
    college: "Jawaharlal Nehru University",
    graduationYear: 2015,
    location: "Lucknow, Uttar Pradesh",
    achievement: "Cracked UPSC in first attempt, Implementing rural development programs",
    story:
      "JNU shaped my understanding of governance and public policy. The diverse academic environment and quality faculty prepared me for the UPSC challenge. Cracking the exam in my first attempt was just the beginning - the real work started when I joined the service. Today, I'm working on grassroots development and making a real difference in people's lives.",
    quote: "Government colleges instill a sense of public service and social responsibility.",
    image: "/success-amit-singh.jpg",
    achievements: [
      "Cracked UPSC CSE in first attempt (Rank 47)",
      "Implemented successful rural development programs",
      "Digitized government services in the district",
      "Reduced corruption through transparent processes",
      "Recognized for disaster management excellence",
    ],
    journey: [
      {
        phase: "Academic Excellence",
        description: "MA in Political Science from JNU, active in student politics",
        year: "2013-2015",
      },
      {
        phase: "UPSC Preparation",
        description: "Dedicated 1 year to UPSC preparation, cracked in first attempt",
        year: "2015-2016",
      },
      {
        phase: "Training Period",
        description: "Foundation course at LBSNAA, specialized training in administration",
        year: "2016-2018",
      },
      {
        phase: "Field Posting",
        description: "Posted as District Collector, implementing development programs",
        year: "2018-Present",
      },
    ],
    advice:
      "Civil services is about serving the nation. Government colleges provide the right perspective on social issues and governance. Stay connected with ground realities and never lose sight of your purpose to serve.",
    tags: ["Civil Services", "IAS", "UPSC", "Governance"],
  },
  {
    id: "5",
    name: "Er. Sunita Reddy",
    currentPosition: "Project Director",
    company: "L&T Construction",
    field: "Engineering",
    college: "NIT Warangal",
    graduationYear: 2013,
    location: "Hyderabad, Telangana",
    achievement: "Leading India's largest infrastructure projects, Women in Engineering advocate",
    story:
      "NIT Warangal gave me technical excellence and the confidence to work in a male-dominated field. The rigorous curriculum and hands-on projects prepared me for real-world challenges. Starting as a site engineer, I've now led projects worth thousands of crores. I'm passionate about encouraging more women to join engineering and breaking stereotypes.",
    quote: "Government engineering colleges produce industry-ready professionals with strong ethical values.",
    image: "/success-sunita-reddy.jpg",
    achievements: [
      "Led construction of 10+ major infrastructure projects",
      "Managed projects worth ₹5000+ crores",
      "First woman Project Director in company history",
      "Advocate for women in engineering",
      "Recipient of 'Engineer of the Year' award",
    ],
    journey: [
      {
        phase: "Engineering Foundation",
        description: "B.Tech in Civil Engineering from NIT Warangal, topped the batch",
        year: "2009-2013",
      },
      {
        phase: "Site Experience",
        description: "Started as site engineer, gained hands-on construction experience",
        year: "2013-2016",
      },
      {
        phase: "Project Management",
        description: "Promoted to project manager, handled multiple concurrent projects",
        year: "2016-2019",
      },
      {
        phase: "Leadership Role",
        description: "Became Project Director, leading major infrastructure initiatives",
        year: "2019-Present",
      },
    ],
    advice:
      "Engineering is about solving real-world problems. Government colleges provide excellent technical foundation. Don't be afraid to take on challenging projects and always prioritize safety and quality.",
    tags: ["Engineering", "Infrastructure", "Construction", "Leadership"],
  },
  {
    id: "6",
    name: "Dr. Arjun Nair",
    currentPosition: "Senior Scientist",
    company: "ISRO",
    field: "Space Technology",
    college: "IISc Bangalore",
    graduationYear: 2017,
    location: "Bangalore, Karnataka",
    achievement: "Key contributor to Chandrayaan-3 mission, Space technology innovator",
    story:
      "IISc provided the perfect environment for research and innovation. The world-class faculty and cutting-edge facilities helped me develop expertise in space technology. Being part of India's space missions has been incredibly fulfilling. From satellite design to mission planning, every day brings new challenges and opportunities to contribute to India's space program.",
    quote: "Government research institutions are at the forefront of India's technological advancement.",
    image: "/success-arjun-nair.jpg",
    achievements: [
      "Key contributor to Chandrayaan-3 mission success",
      "Designed critical satellite components",
      "Published 20+ research papers in space technology",
      "Holds 5 patents in satellite technology",
      "Recipient of ISRO Young Scientist Award",
    ],
    journey: [
      {
        phase: "Research Foundation",
        description: "PhD in Aerospace Engineering from IISc, specialized in satellite systems",
        year: "2014-2017",
      },
      {
        phase: "ISRO Entry",
        description: "Joined ISRO as Scientist, worked on satellite design projects",
        year: "2017-2019",
      },
      {
        phase: "Mission Involvement",
        description: "Became part of lunar mission team, contributed to Chandrayaan-3",
        year: "2019-2022",
      },
      {
        phase: "Senior Role",
        description: "Promoted to Senior Scientist, leading next-generation space projects",
        year: "2022-Present",
      },
    ],
    advice:
      "Space technology requires strong fundamentals and innovative thinking. Government research institutions offer unparalleled opportunities. Stay curious, collaborate with peers, and never stop pushing the boundaries of what's possible.",
    tags: ["Space Technology", "ISRO", "Research", "Innovation"],
  },
]

export default function SuccessStoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedField, setSelectedField] = useState("all")
  const [selectedCollege, setSelectedCollege] = useState("all")

  const filteredStories = successStories.filter((story) => {
    const matchesSearch =
      story.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.college.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesField = selectedField === "all" || story.field.toLowerCase().includes(selectedField.toLowerCase())
    const matchesCollege =
      selectedCollege === "all" || story.college.toLowerCase().includes(selectedCollege.toLowerCase())

    return matchesSearch && matchesField && matchesCollege
  })

  const fields = [...new Set(successStories.map((story) => story.field))]
  const colleges = [...new Set(successStories.map((story) => story.college))]

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
                <Award className="w-6 h-6 text-primary" />
                <h1 className="text-xl font-bold">Success Stories</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">Success Stories</span> from Government Colleges
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get inspired by achievers who started their journey from government colleges and reached great heights in
            their careers
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, field, or company..."
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

              <Select value={selectedCollege} onValueChange={setSelectedCollege}>
                <SelectTrigger>
                  <SelectValue placeholder="All Colleges" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Colleges</SelectItem>
                  {colleges.map((college) => (
                    <SelectItem key={college} value={college}>
                      {college}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredStories.length} success stor{filteredStories.length !== 1 ? "ies" : "y"}
          </p>
        </div>

        {/* Success Stories Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredStories.map((story) => (
            <Card key={story.id} className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-0">
                {/* Story Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={story.image || "/placeholder.svg"} alt={story.name} />
                      <AvatarFallback className="text-lg">
                        {story.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{story.name}</h3>
                      <p className="text-lg text-primary font-medium mb-1">{story.currentPosition}</p>
                      <p className="text-muted-foreground mb-2">{story.company}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <GraduationCap className="w-4 h-4" />
                          <span>{story.college}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Class of {story.graduationYear}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="px-6 pb-4">
                  <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
                    <Quote className="w-5 h-5 text-primary mb-2" />
                    <p className="text-muted-foreground italic">"{story.quote}"</p>
                  </div>
                </div>

                {/* Tabs for detailed information */}
                <div className="px-6 pb-6">
                  <Tabs defaultValue="story" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="story">Story</TabsTrigger>
                      <TabsTrigger value="journey">Journey</TabsTrigger>
                      <TabsTrigger value="achievements">Achievements</TabsTrigger>
                    </TabsList>

                    <TabsContent value="story" className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Their Story</h4>
                        <p className="text-muted-foreground leading-relaxed">{story.story}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Advice for Students</h4>
                        <p className="text-muted-foreground leading-relaxed">{story.advice}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {story.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="journey" className="space-y-4">
                      <h4 className="font-semibold mb-3">Career Journey</h4>
                      <div className="space-y-4">
                        {story.journey.map((phase, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-primary text-sm font-bold">{index + 1}</span>
                            </div>
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <p className="font-medium">{phase.phase}</p>
                                <Badge variant="outline" className="text-xs">
                                  {phase.year}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{phase.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="achievements" className="space-y-4">
                      <h4 className="font-semibold mb-3">Key Achievements</h4>
                      <div className="space-y-2">
                        {story.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <p className="text-sm">{achievement}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{story.location}</span>
                        </div>
                        {story.linkedIn && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={story.linkedIn} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-1" />
                              LinkedIn
                            </a>
                          </Button>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStories.length === 0 && (
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No success stories found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
          </div>
        )}

        {/* Statistics Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-center">Success by the Numbers</CardTitle>
            <CardDescription className="text-center">
              Achievements of our government college alumni across different fields
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Success Stories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Government Colleges</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">25+</div>
                <div className="text-sm text-muted-foreground">Career Fields</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Career Satisfaction</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="mt-8 border-2 border-primary/20 bg-primary/5">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Your Success Story Awaits</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              These achievers started their journey just like you. With determination, hard work, and the right
              guidance, you can write your own success story. Start your journey with Pavo today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/quiz">Take Aptitude Quiz</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent" asChild>
                <Link href="/mentorship">Find a Mentor</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
