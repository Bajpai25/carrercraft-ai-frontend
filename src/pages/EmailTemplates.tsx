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
    title: "Cold Outreach for Job Opportunity",
    description: "Reach out directly to a company about open roles",
    category: "Outreach",
    timing: "Anytime",
    preview:
      "Subject: Exploring Opportunities at [Company Name]\n\nDear [Hiring Manager],\n\nI’m reaching out to express my interest in potential roles at [Company Name]. With a background in [skillset], I’d love to contribute to your mission and explore how I can add value to your team...",
    tags: ["Outreach", "Interest", "Initiative"],
    color: "blue",
  },
  {
    id: 2,
    title: "Thank You After Job Offer",
    description: "Show appreciation for a job offer",
    category: "Gratitude",
    timing: "Same day",
    preview:
      "Subject: Grateful for the Offer\n\nDear [Hiring Manager],\n\nThank you so much for the offer for the [Position Title] role. I truly appreciate the opportunity and the confidence you’ve shown in me...",
    tags: ["Gratitude", "Offer", "Professional"],
    color: "green",
  },
  {
    id: 3,
    title: "Intro Email to a Recruiter",
    description: "Initiate a conversation with a recruiter",
    category: "Recruitment",
    timing: "Anytime",
    preview:
      "Subject: Introduction – [Your Name]\n\nHi [Recruiter’s Name],\n\nI came across your profile and wanted to introduce myself. I'm currently exploring roles in [industry] and would appreciate any insights you may have...",
    tags: ["Recruiter", "Introduction", "Networking"],
    color: "purple",
  },
  {
    id: 4,
    title: "Follow-up After Networking Event",
    description: "Reconnect with someone you met professionally",
    category: "Follow-up",
    timing: "24-48 hours",
    preview:
      "Subject: Great Connecting at [Event Name]\n\nHi [Name],\n\nIt was a pleasure meeting you at [Event]. I enjoyed learning about your work and would love to continue our conversation...",
    tags: ["Event", "Follow-up", "Professional"],
    color: "indigo",
  },
  {
    id: 5,
    title: "Internal Referral Request",
    description: "Ask a connection inside a company for a referral",
    category: "Referral",
    timing: "Before applying",
    preview:
      "Subject: Referral for [Position Title] at [Company Name]\n\nHi [Name],\n\nI saw that [Company Name] is hiring for a [Position Title]. Since you work there, I was wondering if you’d be open to referring me or offering advice...",
    tags: ["Internal", "Referral", "Hiring"],
    color: "orange",
  },
  {
    id: 6,
    title: "Career Update Announcement",
    description: "Inform your network about a new role or change",
    category: "Update",
    timing: "After joining",
    preview:
      "Subject: Exciting Career Update\n\nHi [Name],\n\nI wanted to share that I’ve recently joined [Company Name] as a [New Role]. I’m excited about this new chapter and would love to stay in touch...",
    tags: ["Update", "Announcement", "Network"],
    color: "cyan",
  },
  {
    id: 7,
    title: "Interview Scheduling Confirmation",
    description: "Confirm your availability for an interview",
    category: "Scheduling",
    timing: "Immediately",
    preview:
      "Subject: Interview Confirmation – [Your Name]\n\nDear [Recruiter Name],\n\nThank you for scheduling the interview for [Position Title]. I’m confirming our meeting on [Date] at [Time]...",
    tags: ["Interview", "Schedule", "Confirm"],
    color: "lime",
  },
  {
    id: 8,
    title: "Rejection Response Email",
    description: "Respond gracefully to a job rejection",
    category: "Rejection",
    timing: "Within 1 day",
    preview:
      "Subject: Thank You for the Opportunity\n\nDear [Hiring Manager],\n\nI appreciate your message regarding the [Position Title] role. While I'm disappointed, I’m grateful for the chance to connect and learn more about your team...",
    tags: ["Rejection", "Professional", "Future"],
    color: "gray",
  },
  {
    id: 9,
    title: "Job Offer Negotiation Email",
    description: "Negotiate salary, benefits or terms professionally",
    category: "Negotiation",
    timing: "After offer",
    preview:
      "Subject: [Position Title] Offer Discussion\n\nDear [Hiring Manager],\n\nThank you again for the offer. Before making a final decision, I’d love to discuss a few aspects of the offer regarding compensation and growth opportunities...",
    tags: ["Negotiation", "Salary", "Offer"],
    color: "red",
  },
  {
    id: 10,
    title: "Informational Interview Request",
    description: "Ask someone for a quick career chat",
    category: "Networking",
    timing: "Anytime",
    preview:
      "Subject: Informational Interview Request\n\nHi [Name],\n\nI hope you're doing well! I admire your work at [Company] and would love to hear more about your journey and role. Would you be open to a 15-minute chat sometime this week or next?",
    tags: ["Informational", "Networking", "Learning"],
    color: "teal",
  },
  {
    id: 11,
    title: "Post-Interview Thank You (Team)",
    description: "Thank an entire panel/team after an interview",
    category: "Follow-up",
    timing: "Same day or next",
    preview:
      "Subject: Thank You for the Interview\n\nDear [Team Name],\n\nThank you for the opportunity to speak with your team about the [Position Title] role. I enjoyed learning about the team’s work and your vision for the future...",
    tags: ["Thank You", "Panel", "Follow-up"],
    color: "violet",
  },
  {
    id: 12,
    title: "Withdrawal of Application",
    description: "Politely withdraw your candidacy from a role",
    category: "Withdrawal",
    timing: "ASAP",
    preview:
      "Subject: Withdrawal from Application – [Your Name]\n\nDear [Hiring Manager],\n\nThank you again for considering me for the [Position Title] role. After careful consideration, I’ve decided to withdraw my application due to [brief reason, optional]...",
    tags: ["Withdraw", "Application", "Polite"],
    color: "rose",
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
