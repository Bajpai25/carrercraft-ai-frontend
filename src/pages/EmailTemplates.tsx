"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Mail, Eye, Sparkles, Send } from "lucide-react"
import { Link } from "react-router-dom"

export function EmailTemplates() {
  const templates = [
    {
      id: 1,
      title: "Follow-up After Interview",
      description: "Professional follow-up email to send after your interview",
      category: "Follow-up",
      timing: "24-48 hours",
      preview:
        "Subject: Thank you for the interview - [Your Name]\n\nDear [Interviewer Name],\n\nThank you for taking the time to meet with me yesterday to discuss the [Position Title] role at [Company Name]. I enjoyed our conversation about...",
      tags: ["Interview", "Thank You", "Professional"],
      color: "blue",
    },
    {
      id: 2,
      title: "Networking Introduction",
      description: "Perfect for reaching out to new professional connections",
      category: "Networking",
      timing: "Anytime",
      preview:
        "Subject: Introduction from [Mutual Connection]\n\nHi [Name],\n\n[Mutual Connection] suggested I reach out to you. I'm currently [your role/situation] and would love to learn more about your experience in...",
      tags: ["Networking", "Introduction", "Connection"],
      color: "purple",
    },
    {
      id: 3,
      title: "Job Application Follow-up",
      description: "Follow up on your job application status professionally",
      category: "Follow-up",
      timing: "1-2 weeks",
      preview:
        "Subject: Following up on [Position Title] Application\n\nDear Hiring Manager,\n\nI hope this email finds you well. I wanted to follow up on my application for the [Position Title] position that I submitted on [Date]...",
      tags: ["Application", "Status Check", "Professional"],
      color: "green",
    },
    {
      id: 4,
      title: "LinkedIn Connection Request",
      description: "Personalized message for LinkedIn connection requests",
      category: "Social Media",
      timing: "Anytime",
      preview:
        "Hi [Name],\n\nI came across your profile and was impressed by your work in [specific area]. I'm currently [your situation] and would love to connect and learn from your experience in [industry/field]...",
      tags: ["LinkedIn", "Connection", "Social"],
      color: "pink",
    },
    {
      id: 5,
      title: "Informational Interview Request",
      description: "Request an informational interview with industry professionals",
      category: "Networking",
      timing: "Anytime",
      preview:
        "Subject: Request for Informational Interview\n\nDear [Name],\n\nI hope this email finds you well. I'm currently exploring opportunities in [industry/field] and would greatly appreciate the chance to learn from your expertise...",
      tags: ["Informational", "Interview", "Learning"],
      color: "orange",
    },
    {
      id: 6,
      title: "Salary Negotiation",
      description: "Professional approach to salary and benefits negotiation",
      category: "Negotiation",
      timing: "After offer",
      preview:
        "Subject: [Position Title] Offer Discussion\n\nDear [Hiring Manager],\n\nThank you for extending the offer for the [Position Title] role. I'm excited about the opportunity to join [Company Name] and contribute to...",
      tags: ["Negotiation", "Salary", "Benefits"],
      color: "indigo",
    },
    {
      id: 7,
      title: "Rejection Response",
      description: "Graceful response to job rejection while keeping doors open",
      category: "Response",
      timing: "Within 24 hours",
      preview:
        "Subject: Thank you for the opportunity\n\nDear [Hiring Manager],\n\nThank you for informing me about your decision regarding the [Position Title] role. While I'm disappointed, I understand that you had many qualified candidates...",
      tags: ["Rejection", "Professional", "Future"],
      color: "gray",
    },
    {
      id: 8,
      title: "Referral Request",
      description: "Ask for referrals from your professional network",
      category: "Networking",
      timing: "Anytime",
      preview:
        "Subject: Seeking Your Advice and Potential Referral\n\nHi [Name],\n\nI hope you're doing well! I'm currently exploring new opportunities in [field/industry] and wondered if you might know of any openings that would be a good fit...",
      tags: ["Referral", "Network", "Opportunity"],
      color: "teal",
    },
  ]

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
      gray: "from-gray-500 to-gray-600",
      teal: "from-teal-500 to-teal-600",
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
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-sm">
          <Mail className="w-4 h-4 text-purple-600 mr-2" />
          <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Professional Communication
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Email Templates
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Professional email templates for every stage of your job search and career development
        </p>
      </motion.div>

      {/* Templates Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {templates.map((template) => (
          <motion.div key={template.id} variants={itemVariants}>
            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full">
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getColorClasses(template.color)} flex items-center justify-center shadow-lg`}
                  >
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {template.timing}
                  </Badge>
                </div>
                <div>
                  <CardTitle className="text-lg font-bold leading-tight">{template.title}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                    {template.description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Preview */}
                <div className="bg-gray-50 text-white dark:bg-gray-800/50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-4">{template.preview}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
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
                    className={`flex-1 bg-gradient-to-r text-white ${getColorClasses(template.color)} hover:opacity-90 text-xs`}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Preview
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 text-xs">
                    <Send className="w-3 h-3 mr-1" />
                    Use
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
        <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20 backdrop-blur-xl max-w-2xl mx-auto">
          <CardContent className="p-8">
            <div className="space-y-4">
              <Sparkles className="w-12 h-12 mx-auto text-purple-500" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Need Personalized Emails?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Let our AI customize these templates based on your specific situation, company, and role
              </p>
              <Link to="/">
              <Button className="bg-gradient-to-r text-white from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Custom Email
              </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
