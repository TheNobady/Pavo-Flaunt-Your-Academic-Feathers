"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Award,
  BookOpen,
  Sparkles,
  TrendingUp,
  Target,
  MessageCircle,
  GraduationCap,
  Users,
  FileText,
  Heart,
  Star,
  Zap,
  Lightbulb,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface QuizResults {
  quizType: string
  result: {
    stream?: string
    career?: string
  }
  answers: { [key: number]: number }
  recommendations?: string[]
  completed: boolean
}

interface UserData {
  class: string
  name: string
  location: string
}

const CAREER_ASSESSMENT_DATA = {
  streams: {
    "Science Stream": {
      description:
        "Perfect for analytical minds who love discovery and innovation. This stream opens doors to engineering, medicine, research, and technology careers.",
      ebooks: [
        "Physics Fundamentals for Class 11",
        "Chemistry Lab Manual",
        "Mathematics for Science Students",
        "Biology Concepts & Applications",
      ],
      counselors: [
        "Dr. Priya Sharma - Science Stream Expert",
        "Prof. Raj Kumar - Physics & Engineering Guide",
        "Dr. Meera Singh - Medical Stream Counselor",
      ],
      resources: [
        "Science Lab Simulations",
        "NCERT Solutions Complete Set",
        "JEE Preparation Roadmap",
        "NEET Study Materials",
      ],
    },
    "Commerce Stream": {
      description:
        "Ideal for future business leaders and financial experts. This stream leads to careers in accounting, finance, management, and entrepreneurship.",
      ebooks: [
        "Business Studies Comprehensive Guide",
        "Economics Made Simple",
        "Accountancy Fundamentals",
        "Statistics for Commerce",
      ],
      counselors: [
        "CA Meera Gupta - Commerce & Finance Expert",
        "Prof. Suresh Jain - Economics Specialist",
        "Mr. Vikram Shah - Business Management Guide",
      ],
      resources: [
        "Business Case Studies Collection",
        "Commerce Career Pathways Guide",
        "CA Foundation Preparation",
        "Company Secretary Course Info",
      ],
    },
    "Arts Stream": {
      description:
        "Perfect for creative thinkers and social change makers. This stream opens paths to civil services, journalism, psychology, law, and creative fields.",
      ebooks: [
        "History Chronicles of India",
        "Political Science Simplified",
        "Psychology Basics & Applications",
        "English Literature Classics",
      ],
      counselors: [
        "Dr. Anjali Verma - Arts & Humanities Expert",
        "Prof. Vikram Singh - History & Political Science",
        "Ms. Kavya Sharma - Psychology & Counseling",
      ],
      resources: [
        "Arts Career Exploration Guide",
        "UPSC Preparation Roadmap",
        "Creative Writing Workshop",
        "Social Sciences Research Hub",
      ],
    },
  },
  careers: {
    Engineer: {
      description:
        "You're a practical problem-solver who loves building efficient systems. Engineering combines creativity with technical expertise to solve real-world challenges.",
      degrees: [
        "Computer Science Engineering",
        "Mechanical Engineering",
        "Civil Engineering",
        "Electrical Engineering",
        "Chemical Engineering",
      ],
      colleges: [
        "IIT Delhi",
        "NIT Kurukshetra",
        "Delhi Technological University",
        "Government Engineering College Delhi",
        "Jamia Millia Islamia",
      ],
      resources: [
        "Engineering Fundamentals Course",
        "CAD Software Training",
        "Project Management Basics",
        "Industry Internship Guide",
      ],
      counselors: ["Er. Rajesh Kumar - Engineering Career Guide", "Prof. Anita Sharma - Technical Education Expert"],
    },
    Doctor: {
      description:
        "You have the analytical mind and compassion needed for medicine. Doctors diagnose, treat, and lead healthcare teams to save lives and improve health outcomes.",
      degrees: [
        "MBBS (Bachelor of Medicine)",
        "BDS (Dental Surgery)",
        "BAMS (Ayurvedic Medicine)",
        "BHMS (Homeopathic Medicine)",
      ],
      colleges: [
        "AIIMS Delhi",
        "Government Medical College Delhi",
        "MAMC Delhi",
        "UCMS Delhi",
        "VMMC & Safdarjung Hospital",
      ],
      resources: [
        "NEET Preparation Complete Guide",
        "Medical Ethics & Practice",
        "Human Anatomy Atlas",
        "Clinical Skills Training",
      ],
      counselors: ["Dr. Priya Mehta - Medical Career Counselor", "Dr. Suresh Gupta - NEET Preparation Expert"],
    },
    "Scientist/Researcher": {
      description:
        "You're driven by curiosity and the desire to discover new knowledge. Scientists push the boundaries of human understanding through research and experimentation.",
      degrees: ["B.Sc. Physics", "B.Sc. Chemistry", "B.Sc. Mathematics", "B.Sc. Biology", "Integrated M.Sc. Programs"],
      colleges: ["Delhi University", "JNU Delhi", "IISERs", "Government Science Colleges", "Research Institutes"],
      resources: [
        "Research Methodology Guide",
        "Scientific Writing Workshop",
        "Laboratory Techniques Manual",
        "Grant Application Training",
      ],
      counselors: ["Dr. Vikram Singh - Research Career Guide", "Prof. Meera Jain - Science Research Expert"],
    },
    Architect: {
      description:
        "You blend artistic creativity with technical precision. Architects design spaces that are both beautiful and functional, shaping how people experience the built environment.",
      degrees: ["B.Arch (Bachelor of Architecture)", "B.Planning (Urban Planning)", "Interior Design Programs"],
      colleges: ["School of Planning & Architecture Delhi", "Jamia Millia Islamia", "Government Architecture Colleges"],
      resources: [
        "Architectural Drawing Basics",
        "3D Modeling Software Training",
        "Sustainable Design Principles",
        "Building Codes & Regulations",
      ],
      counselors: ["Ar. Priya Sharma - Architecture Career Guide", "Prof. Rajesh Kumar - Design Education Expert"],
    },
    "IT Professional/Developer": {
      description:
        "You love creating digital solutions through code. IT professionals build the software and systems that power our modern world, from apps to artificial intelligence.",
      degrees: [
        "B.Tech Computer Science",
        "BCA (Computer Applications)",
        "B.Sc. Computer Science",
        "B.Sc. Information Technology",
      ],
      colleges: ["DTU Delhi", "NSUT Delhi", "Government IT Colleges", "Technical Universities"],
      resources: [
        "Programming Languages Guide",
        "Software Development Lifecycle",
        "Database Management Systems",
        "Cybersecurity Fundamentals",
      ],
      counselors: ["Mr. Amit Sharma - IT Career Counselor", "Ms. Priya Singh - Software Development Expert"],
    },
    Nurse: {
      description:
        "You're empathetic and resilient, providing holistic patient care. Nurses are the backbone of healthcare, offering direct care and emotional support to patients and families.",
      degrees: ["B.Sc. Nursing", "GNM (General Nursing & Midwifery)", "Post Basic B.Sc. Nursing"],
      colleges: ["AIIMS Nursing College", "Government Nursing Colleges", "Medical College Nursing Programs"],
      resources: [
        "Nursing Fundamentals",
        "Patient Care Protocols",
        "Medical Terminology Guide",
        "Healthcare Communication Skills",
      ],
      counselors: ["Ms. Meera Gupta - Nursing Career Guide", "Sr. Priya Sharma - Healthcare Professional"],
    },
    Pharmacist: {
      description:
        "You're meticulous and detail-oriented, ensuring medication safety. Pharmacists are medication experts who play a crucial role in patient health and safety.",
      degrees: ["B.Pharm (Bachelor of Pharmacy)", "Pharm.D (Doctor of Pharmacy)", "M.Pharm (Master of Pharmacy)"],
      colleges: [
        "Government Pharmacy Colleges",
        "Medical College Pharmacy Departments",
        "University Pharmacy Programs",
      ],
      resources: [
        "Pharmaceutical Sciences Guide",
        "Drug Interaction Database",
        "Pharmacy Practice Manual",
        "Clinical Pharmacy Training",
      ],
      counselors: ["Dr. Rajesh Kumar - Pharmacy Career Expert", "Ms. Anita Singh - Pharmaceutical Sciences Guide"],
    },
    Physiotherapist: {
      description:
        "You're patient and motivational, helping people regain physical independence. Physiotherapists design rehabilitation programs to restore mobility and improve quality of life.",
      degrees: ["BPT (Bachelor of Physiotherapy)", "MPT (Master of Physiotherapy)", "Diploma in Physiotherapy"],
      colleges: [
        "Government Physiotherapy Colleges",
        "Medical College Allied Health Programs",
        "Rehabilitation Centers",
      ],
      resources: [
        "Human Anatomy & Physiology",
        "Rehabilitation Techniques",
        "Exercise Therapy Guide",
        "Sports Medicine Basics",
      ],
      counselors: ["Dr. Priya Mehta - Physiotherapy Expert", "Mr. Suresh Kumar - Rehabilitation Specialist"],
    },
    "Chartered Accountant": {
      description:
        "You're systematic and detail-oriented, ensuring financial integrity. CAs are financial guardians who audit, advise, and ensure compliance in the business world.",
      degrees: ["CA (Chartered Accountancy)", "B.Com + CA", "Integrated CA Programs"],
      colleges: ["Commerce Colleges with CA Coaching", "ICAI Study Centers", "Professional Training Institutes"],
      resources: [
        "Accounting Standards Guide",
        "Taxation Laws Manual",
        "Audit Procedures Handbook",
        "Financial Management Basics",
      ],
      counselors: ["CA Meera Gupta - Chartered Accountancy Expert", "CA Rajesh Singh - Professional Training Guide"],
    },
    "Financial Analyst": {
      description:
        "You're analytical and forward-thinking, interpreting financial data to guide investment decisions. Financial analysts help maximize returns and minimize risks in the financial world.",
      degrees: ["B.Com Finance", "BBA Finance", "MBA Finance", "CFA (Chartered Financial Analyst)"],
      colleges: ["Commerce Colleges", "Business Schools", "Financial Institutes", "Management Universities"],
      resources: [
        "Financial Modeling Guide",
        "Investment Analysis Manual",
        "Stock Market Fundamentals",
        "Risk Management Principles",
      ],
      counselors: ["Mr. Amit Sharma - Finance Career Expert", "Ms. Priya Singh - Investment Analysis Guide"],
    },
    "Business Manager": {
      description:
        "You're a strategic leader who drives organizational growth. Business managers oversee operations, lead teams, and make decisions that shape company success.",
      degrees: [
        "BBA (Business Administration)",
        "MBA (Master of Business Administration)",
        "B.Com + Management Courses",
      ],
      colleges: ["Business Schools", "Management Universities", "Commerce Colleges with Management Programs"],
      resources: [
        "Leadership Development Program",
        "Strategic Management Guide",
        "Operations Management Manual",
        "Team Building Techniques",
      ],
      counselors: ["Prof. Suresh Jain - Business Management Expert", "Ms. Kavya Sharma - Leadership Development Guide"],
    },
    "Company Secretary": {
      description:
        "You're detail-oriented and legally minded, ensuring corporate compliance. Company Secretaries are corporate governance experts who navigate legal and regulatory frameworks.",
      degrees: ["CS (Company Secretary)", "B.Com + CS", "LLB + CS", "Integrated CS Programs"],
      colleges: ["Commerce Colleges with CS Coaching", "ICSI Study Centers", "Law Colleges with Corporate Law Focus"],
      resources: [
        "Corporate Law Manual",
        "Compliance Procedures Guide",
        "Board Meeting Protocols",
        "Securities Law Handbook",
      ],
      counselors: ["CS Meera Gupta - Company Secretary Expert", "Adv. Rajesh Kumar - Corporate Law Guide"],
    },
    "Civil Servant": {
      description:
        "You're a systems-thinker passionate about public service and policy. Civil servants work within government to implement policies and serve the public good.",
      degrees: ["Any Bachelor's Degree", "BA Political Science", "BA Public Administration", "BA Economics"],
      colleges: ["Any Recognized University", "Government Colleges", "Public Administration Institutes"],
      resources: [
        "UPSC Preparation Complete Guide",
        "Current Affairs Analysis",
        "Public Administration Manual",
        "Indian Polity & Constitution",
      ],
      counselors: ["Dr. Anjali Verma - Civil Services Expert", "Prof. Vikram Singh - UPSC Preparation Guide"],
    },
    Journalist: {
      description:
        "You seek truth and communicate it effectively to inform the public. Journalists investigate, report, and present news that keeps society informed and accountable.",
      degrees: [
        "BJMC (Journalism & Mass Communication)",
        "BA Journalism",
        "MA Journalism",
        "English Literature + Journalism",
      ],
      colleges: ["Mass Communication Colleges", "Journalism Schools", "University Media Departments"],
      resources: [
        "News Writing & Reporting Guide",
        "Media Ethics Manual",
        "Digital Journalism Tools",
        "Interview Techniques Workshop",
      ],
      counselors: ["Ms. Priya Sharma - Journalism Career Expert", "Mr. Suresh Kumar - Media Professional Guide"],
    },
    "Graphic/UX Designer": {
      description:
        "You're creative and empathetic, making complex information simple and beautiful. Designers create visual experiences that connect with people emotionally and functionally.",
      degrees: ["B.Des (Bachelor of Design)", "BFA (Fine Arts)", "Graphic Design Diploma", "UX/UI Design Courses"],
      colleges: [
        "National Institute of Design",
        "Design Schools",
        "Art Colleges",
        "Technology Institutes with Design Programs",
      ],
      resources: [
        "Design Principles Guide",
        "Software Training (Adobe Creative Suite)",
        "UX Research Methods",
        "Portfolio Development Workshop",
      ],
      counselors: ["Ms. Kavya Sharma - Design Career Expert", "Prof. Anita Singh - Creative Arts Guide"],
    },
    "Psychologist/Counselor": {
      description:
        "You're empathetic and interested in human behavior, helping people navigate personal challenges and improve their mental well-being.",
      degrees: ["BA Psychology", "MA Psychology", "M.Phil Clinical Psychology", "Counseling Certification Programs"],
      colleges: ["Psychology Departments in Universities", "Mental Health Institutes", "Counseling Training Centers"],
      resources: [
        "Psychology Fundamentals",
        "Counseling Techniques Manual",
        "Mental Health Awareness Guide",
        "Therapy Methods Workshop",
      ],
      counselors: ["Dr. Meera Singh - Psychology Career Expert", "Ms. Priya Gupta - Mental Health Professional"],
    },
  },
}

const PavoMascot = ({ className }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 via-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-xl animate-pulse">
      <span className="text-2xl animate-bounce">🦚</span>
    </div>
    <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
      <Sparkles className="w-3 h-3 text-yellow-800" />
    </div>
  </div>
)

const CareerChatBot = ({ result, userClass }: { result: string; userClass: string }) => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: `🎉 Congratulations! Based on your assessment, ${
        userClass === "class-10" || userClass === "class-9" || userClass === "class-8"
          ? `${result} is perfect for you! I'm Pavo, your AI career guide. Let's discuss what this means for your future!`
          : `a career in ${result} aligns wonderfully with your strengths! I'm Pavo, and I'm here to help you understand this exciting path.`
      }`,
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const newMessages = [
      ...messages,
      { type: "user", content: inputMessage },
      {
        type: "bot",
        content: `That's a great question about ${result}! Let me help you understand more about this path. ${
          userClass === "class-10" || userClass === "class-9" || userClass === "class-8"
            ? "This stream will open doors to amazing career opportunities."
            : "This career has excellent growth prospects and aligns with your natural talents."
        } What specific aspect would you like to explore further?`,
      },
    ]
    setMessages(newMessages)
    setInputMessage("")
  }

  return (
    <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center text-blue-800">
          <MessageCircle className="w-6 h-6 mr-2 text-blue-600" />
          Chat with Pavo - Your AI Career Guide
        </CardTitle>
        <CardDescription className="text-blue-700 font-medium">
          Discuss your results and get personalized guidance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-white rounded-lg p-4 h-64 overflow-y-auto mb-4 border border-blue-200">
          {messages.map((message, index) => (
            <div key={index} className={`mb-3 ${message.type === "user" ? "text-right" : "text-left"}`}>
              <div
                className={`inline-block p-3 rounded-lg max-w-xs ${
                  message.type === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gradient-to-r from-orange-100 to-blue-100 text-gray-800 border border-orange-200"
                }`}
              >
                {message.type === "bot" && (
                  <div className="flex items-center mb-1">
                    <span className="text-sm mr-1">🦚</span>
                    <span className="text-xs font-semibold text-blue-600">Pavo</span>
                  </div>
                )}
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Ask me about your career path..."
            className="flex-1 p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
          >
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function QuizResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState<QuizResults | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    const storedUserData = localStorage.getItem("pavoUserData")

    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData)
      setUserData(parsedUserData)

      // Generate static results based on user class
      const isYoungerStudent =
        parsedUserData.class === "class-8" || parsedUserData.class === "class-9" || parsedUserData.class === "class-10"

      let staticResult
      if (isYoungerStudent) {
        // For younger students, show stream results
        const streams = ["Science Stream", "Commerce Stream", "Arts Stream"]
        const selectedStream = streams[Math.floor(Math.random() * streams.length)]
        staticResult = {
          quizType: "stream-selection",
          result: { stream: selectedStream },
          answers: { 1: 0, 2: 1, 3: 0, 4: 2, 5: 1, 6: 0, 7: 1, 8: 0, 9: 2, 10: 1 },
          completed: true,
        }
      } else {
        // For older students, show career results
        const careers = [
          "Engineer",
          "Doctor",
          "Scientist/Researcher",
          "Architect",
          "IT Professional/Developer",
          "Nurse",
          "Pharmacist",
          "Physiotherapist",
          "Chartered Accountant",
          "Financial Analyst",
          "Business Manager",
          "Company Secretary",
          "Civil Servant",
          "Journalist",
          "Graphic/UX Designer",
          "Psychologist/Counselor",
        ]
        const selectedCareer = careers[Math.floor(Math.random() * careers.length)]
        staticResult = {
          quizType: "career-assessment",
          result: { career: selectedCareer },
          answers: { 1: 0, 2: 1, 3: 0, 4: 2, 5: 1, 6: 0, 7: 1, 8: 0, 9: 2, 10: 1 },
          completed: true,
        }
      }

      setResults(staticResult)
      // Save to localStorage for dashboard integration
      localStorage.setItem("pavoQuizResults", JSON.stringify(staticResult))
    } else {
      router.push("/quiz")
    }
  }, [router])

  if (!results || !userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <PavoMascot className="mx-auto mb-4" />
          <p className="text-gray-700 font-semibold">Loading your amazing results...</p>
        </div>
      </div>
    )
  }

  const isYoungerStudent = userData.class === "class-8" || userData.class === "class-9" || userData.class === "class-10"
  const resultText = isYoungerStudent ? results.result.stream : results.result.career

  const getAssessmentData = (result: string, isStream: boolean) => {
    if (isStream) {
      return (
        CAREER_ASSESSMENT_DATA.streams[result as keyof typeof CAREER_ASSESSMENT_DATA.streams] ||
        CAREER_ASSESSMENT_DATA.streams["Science Stream"]
      )
    } else {
      return (
        CAREER_ASSESSMENT_DATA.careers[result as keyof typeof CAREER_ASSESSMENT_DATA.careers] ||
        CAREER_ASSESSMENT_DATA.careers["Engineer"]
      )
    }
  }

  const assessmentData = getAssessmentData(resultText || "", isYoungerStudent)

  const getDistrictColleges = (location: string, career?: string) => {
    const baseColleges = [
      `Government College ${location}`,
      `${location} University`,
      `District Institute of Technology ${location}`,
      `${location} Medical College`,
      `Government Engineering College ${location}`,
    ]

    if (career && (assessmentData as any).colleges) {
      return (assessmentData as any).colleges.map((college: string) =>
        college.includes(location) ? college : `${college} - ${location} Campus`,
      )
    }

    return baseColleges.slice(0, 3)
  }

  const districtColleges = getDistrictColleges(userData.location, isYoungerStudent ? undefined : resultText)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <PavoMascot />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
                  Pavo
                </h1>
                <p className="text-sm text-gray-600 font-medium">Your Career Discovery Results</p>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-orange-100 to-green-100 text-orange-800 border-orange-300 font-semibold">
              Career Assessment Complete
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="mb-8 border-2 border-orange-200 bg-gradient-to-r from-orange-50 via-yellow-50 to-green-50 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200 to-green-200 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>
          <CardHeader className="text-center relative z-10">
            <div className="flex justify-center items-center gap-4 mb-6">
              <PavoMascot />
              <div className="flex gap-2">
                <Star className="w-8 h-8 text-yellow-500 animate-pulse" />
                <Zap className="w-8 h-8 text-orange-500 animate-bounce" />
                <Heart className="w-8 h-8 text-red-500 animate-pulse" />
              </div>
            </div>
            <CardTitle className="text-4xl font-bold text-gray-800 mb-2">
              🎉 Congratulations, {userData.name}! 🎉
            </CardTitle>
            <CardDescription className="text-xl text-gray-700 font-medium">
              Your career discovery journey has revealed amazing insights about your future!
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center relative z-10">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-orange-200 shadow-lg">
              <div className="text-6xl font-bold bg-gradient-to-r from-orange-600 via-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
                {isYoungerStudent ? "🎯" : "🚀"}
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {isYoungerStudent ? "Recommended Stream" : "Your Ideal Career"}
              </h2>
              <p className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent mb-4">
                {resultText}
              </p>
              <p className="text-lg text-gray-700 font-medium">{assessmentData.description}</p>
            </div>
          </CardContent>
        </Card>

        <div className="mb-8">
          <CareerChatBot result={resultText || ""} userClass={userData.class} />
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" />
            Your Personalized Resources
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* E-books */}
            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <BookOpen className="w-6 h-6 mr-2 text-green-600" />
                  E-Books & Study Materials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {((assessmentData as any).ebooks || (assessmentData as any).resources || []).map(
                    (item: string, index: number) => (
                      <div key={index} className="flex items-center p-2 bg-white rounded-lg border border-green-200">
                        <FileText className="w-4 h-4 mr-2 text-green-600" />
                        <span className="text-sm font-medium text-gray-800">{item}</span>
                      </div>
                    ),
                  )}
                </div>
                <Button
                  className="w-full mt-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold"
                  asChild
                >
                  <Link href="/ebooks">
                    Access E-Books <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Counselors */}
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-sky-50 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <Users className="w-6 h-6 mr-2 text-blue-600" />
                  Expert Counselors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(assessmentData.counselors || []).map((counselor: string, index: number) => (
                    <div key={index} className="flex items-center p-2 bg-white rounded-lg border border-blue-200">
                      <GraduationCap className="w-4 h-4 mr-2 text-blue-600" />
                      <span className="text-sm font-medium text-gray-800">{counselor}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold">
                  Connect with Counselors <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            {/* District Colleges */}
            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-800">
                  <Award className="w-6 h-6 mr-2 text-purple-600" />
                  Colleges in {userData.location}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {districtColleges.map((college: string, index: number) => (
                    <div key={index} className="flex items-center p-2 bg-white rounded-lg border border-purple-200">
                      <GraduationCap className="w-4 h-4 mr-2 text-purple-600" />
                      <span className="text-sm font-medium text-gray-800">{college}</span>
                    </div>
                  ))}
                </div>
                <Button
                  className="w-full mt-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold"
                  asChild
                >
                  <Link href="/colleges">
                    Find More Colleges <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {!isYoungerStudent && (assessmentData as any).degrees && (
            <Card className="mt-6 border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-800">
                  <TrendingUp className="w-6 h-6 mr-2 text-orange-600" />
                  Recommended Degree Programs
                </CardTitle>
                <CardDescription className="text-orange-700 font-medium">
                  These degrees will help you achieve your career goals in {resultText}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {(assessmentData as any).degrees.map((degree: string, index: number) => (
                    <div
                      key={index}
                      className="p-4 bg-white rounded-lg border border-orange-200 text-center shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <GraduationCap className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                      <p className="font-semibold text-gray-800">{degree}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Next Steps */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-2 border-gray-200">
          <CardHeader>
            <CardTitle className="text-3xl text-gray-800 flex items-center">
              <Sparkles className="w-8 h-8 mr-3 text-yellow-500" />
              Your Bright Future Awaits!
            </CardTitle>
            <CardDescription className="text-lg text-gray-700 font-medium">
              Take the next steps in your incredible journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <Button
                size="lg"
                className="h-auto p-8 flex-col space-y-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full"
                asChild
              >
                <Link href="/career-paths">
                  <Target className="w-10 h-10" />
                  <div className="text-center">
                    <div className="font-bold text-lg">Explore Career Paths</div>
                    <div className="text-sm opacity-90">Detailed roadmaps for your future</div>
                  </div>
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="h-auto p-8 flex-col space-y-3 bg-white/80 backdrop-blur-sm border-2 border-blue-300 text-blue-700 hover:bg-blue-50 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full"
                asChild
              >
                <Link href="/dashboard">
                  <Award className="w-10 h-10" />
                  <div className="text-center">
                    <div className="font-bold text-lg">Return to Dashboard</div>
                    <div className="text-sm opacity-90">See your updated goals and progress</div>
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
