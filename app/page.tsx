import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Award,
  MapPin,
  Sparkles,
  Target,
  TrendingUp,
  User,
  Library,
  Play,
  Star,
  BookOpen,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Header */}
      <header className="border-b backdrop-blur-sm sticky top-0 z-50 bg-white/90 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FF9933] to-[#005A9C] rounded-xl flex items-center justify-center shadow-lg">
                <div className="text-[#333333] text-lg font-bold drop-shadow-sm">🦚</div>
              </div>
              <h1 className="text-2xl font-bold text-[#333333] font-['Poppins']">Pavo</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-[#333333] hover:text-[#005A9C] transition-colors font-medium">
                Features
              </a>
              <a href="#about" className="text-[#333333] hover:text-[#005A9C] transition-colors font-medium">
                About
              </a>
              <a href="#contact" className="text-[#333333] hover:text-[#005A9C] transition-colors font-medium">
                Contact
              </a>
              <Button
                className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                asChild
              >
                <Link href="/onboarding">Get Started</Link>
              </Button>
            </nav>
            {/* Mobile Menu */}
            <div className="md:hidden">
              <Button
                className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white font-semibold px-4 py-2 rounded-lg"
                size="sm"
                asChild
              >
                <Link href="/onboarding">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-white to-[#F7F7F7]">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-left lg:text-left">
              <Badge className="mb-6 bg-[#005A9C] text-white border-[#005A9C] px-4 py-2 rounded-full font-medium shadow-lg animate-pulse">
                AI-Powered Career Mentor ✨
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance text-[#333333] font-['Poppins'] leading-tight">
                Clouded by Confusion? <br />
                <span className="text-[#E6851F] bg-gradient-to-r from-[#FF9933] to-[#E6851F] bg-clip-text text-transparent animate-pulse">
                  Let's Find Your Path
                </span>
              </h1>
              <p className="text-xl mb-8 text-pretty max-w-2xl text-[#333333]/80 font-['Inter'] leading-relaxed">
                Discover your perfect career path with personalized AI guidance, tailored for Class 10/12 students
                across India. Let Pavo be your trusted companion in this journey. 🌟
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-lg px-8 py-4 bg-[#FF9933] hover:bg-[#E6851F] text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0"
                  style={{ backgroundColor: "#FF9933" }}
                  asChild
                >
                  <Link href="/onboarding">
                    Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 border-2 border-[#005A9C] text-[#005A9C] hover:bg-[#005A9C] hover:text-white rounded-xl transition-all duration-300 hover:scale-110 bg-transparent shadow-md hover:shadow-lg"
                  asChild
                >
                  <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
                    <Play className="mr-2 w-5 h-5" /> Watch Demo
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF9933]/30 to-[#005A9C]/30 rounded-3xl blur-3xl animate-pulse"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-[#FF9933]/20">
                  <div className="text-8xl animate-bounce mx-auto mb-6 w-fit">🦚</div>
                  <div className="flex justify-center space-x-2 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FF9933] to-[#E6851F] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-[#138808] to-[#0F5A06] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-[#005A9C] to-[#003D7A] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-center text-[#333333] font-medium text-lg">Flaunt Your Academic Feathers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#333333] font-['Poppins']">
              How Pavo <span className="text-[#FF9933]">Guides You</span>
            </h2>
            <p className="text-xl text-[#333333]/80 font-['Inter']">
              Three simple steps to discover your perfect career path
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-[#FF9933] via-[#005A9C] to-[#138808]"></div>

            <div className="text-center relative">
              <div className="w-16 h-16 bg-[#FF9933] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#333333] font-['Poppins']">Chat with Pavo</h3>
              <p className="text-[#333333]/80 font-['Inter']">
                Share your interests, dreams, and concerns with our AI mentor
              </p>
            </div>

            <div className="text-center relative">
              <div className="w-16 h-16 bg-[#005A9C] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#333333] font-['Poppins']">Take Smart Assessments</h3>
              <p className="text-[#333333]/80 font-['Inter']">
                Complete personalized quizzes designed for your grade level
              </p>
            </div>

            <div className="text-center relative">
              <div className="w-16 h-16 bg-[#138808] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#333333] font-['Poppins']">Get Your Roadmap</h3>
              <p className="text-[#333333]/80 font-['Inter']">
                Receive a detailed plan with colleges, courses, and career paths
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gradient-to-br from-[#F7F7F7] via-white to-[#F7F7F7]">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#333333] font-['Poppins']">
              Everything You Need for{" "}
              <span className="text-[#E6851F] bg-gradient-to-r from-[#FF9933] to-[#E6851F] bg-clip-text text-transparent">
                Academic Success
              </span>
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-[#333333]/80 font-['Inter']">
              Comprehensive tools and resources to guide your educational journey ✨
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-[#FF9933]/5 rounded-xl overflow-hidden group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#FF9933]/20 to-[#FF9933]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Target className="w-7 h-7 text-[#FF9933]" />
                </div>
                <CardTitle className="text-[#333333] font-['Poppins']">Aptitude Quiz</CardTitle>
                <CardDescription className="text-[#333333]/70 font-['Inter']">
                  Discover your strengths and get personalized stream recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="ghost"
                  className="w-full justify-between hover:bg-[#FF9933]/5 text-[#005A9C] hover:text-[#FF9933] rounded-lg"
                  asChild
                >
                  <Link href="/quiz">
                    Take Quiz <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-[#FF9933]/5 rounded-xl overflow-hidden group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#005A9C]/20 to-[#005A9C]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Library className="w-7 h-7 text-[#005A9C]" />
                </div>
                <CardTitle className="text-[#333333] font-['Poppins']">E-Books Library</CardTitle>
                <CardDescription className="text-[#333333]/70 font-['Inter']">
                  Access textbooks with interactive modules and earn rewards for learning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs bg-[#138808]/20 text-[#0F5A06]">
                    10 Free
                  </Badge>
                  <Badge variant="outline" className="text-xs border-[#005A9C]/20 text-[#005A9C]">
                    4 Levels
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-between hover:bg-[#005A9C]/5 text-[#005A9C] hover:text-[#FF9933] rounded-lg"
                  asChild
                >
                  <Link href="/ebooks">
                    Browse Books <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-[#FF9933]/5 rounded-xl overflow-hidden group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#138808]/20 to-[#138808]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-7 h-7 text-[#138808]" />
                </div>
                <CardTitle className="text-[#333333] font-['Poppins']">Career Pathways</CardTitle>
                <CardDescription className="text-[#333333]/70 font-['Inter']">
                  Visual roadmaps showing progression from courses to dream careers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="ghost"
                  className="w-full justify-between hover:bg-[#138808]/5 text-[#005A9C] hover:text-[#FF9933] rounded-lg"
                  asChild
                >
                  <Link href="/career-paths">
                    Explore Paths <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-[#FF9933]/5 rounded-xl overflow-hidden group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#FF9933]/20 to-[#FF9933]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="w-7 h-7 text-[#FF9933]" />
                </div>
                <CardTitle className="text-[#333333] font-['Poppins']">College Directory</CardTitle>
                <CardDescription className="text-[#333333]/70 font-['Inter']">
                  Find nearby government colleges with detailed information and filters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="ghost"
                  className="w-full justify-between hover:bg-[#FF9933]/5 text-[#005A9C] hover:text-[#FF9933] rounded-lg"
                  asChild
                >
                  <Link href="/colleges">
                    Find Colleges <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-[#FF9933]/5 rounded-xl overflow-hidden group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#005A9C]/20 to-[#005A9C]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-7 h-7 text-[#005A9C]" />
                </div>
                <CardTitle className="text-[#333333] font-['Poppins']">Scholarships</CardTitle>
                <CardDescription className="text-[#333333]/70 font-['Inter']">
                  Discover financial aid opportunities with deadline reminders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="ghost"
                  className="w-full justify-between hover:bg-[#005A9C]/5 text-[#005A9C] hover:text-[#FF9933] rounded-lg"
                  asChild
                >
                  <Link href="/scholarships">
                    View Scholarships <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-[#FF9933]/5 rounded-xl overflow-hidden group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#138808]/20 to-[#138808]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <User className="w-7 h-7 text-[#138808]" />
                </div>
                <CardTitle className="text-[#333333] font-['Poppins']">Student Community</CardTitle>
                <CardDescription className="text-[#333333]/70 font-['Inter']">
                  Connect with peers from your stream and get support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="ghost"
                  className="w-full justify-between hover:bg-[#138808]/5 text-[#005A9C] hover:text-[#FF9933] rounded-lg"
                  asChild
                >
                  <Link href="/community">
                    Join Community <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-[#FF9933]/5 rounded-xl overflow-hidden group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#FF9933]/20 to-[#FF9933]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-7 h-7 text-[#FF9933]" />
                </div>
                <CardTitle className="text-[#333333] font-['Poppins']">AI Career Counselor</CardTitle>
                <CardDescription className="text-[#333333]/70 font-['Inter']">
                  Get instant multilingual guidance for your career questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="ghost"
                  className="w-full justify-between hover:bg-[#FF9933]/5 text-[#005A9C] hover:text-[#FF9933] rounded-lg"
                  asChild
                >
                  <Link href="/chatbot">
                    Chat Now <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#333333] font-['Poppins']">
              What Students <span className="text-[#FF9933]">Say About Pavo</span>
            </h2>
            <p className="text-xl text-[#333333]/80 font-['Inter']">Real stories from students who found their path</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-[#F7F7F7] rounded-xl p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#FF9933] fill-current" />
                ))}
              </div>
              <blockquote className="text-lg mb-4 text-[#333333] font-['Inter'] italic">
                "Pavo helped me choose the right stream after 10th. Now I'm confident about my engineering path!"
              </blockquote>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#005A9C] rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">A</span>
                </div>
                <div>
                  <p className="font-semibold text-[#333333]">Arjun Sharma</p>
                  <p className="text-sm text-[#333333]/70">Srinagar, J&K</p>
                </div>
              </div>
            </Card>

            <Card className="border-0 shadow-lg bg-[#F7F7F7] rounded-xl p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#FF9933] fill-current" />
                ))}
              </div>
              <blockquote className="text-lg mb-4 text-[#333333] font-['Inter'] italic">
                "The scholarship finder feature saved my family thousands. Thank you Pavo!"
              </blockquote>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#138808] rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">P</span>
                </div>
                <div>
                  <p className="font-semibold text-[#333333]">Priya Patel</p>
                  <p className="text-sm text-[#333333]/70">Ahmedabad, Gujarat</p>
                </div>
              </div>
            </Card>

            <Card className="border-0 shadow-lg bg-[#F7F7F7] rounded-xl p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#FF9933] fill-current" />
                ))}
              </div>
              <blockquote className="text-lg mb-4 text-[#333333] font-['Inter'] italic">
                "The AI counselor understood my concerns better than anyone. Highly recommend!"
              </blockquote>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#FF9933] rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">R</span>
                </div>
                <div>
                  <p className="font-semibold text-[#333333]">Rahul Kumar</p>
                  <p className="text-sm text-[#333333]/70">Patna, Bihar</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#FF9933]/5 via-[#005A9C]/5 to-[#138808]/5">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-[#FF9933] mb-2 font-['Poppins']">10,000+</div>
              <div className="font-medium text-[#333333] font-['Inter']">Students Guided</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-[#005A9C] mb-2 font-['Poppins']">500+</div>
              <div className="font-medium text-[#333333] font-['Inter']">Government Colleges</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-[#138808] mb-2 font-['Poppins']">200+</div>
              <div className="font-medium text-[#333333] font-['Inter']">Scholarship Programs</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-[#FF9933] mb-2 font-['Poppins']">150+</div>
              <div className="font-medium text-[#333333] font-['Inter']">Interactive E-Books</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#F7F7F7]">
        <div className="container mx-auto text-center">
          <Card className="max-w-3xl mx-auto border-0 shadow-2xl bg-white rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#FF9933]/10 via-[#005A9C]/10 to-[#138808]/10 pb-8">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white text-3xl">🦚</span>
              </div>
              <CardTitle className="text-3xl md:text-4xl text-[#333333] font-['Poppins'] mb-4">
                Ready to Spread Your Wings?
              </CardTitle>
              <CardDescription className="text-lg text-[#333333]/80 font-['Inter'] max-w-2xl mx-auto">
                Join thousands of students who have found their perfect academic path with Pavo. Your journey to success
                starts here.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8 pb-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="text-lg px-8 py-4 bg-[#FF9933] hover:bg-[#FF9933]/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                  asChild
                >
                  <Link href="/onboarding">
                    Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 border-2 border-[#005A9C] text-[#005A9C] hover:bg-[#005A9C] hover:text-white rounded-xl transition-all duration-200 bg-transparent"
                  asChild
                >
                  <Link href="/dashboard">View Dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#138808] py-12 px-4 text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <div className="text-white text-lg">🦚</div>
                </div>
                <h3 className="text-2xl font-bold font-['Poppins']">Pavo</h3>
              </div>
              <p className="text-white/80 font-['Inter'] leading-relaxed">
                Empowering students to make informed academic decisions and achieve their career goals across India.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg font-['Poppins']">Features</h4>
              <ul className="space-y-3 text-white/80 font-['Inter']">
                <li>
                  <Link href="/quiz" className="hover:text-white transition-colors">
                    Aptitude Quiz
                  </Link>
                </li>
                <li>
                  <Link href="/ebooks" className="hover:text-white transition-colors">
                    E-Books Library
                  </Link>
                </li>
                <li>
                  <Link href="/career-paths" className="hover:text-white transition-colors">
                    Career Pathways
                  </Link>
                </li>
                <li>
                  <Link href="/colleges" className="hover:text-white transition-colors">
                    College Directory
                  </Link>
                </li>
                <li>
                  <Link href="/scholarships" className="hover:text-white transition-colors">
                    Scholarships
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg font-['Poppins']">Support</h4>
              <ul className="space-y-3 text-white/80 font-['Inter']">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <Link href="/community" className="hover:text-white transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/mentorship" className="hover:text-white transition-colors">
                    Mentorship
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg font-['Poppins']">Company</h4>
              <ul className="space-y-3 text-white/80 font-['Inter']">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/80 font-['Inter']">
            <p>&copy; 2024 Pavo. All rights reserved. Empowering academic excellence across India.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
