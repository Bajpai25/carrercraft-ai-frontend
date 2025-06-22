
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { FileText, Download, Eye, Sparkles } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"


export const templates = [
  {
    id: 1,
    title: "Full-Stack Developer",
    description: "Perfect for roles requiring both frontend and backend expertise",
    category: "Software Engineering",
    difficulty: "Intermediate",
    preview:
      "Dear Hiring Manager,\n\nI am writing to express my interest in the Full-Stack Developer role at [Company Name]. My experience with modern frontend frameworks and scalable backend systems allows me to build robust applications end-to-end...",
    tags: ["React", "Node.js", "PostgreSQL"],
    color: "blue",
  },
  {
    id: 2,
    title: "Frontend Engineer",
    description: "Ideal for roles focused on UI/UX and frontend performance",
    category: "Software Engineering",
    difficulty: "Beginner",
    preview:
      "Dear Hiring Manager,\n\nI’m excited to apply for the Frontend Engineer position at [Company Name]. With a strong eye for detail and passion for clean UI, I have developed accessible and performance-driven interfaces using modern tools...",
    tags: ["JavaScript", "React", "TailwindCSS"],
    color: "indigo",
  },
  {
    id: 3,
    title: "Backend Developer",
    description: "For engineers focusing on APIs, databases, and architecture",
    category: "Software Engineering",
    difficulty: "Intermediate",
    preview:
      "Dear Hiring Team,\n\nI am thrilled to apply for the Backend Developer position at [Company Name]. With deep expertise in server-side logic, scalable database design, and RESTful APIs, I ensure high-performance backend systems...",
    tags: ["Node.js", "Express", "MongoDB"],
    color: "green",
  },
  {
    id: 4,
    title: "UI/UX Designer (Tech-focused)",
    description: "Blends technical UI skills with user-centered design thinking",
    category: "Software Engineering",
    difficulty: "Intermediate",
    preview:
      "Dear [Hiring Manager],\n\nAs a UI/UX Designer passionate about seamless user journeys, I bring a strong background in prototyping, usability testing, and responsive design to enhance your digital experience...",
    tags: ["Figma", "Design Systems", "Accessibility"],
    color: "pink",
  },
  {
    id: 5,
    title: "Freelance Software Developer",
    description: "For remote, contract-based, or freelance opportunities",
    category: "Software Engineering",
    difficulty: "Intermediate",
    preview:
      "Dear Client,\n\nAs a freelance software developer, I’ve delivered high-quality solutions for startups and established companies alike. I specialize in fast-paced, client-focused development cycles with full transparency...",
    tags: ["Remote", "Client Work", "Agile"],
    color: "purple",
  },
  {
    id: 6,
    title: "Junior Software Developer",
    description: "Great for early-career candidates starting in tech",
    category: "Software Engineering",
    difficulty: "Beginner",
    preview:
      "Dear [Hiring Manager],\n\nI’m eager to begin my software development career with [Company Name]. As a recent graduate with a strong foundation in JavaScript and Git workflows, I’m ready to learn, adapt, and contribute to your engineering team...",
    tags: ["JavaScript", "Git", "Team Player"],
    color: "orange",
  },
  {
    id: 7,
    title: "Senior Software Engineer",
    description: "For experienced engineers taking on technical leadership",
    category: "Software Engineering",
    difficulty: "Advanced",
    preview:
      "Dear Hiring Manager,\n\nWith over 6 years of experience leading engineering teams and scaling distributed systems, I’m excited to bring my expertise to [Company Name]. I excel at mentoring developers, optimizing system performance, and driving architectural decisions...",
    tags: ["Leadership", "Microservices", "Mentoring"],
    color: "blue",
  },
  {
    id: 8,
    title: "Associate Software Engineer",
    description: "Entry-level developer with some industry experience",
    category: "Software Engineering",
    difficulty: "Beginner",
    preview:
      "Dear [Hiring Manager],\n\nAs an Associate Software Engineer with a passion for problem-solving and clean code, I’m excited to contribute to innovative products at [Company Name]. I bring internship and academic project experience that aligns with your tech stack...",
    tags: ["React", "REST APIs", "Team Collaboration"],
    color: "purple",
  },
  {
    id: 9,
    title: "Software Engineering Intern",
    description: "For students or recent grads seeking internship experience",
    category: "Software Engineering",
    difficulty: "Beginner",
    preview:
      "Dear Team,\n\nI am excited to apply for the Software Engineering Internship at [Company Name]. As a computer science student with a passion for building, I’ve completed hands-on projects using Python and React, and I’m eager to grow within your team...",
    tags: ["Internship", "Python", "React"],
    color: "orange",
  },
  {
    id: 10,
    title: "Mobile App Developer",
    description: "Focuses on iOS/Android development roles",
    category: "Software Engineering",
    difficulty: "Intermediate",
    preview:
      "Dear Hiring Manager,\n\nAs a mobile app developer, I build intuitive and performant apps using React Native and Swift. I am enthusiastic about creating pixel-perfect experiences across mobile platforms...",
    tags: ["React Native", "Swift", "Mobile UX"],
    color: "green",
  },
  {
    id: 11,
    title: "Cloud Engineer",
    description: "Ideal for candidates with infrastructure-as-code and DevOps skills",
    category: "Software Engineering",
    difficulty: "Advanced",
    preview:
      "Dear [Hiring Team],\n\nI’m excited to apply for the Cloud Engineer role. With hands-on experience in AWS, Terraform, and Kubernetes, I help organizations scale reliably and automate infrastructure with modern DevOps practices...",
    tags: ["AWS", "Terraform", "Kubernetes"],
    color: "indigo",
  },
  {
    id: 12,
    title: "AI Research Engineer",
    description: "Blends software engineering and machine learning research",
    category: "Software Engineering",
    difficulty: "Advanced",
    preview:
      "Dear [Hiring Manager],\n\nWith a passion for both algorithmic design and scientific rigor, I’m applying for the AI Research Engineer role. My experience includes publishing research, building ML pipelines, and deploying models at scale...",
    tags: ["ML", "PyTorch", "Research"],
    color: "purple",
  },
]

export function CoverLetterTemplates() {
 


  const navigate = useNavigate(); 
  // const [searchParams] = useSearchParams()
// const jobDescription = searchParams.get("jobDescription") || ""
// const resumeName = searchParams.get("resumeName") || ""
// const templateTypeFromURL = searchParams.get("templateType") ||""

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-blue-500 to-blue-600",
      purple: "from-purple-500 to-purple-600",
      green: "from-green-500 to-green-600",
      pink: "from-pink-500 to-pink-600",
      orange: "from-orange-500 to-orange-600",
      indigo: "from-indigo-500 to-indigo-600",
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="space-y-8 text-gray-600 dark:text-gray-300">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm">
          <FileText className="w-4 h-4 text-blue-600 mr-2" />
          <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Professional Templates
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Cover Letter Templates
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Choose from our collection of AI-optimized cover letter templates designed for different industries and roles
        </p>
      </motion.div>

      {/* Templates Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {templates.map((template) => (
          <motion.div key={template.id} variants={itemVariants}>
            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full">
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getColorClasses(template.color)} flex items-center justify-center shadow-lg`}
                  >
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {template.difficulty}
                  </Badge>
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">{template.title}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300 mt-2">
                    {template.description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Preview */}
                <div className="bg-gray-50 text-white dark:bg-gray-800/50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-4">{template.preview}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button
                    size="sm"
                    className={`flex-1 bg-gradient-to-r text-white ${getColorClasses(template.color)} hover:opacity-90`}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => navigate(
    `/?templateId=${template.id}&templateType=${'cover-letter'}`
  )} 
>
                    <Download className="w-4 h-4 mr-2" />
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* AI Enhancement CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-center"
      >
        <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20 backdrop-blur-xl max-w-2xl mx-auto">
          <CardContent className="p-8">
            <div className="space-y-4">
              <Sparkles className="w-12 h-12 mx-auto text-blue-500" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Want AI-Powered Customization?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Upload your resume and job description to get a personalized cover letter tailored specifically for your
                application
              </p>
              <Link to="/">
              <Button className="bg-gradient-to-r text-white from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Custom Cover Letter
              </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
