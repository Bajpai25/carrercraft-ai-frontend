"use client"

import { useState } from "react"
import { JobApplicationForm } from "../components/JobApplicationForm"
import { ResultsDisplay } from "../components/ResultsDisplay"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { FileText, Mail, ArrowRight } from "lucide-react"
import { Link , useNavigate } from "react-router-dom"
import { CareerCraftLogo } from "../components/ui/careercraft-logo"


export function HomePage() {
  const [showResults, setShowResults] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const navigate = useNavigate()

//   // Mock data for demonstration
//   const mockResults = {
//     matchedSkills: ["React", "TypeScript", "Node.js", "Git"],
//     missingSkills: ["GraphQL", "AWS", "Docker"],
//     learningResources: [
//       {
//         title: "GraphQL Fundamentals",
//         url: "https://graphql.org/learn/",
//       },
//       {
//         title: "AWS Certified Solutions Architect",
//         url: "https://aws.amazon.com/certification/",
//       },
//       {
//         title: "Docker for Beginners",
//         url: "https://docs.docker.com/get-started/",
//       },
//     ],
//     coverLetter: `Dear Hiring Manager,

// I am writing to express my strong interest in the position. With my experience in React and TypeScript, I believe I would be a valuable addition to your team.

// I am particularly excited about the opportunity to work with your innovative team and contribute to your mission.

// Best regards,
// [Your Name]`,
//     latexResumeUrl: "/sample-resume.pdf",
//   }

  const handleSubmit = async () => {
    setIsProcessing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setShowResults(true)
    navigate("/results")
  }

  return (
    <div className="space-y-16 text-gray-600 dark:text-gray-300">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center space-y-6"
      >
        <div className="space-y-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm"
          >
            <CareerCraftLogo size="sm" variant="icon" className="mr-2" />
            <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ✨ Powered by CareerCraft AI
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-gray-100 dark:to-white">
              AI-Powered Career
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Crafting Assistant
            </span>
          </h1>

          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Transform your job applications with CareerCraft AI - featuring intelligent resume analysis, skill gap
            identification, and personalized cover letters
          </p>
        </div>
      </motion.div>

      {/* Quick Access Cards */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
      >
        <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-500" />
              <span>Cover Letter Templates</span>
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Professional cover letter templates for every industry
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/cover-letters">
              <Button className="w-full bg-gradient-to-r text-white from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                Browse Templates
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-purple-500" />
              <span>Email Templates</span>
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Professional email templates for networking and follow-ups
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/email-templates">
              <Button className="w-full bg-gradient-to-r text-white from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                Browse Templates
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <JobApplicationForm onSubmit={handleSubmit} />
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
          </motion.div>
        )}
      </AnimatePresence>

      {/* Processing Overlay */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-800/20 max-w-md mx-4"
            >
              <div className="text-center space-y-6">
                {/* Modern Loading Animation */}
                <div className="relative">
                  <CareerCraftLogo size="lg" variant="icon" animated />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    CareerCraft AI Working
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Analyzing your resume and job description with advanced AI
                  </p>
                </div>

                {/* Progress Steps */}
                <div className="space-y-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Parsing documents</span>
                    <span>Generating insights</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
