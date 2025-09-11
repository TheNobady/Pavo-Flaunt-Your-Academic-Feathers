"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  Award,
  BookOpen,
  MapPin,
  Sparkles,
  Target,
  TrendingUp,
  User,
  CheckCircle,
  Heart,
  DollarSign,
  Calendar,
  AlertCircle,
  Users,
  GraduationCap,
  FileText,
  Phone,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface ChildData {
  name: string
  age: string
  class: string
  school: string
  interests: string[]
  strengths: string[]
  goals: string[]
  quizCompleted: boolean
  quizScore: number
  recommendedStreams: string[]
  location: string
}

interface ParentData {
  name: string
  relationship: string
  phone: string
  email: string
  child: ChildData
}

export default function ParentDashboardPage() {
  const router = useRouter()
  const [parentData, setParentData] = useState<ParentData | null>(null)

  useEffect(() => {
    // Mock parent data - in real app, this would come from API
    const mockParentData: ParentData = {
      name: "Mrs. Sunita Sharma",
      relationship: "Mother",
      phone: "+91 98765 43210",
      email: "sunita.sharma@email.com",
      child: {
        name: "Arjun Sharma",
        age: "17",
        class: "12th Science",
        school: "Government Senior Secondary School, Delhi",
        interests: ["Technology", "Mathematics", "Physics"],
        strengths: ["Problem Solving", "Analytical Thinking", "Leadership"],
        goals: ["Engineering", "IIT Preparation", "Software Development"],
        quizCompleted: true,
        quizScore: 85,
        recommendedStreams: ["Computer Science Engineering", "Electronics Engineering", "Information Technology"],
        location: "New Delhi",
      },
    }
    setParentData(mockParentData)
  }, [])

  if (!parentData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-5 h-5 text-primary-foreground animate-spin" />
          </div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const { child } = parentData

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">Pavo</h1>
                <p className="text-xs text-muted-foreground">Parent Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="hidden sm:flex">
                Parent Account
              </Badge>
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4 mr-2" />
                {parentData.name}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {parentData.name}!</h1>
          <p className="text-muted-foreground text-lg">
            Track {child.name}'s academic journey and discover the best opportunities for their future
          </p>
        </div>

        {/* Child Overview Card */}
        <Card className="mb-8 border-2 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="w-6 h-6 mr-2 text-primary" />
              {child.name}'s Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{child.age}</p>
                <p className="text-sm text-muted-foreground">Years Old</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold">{child.class}</p>
                <p className="text-sm text-muted-foreground">Current Class</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold">{child.quizScore}%</p>
                <p className="text-sm text-muted-foreground">Aptitude Score</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold">{child.goals.length}</p>
                <p className="text-sm text-muted-foreground">Career Goals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="guidance">Guidance</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Target className="w-5 h-5 mr-2 text-primary" />
                    Strengths & Interests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium mb-2">Top Interests:</p>
                      <div className="flex flex-wrap gap-1">
                        {child.interests.map((interest, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Key Strengths:</p>
                      <div className="flex flex-wrap gap-1">
                        {child.strengths.map((strength, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                    Recommended Paths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {child.recommendedStreams.slice(0, 3).map((stream, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-primary/5 rounded">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">{stream}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-3" asChild>
                    <Link href="/career-paths">
                      View All Paths <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
                    Action Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">College Applications</span>
                      <Badge variant="secondary">Pending</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">Scholarship Forms</span>
                      <Badge variant="outline">2 Available</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">Entrance Exam Prep</span>
                      <Badge className="bg-green-100 text-green-800">On Track</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-primary/5 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Completed Aptitude Quiz</p>
                      <p className="text-sm text-muted-foreground">Scored 85% - Excellent performance!</p>
                    </div>
                    <span className="text-xs text-muted-foreground ml-auto">2 days ago</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Explored Career Pathways</p>
                      <p className="text-sm text-muted-foreground">Viewed Computer Science Engineering path</p>
                    </div>
                    <span className="text-xs text-muted-foreground ml-auto">5 days ago</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Connected with Mentor</p>
                      <p className="text-sm text-muted-foreground">Booked session with Dr. Priya Sharma</p>
                    </div>
                    <span className="text-xs text-muted-foreground ml-auto">1 week ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Progress</CardTitle>
                  <CardDescription>Track your child's learning journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Profile Completion</span>
                      <span className="text-sm text-muted-foreground">90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Career Exploration</span>
                      <span className="text-sm text-muted-foreground">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">College Research</span>
                      <span className="text-sm text-muted-foreground">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Scholarship Applications</span>
                      <span className="text-sm text-muted-foreground">40%</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Milestones and accomplishments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <Award className="w-6 h-6 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">Quiz Champion</p>
                        <p className="text-sm text-green-600">Scored 85% in aptitude assessment</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <Target className="w-6 h-6 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-800">Goal Setter</p>
                        <p className="text-sm text-blue-600">Defined clear career objectives</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <Users className="w-6 h-6 text-purple-600" />
                      <div>
                        <p className="font-medium text-purple-800">Mentor Connect</p>
                        <p className="text-sm text-purple-600">Successfully connected with industry expert</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                    Nearby Colleges
                  </CardTitle>
                  <CardDescription>Government colleges in {child.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium">Delhi Technological University</p>
                      <p className="text-sm text-muted-foreground">Engineering • 15 km away</p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="secondary">Government</Badge>
                        <Button size="sm" variant="ghost">
                          View Details
                        </Button>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium">Netaji Subhas University</p>
                      <p className="text-sm text-muted-foreground">Technology • 12 km away</p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="secondary">Government</Badge>
                        <Button size="sm" variant="ghost">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
                    <Link href="/colleges">
                      View All Colleges <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-primary" />
                    Scholarship Opportunities
                  </CardTitle>
                  <CardDescription>Financial aid for your child's education</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium">Merit Scholarship 2024</p>
                      <p className="text-sm text-muted-foreground">Up to ₹50,000 per year</p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge className="bg-orange-100 text-orange-800">Deadline: 15 days</Badge>
                        <Button size="sm" variant="ghost">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium">SC/ST Scholarship</p>
                      <p className="text-sm text-muted-foreground">Full tuition coverage</p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="outline">Deadline: 30 days</Badge>
                        <Button size="sm" variant="ghost">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
                    <Link href="/scholarships">
                      View All Scholarships <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="guidance" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Understanding Your Child's Results</CardTitle>
                  <CardDescription>Simple explanations of aptitude and career recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h4 className="font-medium mb-2">What does 85% aptitude score mean?</h4>
                    <p className="text-sm text-muted-foreground">
                      Your child scored in the top 15% of students, showing excellent analytical and problem-solving
                      abilities. This indicates strong potential for technical fields like engineering and computer
                      science.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium mb-2">Why Computer Science Engineering?</h4>
                    <p className="text-sm text-muted-foreground">
                      Based on their interests in technology and mathematics, plus strong logical reasoning skills,
                      computer science offers excellent career prospects with high demand in the job market.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>How You Can Help</CardTitle>
                  <CardDescription>Practical ways to support your child's journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Encourage Exploration</p>
                        <p className="text-sm text-muted-foreground">
                          Support their interest in technology by providing coding resources
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Visit Colleges Together</p>
                        <p className="text-sm text-muted-foreground">Plan visits to recommended engineering colleges</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Connect with Alumni</p>
                        <p className="text-sm text-muted-foreground">
                          Arrange meetings with successful engineers from your network
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Monitor Application Deadlines</p>
                        <p className="text-sm text-muted-foreground">
                          Help track important dates for college and scholarship applications
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-primary" />
                    Parent Resources
                  </CardTitle>
                  <CardDescription>Helpful guides and information for parents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="ghost" className="w-full justify-start h-auto p-3 text-left">
                      <div>
                        <p className="font-medium">Understanding Engineering Careers</p>
                        <p className="text-sm text-muted-foreground">
                          Complete guide to engineering fields and opportunities
                        </p>
                      </div>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start h-auto p-3 text-left">
                      <div>
                        <p className="font-medium">College Admission Process</p>
                        <p className="text-sm text-muted-foreground">
                          Step-by-step guide to government college admissions
                        </p>
                      </div>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start h-auto p-3 text-left">
                      <div>
                        <p className="font-medium">Financial Planning for Education</p>
                        <p className="text-sm text-muted-foreground">Budgeting and scholarship strategies</p>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-primary" />
                    Support & Contact
                  </CardTitle>
                  <CardDescription>Get help when you need it</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium">Parent Helpline</p>
                      <p className="text-sm text-muted-foreground">1800-123-PAVO (7286)</p>
                      <p className="text-xs text-muted-foreground">Mon-Fri, 9 AM - 6 PM</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-muted-foreground">parents@pavo.edu.in</p>
                      <p className="text-xs text-muted-foreground">Response within 24 hours</p>
                    </div>
                    <Button className="w-full">Schedule Parent Counseling Session</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium mb-2">How accurate are the career recommendations?</p>
                    <p className="text-sm text-muted-foreground">
                      Our recommendations are based on scientifically validated aptitude assessments and current
                      industry trends. They provide a strong foundation, but should be combined with your child's
                      personal interests and family discussions.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium mb-2">What if my child wants to pursue a different field?</p>
                    <p className="text-sm text-muted-foreground">
                      The recommendations are guidance, not restrictions. We encourage exploring all interests. Our
                      platform provides information on various career paths to help make informed decisions.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium mb-2">How can I track my child's progress?</p>
                    <p className="text-sm text-muted-foreground">
                      This dashboard provides real-time updates on your child's activities, quiz results, college
                      research, and application progress. You'll receive weekly summary emails as well.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
