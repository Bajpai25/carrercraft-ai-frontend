
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { FileText, Download, Eye, Sparkles } from "lucide-react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Link } from "react-router-dom"


export function CoverLetterTemplates() {
  const templates = [
    {
      id: 1,
      title: "Software Engineer",
      description: "Perfect for tech roles and software development positions",
      category: "Technology",
      difficulty: "Intermediate",
      preview:
        "Dear Hiring Manager,\n\nI am writing to express my strong interest in the Software Engineer position at [Company Name]. With my extensive experience in full-stack development and passion for creating innovative solutions...",
      tags: ["React", "Node.js", "Full-Stack"],
      color: "blue",
    },
    {
      id: 2,
      title: "Marketing Manager",
      description: "Ideal for marketing and brand management roles",
      category: "Marketing",
      difficulty: "Advanced",
      preview:
        "Dear [Hiring Manager Name],\n\nI am excited to apply for the Marketing Manager position at [Company Name]. My proven track record in developing successful marketing campaigns and driving brand growth...",
      tags: ["Digital Marketing", "Brand Strategy", "Analytics"],
      color: "purple",
    },
    {
      id: 3,
      title: "Data Scientist",
      description: "Tailored for data science and analytics positions",
      category: "Data Science",
      difficulty: "Advanced",
      preview:
        "Dear Hiring Team,\n\nI am writing to apply for the Data Scientist role at [Company Name]. With my strong background in machine learning, statistical analysis, and data visualization...",
      tags: ["Python", "Machine Learning", "Statistics"],
      color: "green",
    },
    {
      id: 4,
      title: "UX Designer",
      description: "Designed for user experience and design roles",
      category: "Design",
      difficulty: "Intermediate",
      preview:
        "Dear [Hiring Manager],\n\nI am thrilled to submit my application for the UX Designer position at [Company Name]. My passion for creating user-centered designs and improving digital experiences...",
      tags: ["Figma", "User Research", "Prototyping"],
      color: "pink",
    },
    {
      id: 5,
      title: "Project Manager",
      description: "Perfect for project management and leadership roles",
      category: "Management",
      difficulty: "Intermediate",
      preview:
        "Dear Hiring Manager,\n\nI am writing to express my interest in the Project Manager position at [Company Name]. With my proven ability to lead cross-functional teams and deliver projects on time...",
      tags: ["Agile", "Leadership", "Stakeholder Management"],
      color: "orange",
    },
    {
      id: 6,
      title: "Sales Representative",
      description: "Optimized for sales and business development roles",
      category: "Sales",
      difficulty: "Beginner",
      preview:
        "Dear [Hiring Manager Name],\n\nI am excited to apply for the Sales Representative position at [Company Name]. My enthusiasm for building relationships and driving revenue growth...",
      tags: ["CRM", "Lead Generation", "Negotiation"],
      color: "indigo",
    },
  ]

  const navigate = useNavigate(); 
  const [searchParams] = useSearchParams()
const jobDescription = searchParams.get("jobDescription") || ""
const resumeName = searchParams.get("resumeName") || ""
const templateTypeFromURL = searchParams.get("templateType") ||""

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
    `/?templateId=${template.id}&jobDescription=${encodeURIComponent(jobDescription)}&resumeName=${resumeName}&templateType=${encodeURIComponent(templateTypeFromURL)}`
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
