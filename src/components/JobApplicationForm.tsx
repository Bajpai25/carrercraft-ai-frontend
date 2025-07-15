
import type React from "react"
import {  useState } from "react"
import { uploadAndParseResume, uploadJob, generateFinalOutput } from "../lib/api"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Card, CardContent } from "./ui/card"
import { Dialog, DialogContent } from "./ui/dialog"
import {
  Sparkles,
  ArrowRight,
  FileText,
  Briefcase,
  CheckCircle,
  Zap,
  ChevronRight,
  Upload,
  Brain,
  Wand2,
  Rocket,
  Target,
  Clock,
} from "lucide-react"
import { CareerCraftLogo } from "./ui/careercraft-logo"
import { useAuth } from "./auth-provider"



export interface CoverLetterOutput {
  id: string
  fileUrl: string
  data?: string
  createdAt: string
  userId: string
  type: "cover_letter"
}

export interface ColdEmailOutput {
  id: string
  fileUrl?: string
  data?: string
  createdAt: string
  userId: string
  type: "cold_email"
}

export type GeneratedOutput = CoverLetterOutput | ColdEmailOutput

interface JobApplicationFormProps {
  onSubmit: (payload: GeneratedOutput) => void
}


export function JobApplicationForm({ onSubmit }: JobApplicationFormProps) {
  const {user} = useAuth()
  const [resume, setResume] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [jobSource, setJobSource] = useState("greenhouse")
  const [templateType, setTemplateType] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState("")
  const [dragActive, setDragActive] = useState(false)

const [resumeId, setResumeId] = useState('');

const handleResumeIdSubmit = () => {
  if (!resumeId.trim()) return;
  // 👉 Do your logic here: fetch resume by ID, validate, etc.
  console.log("Submitted Resume ID:", resumeId);
  localStorage.setItem("resumeId",resumeId);
   setCurrentStep(currentStep + 1)
  // Example: setResume({...}) or go to next step
};

  const steps = [
    {
      id: "welcome",
      title: "Welcome to CareerCraft AI",
      description: "Your AI-powered career companion",
      icon: Sparkles,
      color: "from-blue-500 to-purple-600",
    },
    {
      id: "resume",
      title: "Upload Your Resume",
      description: "Let our AI analyze your professional background",
      icon: FileText,
      color: "from-emerald-500 to-teal-600",
    },
    {
      id: "job",
      title: "Job Information",
      description: "Provide the job posting details",
      icon: Briefcase,
      color: "from-purple-500 to-pink-600",
    },
    {
      id: "template",
      title: "Choose Output Type",
      description: "Select what you want to generate",
      icon: Wand2,
      color: "from-orange-500 to-red-500",
    },
    {
      id: "generate",
      title: "AI Generation",
      description: "Creating your personalized content",
      icon: Brain,
      color: "from-indigo-500 to-blue-600",
    },
  ]

  const loadingSteps = [
    { text: "Analyzing your resume...", icon: FileText, duration: 2000 },
    { text: "Understanding job requirements...", icon: Target, duration: 2000 },
    { text: "Matching skills and experience...", icon: Brain, duration: 2000 },
    { text: "Crafting personalized content...", icon: Wand2, duration: 2000 },
    { text: "Finalizing your document...", icon: Rocket, duration: 1000 },
  ]

  const startProcess = () => {
    setCurrentStep(0)
    setIsDialogOpen(true)
  }

  const nextStep = async () => {
    if (currentStep === 1 && resume) {
      setLoading(true)
      setLoadingStep("Uploading and parsing your resume...")
      try {
        const userId= localStorage.getItem("userId") || ""
        await uploadAndParseResume(resume, userId)
        setCurrentStep(currentStep + 1)
      } catch (err: unknown) {
        console.error("Error uploading resume:", err)
        alert("Failed to upload resume")
      } finally {
        setLoading(false)
        setLoadingStep("")
      }
    } else if (currentStep === 2 && jobDescription) {
      setLoading(true)
      setLoadingStep("Fetching and analyzing job data...")
      try {
        const userId= localStorage.getItem("userId") || ""
        await uploadJob(jobDescription, jobSource, userId)
        setCurrentStep(currentStep + 1)
      } catch (err:unknown) {
        console.log(err)
        alert("Failed to fetch job data")
      } finally {
        setLoading(false)
        setLoadingStep("")
      }
    } else if (currentStep === 3 && templateType) {
      setCurrentStep(currentStep + 1)
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleFinalSubmit = async () => {
    setLoading(true)
    setCurrentStep(4) // Move to generation step

    // Simulate the loading steps animation
    for (let i = 0; i < loadingSteps.length; i++) {
      setLoadingStep(loadingSteps[i].text)
      await new Promise((resolve) => setTimeout(resolve, loadingSteps[i].duration))
    }

    try {
      const resumeId = localStorage.getItem("resumeId")
      const jobId = localStorage.getItem("jobId")
      const userId= localStorage.getItem("userId") || ""
      if (!resumeId || !jobId || !templateType) {
        alert("Missing data to generate output")
        return
      }
      const result = await generateFinalOutput(
        resumeId,
        jobId,
        userId,
        templateType === "email" ? "cold_email" : "cover_letter",
      )
      console.log("Generated output:", result)
      onSubmit(result)
      setIsDialogOpen(false)
    } catch (err:unknown) {
      console.log(err)
      alert("Failed to generate output")
    } finally {
      setLoading(false)
      setLoadingStep("")
    }
  }

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setResume(file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type === "application/pdf" || file.type.includes("document")) {
        setResume(file)
      }
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return true
      case 1:
        return !!resume
      case 2:
        return !!jobDescription.trim()
      case 3:
        return !!templateType
      case 4:
        return true
      default:
        return false
    }
  }

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Landing Page */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl pt-12 "
      >
        <Card className="overflow-hidden shadow-2xl  border-0 rounded-3xl">
          <div className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 p-16 text-white">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute top-0 right-0 w-96 h-96  rounded-full blur-3xl"
                animate={{
                  x: [0, 50, 0],
                  y: [0, -30, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-64 h-64  rounded-full blur-3xl"
                animate={{
                  x: [0, -30, 0],
                  y: [0, 20, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
            </div>

            <div className="relative z-10 text-center space-y-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm"
              >
                <CareerCraftLogo size="lg" variant="icon" animated />
              </motion.div>

              <div className="space-y-6">
                <motion.h1
                  className="md:text-6xl text-3xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  CareerCraft
                  <br />
                  <span className="bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                    AI Assistant
                  </span>
                </motion.h1>

                <motion.p
                  className="md:text-2xl text-lg text-center text-blue-100 md:max-w-3xl w-auto  leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  Transform your job applications with AI-powered cover letters and cold emails that get you noticed
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="flex flex-col items-center"
              >
                {user?
                <Button
  onClick={startProcess}
  size="lg"
  className="bg-white text-blue-600 hover:bg-blue-50 font-bold text-base sm:text-md md:text-xl   rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group flex flex-wrap items-center justify-center text-center "
><div className="flex flex-row gap-4"> 
  <Sparkles className="w-7 h-7 mr-2 group-hover:animate-spin mt-1" />
  <span className="whitespace-nowrap ">Start Your AI Journey</span>
 
  <ArrowRight className=" w-7 h-7  group-hover:translate-x-2 transition-transform mt-2" />
   </div>
</Button>

                :
                null
                }
                
              </motion.div>
            </div>
          </div>

          <CardContent className="md:p-16 p-6 bg-gradient-to-b from-white to-gray-50/50">
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:text-center text-left">
              {[
                {
                  icon: Brain,
                  title: "AI-Powered Analysis",
                  description: "Advanced algorithms analyze your resume and match it perfectly with job requirements",
                  color: "from-blue-500 to-cyan-500",
                  stats: "85% Accuracy",
                },
                {
                  icon: Wand2,
                  title: "Personalized Content",
                  description: "Generate unique, compelling cover letters and emails tailored to each opportunity",
                  color: "from-purple-500 to-pink-500",
                  stats: "3x Higher Response",
                },
                {
                  icon: Rocket,
                  title: "Instant Results",
                  description: "Get professional-quality documents in seconds, not hours of manual writing",
                  color: "from-emerald-500 to-teal-500",
                  stats: "< 90 Seconds",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.2, duration: 0.8 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative text-center p-10  rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-4 border border-gray-100">
                    <div
                      className={`w-20 h-20 mx-auto  rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-10 h-10  text-white" />
                    </div>
                    <div className={`w-16 h-1 bg-gradient-to-r ${feature.color} rounded-full mx-auto mb-6`}></div>
                    <h3 className="font-bold text-gray-800 mb-4 text-xl">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                    <div
                      className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${feature.color} text-white text-sm font-semibold`}
                    >
                      {feature.stats}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </CardContent>
        </Card>
      </motion.div>

      {/* Advanced Dialog */}
      <Dialog  open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="
    w-full max-w-[95%] sm:max-w-4xl 
    p-0 sm:p-0 overflow-y-auto border-0 
    bg-transparent shadow-2xl 
    sm:rounded-3xl 
  ">
          <AnimatePresence mode="wait">
           <motion.div
  key={currentStep}
  initial={{ opacity: 0, scale: 0.95, y: 20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.95, y: -20 }}
  transition={{ duration: 0.4 }}
  className="bg-white rounded-none sm:rounded-3xl shadow-2xl overflow-hidden"
>
             
              {/* Content */}
              <div className="
  p-4 sm:p-6 
  bg-gradient-to-b from-white to-gray-50/30 
   overflow-y-auto w-full
">
                <AnimatePresence mode="wait">
                  {/* Welcome Step */}
                  {currentStep === 0 && (
                    <motion.div
                      key="welcome"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      className="text-center space-y-4"
                    >
                       <div className="p-4 sm:p-6 bg-gradient-to-b from-white to-gray-50/30  md:w-auto w-[200px] overflow-y-auto">
                        <motion.div
                          className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl"
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <Sparkles className="w-12 h-12 text-white" />
                        </motion.div>
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-gray-800">Ready to revolutionize your job search?</h3>
                          <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
                            Our advanced AI will analyze your resume, understand job requirements, and create
                            compelling, personalized content that makes you stand out from hundreds of other applicants.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
                        <motion.div
                          className="p-8 rounded-2xl bg-blue-50 border-2 border-blue-100"
                          whileHover={{ scale: 1.05, y: -5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="text-4xl mb-4">🎯</div>
                          <div className="font-bold text-blue-800 mb-2 text-lg">Smart Matching</div>
                          <div className="text-blue-600">AI-powered skill analysis and gap identification</div>
                        </motion.div>
                        <motion.div
                          className="p-8 rounded-2xl bg-purple-50 border-2 border-purple-100"
                          whileHover={{ scale: 1.05, y: -5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="text-4xl mb-4">✨</div>
                          <div className="font-bold text-purple-800 mb-2 text-lg">Custom Content</div>
                          <div className="text-purple-600">Personalized letters that get you noticed</div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {/* Resume Upload Step */}
                  {currentStep === 1 && (
                    <motion.div
                      key="resume"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      className="space-y-4"
                    >
                      <div className="relative">
                        <input
                          id="resume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleResumeUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <motion.div
                          className={`
                            relative border-4 border-dashed rounded-3xl p-16 text-center transition-all duration-500
                            ${
                              dragActive
                                ? "border-emerald-400 bg-emerald-50 scale-105 shadow-2xl"
                                : resume
                                  ? "border-emerald-500 bg-emerald-50 shadow-xl"
                                  : "border-gray-300 hover:border-emerald-400 hover:bg-emerald-50/50 hover:shadow-lg"
                            }
                          `}
                          onDragEnter={handleDrag}
                          onDragLeave={handleDrag}
                          onDragOver={handleDrag}
                          onDrop={handleDrop}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <AnimatePresence mode="wait">
                            {resume ? (
                              <motion.div
                                key="uploaded"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="space-y-2"
                              >
                                <motion.div
                                  className="w-16 h-16 mx-auto rounded-full bg-emerald-500 flex items-center justify-center shadow-xl"
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                >
                                  <CheckCircle className="w-8 h-8 text-white" />
                                </motion.div>
                                <div className="space-y-2">
                                  <p className="text-2xl font-bold text-emerald-700">{resume.name}</p>
                                  <p className="text-emerald-600 text-lg">
                                    {(resume.size / 1024 / 1024).toFixed(2)} MB • Ready for AI analysis
                                  </p>
                                </div>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="lg"
                                  onClick={() => setResume(null)}
                                  className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 px-8 py-3"
                                >
                                  <Upload className="w-5 h-5 mr-2" />
                                  Change File
                                </Button>
                              </motion.div>
                            ) : (
                              <motion.div
                                key="upload"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="space-y-8"
                              >
                                <motion.div
                                  animate={{
                                    y: [0, -20, 0],
                                    rotate: [0, 5, -5, 0],
                                  }}
                                  transition={{
                                    duration: 3,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut",
                                  }}
                                >
                                  <Upload className="mx-auto h-16 w-16 text-emerald-500" />
                                </motion.div>
                                <div className="space-y-2">
                                  <p className="text-xl font-bold text-gray-800">
                                    Drop your resume here or click to browse
                                  </p>
                                  <p className="text-gray-600 text-lg">Supports PDF, DOC, DOCX • Maximum 10MB</p>
                                </div>
                                <div className="flex items-center justify-center space-x-8 text-gray-500">
                                  <motion.span className="flex items-center space-x-3" whileHover={{ scale: 1.1 }}>
                                    <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <span className="font-medium">Secure Upload</span>
                                  </motion.span>
                                  <motion.span className="flex items-center space-x-3" whileHover={{ scale: 1.1 }}>
                                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                                    <span className="font-medium">AI Ready</span>
                                  </motion.span>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                        
                      </div>
                      {/* Divider */}
{/* <div className="flex items-center justify-center space-x-4 ">
  <div className="h-px flex-1 bg-gray-300"></div>
  <span className="text-gray-500 font-medium">OR</span>
  <div className="h-px flex-1 bg-gray-300"></div>
</div> */}

{/* Resume ID input */}
<motion.div
  initial={{ opacity: 0, y: 5 }}
  animate={{ opacity: 1, y: 5 }}
  className="flex flex-col items-center space-y-1"
>
  <label htmlFor="resumeId" className="text-lg font-semibold text-gray-700">
    Enter your Resume ID
  </label>
  <div className="relative w-full max-w-md">
    <input
      type="text"
      id="resumeId"
      placeholder="e.g. 123e4567-e89b-12d3-a456-426614174000"
      value={resumeId}
      onChange={(e) => setResumeId(e.target.value)}
      className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 shadow-sm text-gray-800 transition"
    />
    {resumeId && (
      <button
        type="button"
        onClick={() => setResumeId('')}
        className="absolute right-3 top-1/4 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>
    )}
    {resumeId && (
      <div className="flex justify-center items-center py-2">
 <button
        type="button"
        onClick={handleResumeIdSubmit}
        className="bg-gradient-to-r text-lg from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold px-2 mt-2 w-1/2 py-2 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 group"
      >
        Submit
      </button>
      </div>
    )}
   
  </div>
</motion.div>
                    </motion.div>
                    
                  )}

                  {/* Job Details Step */}
                  {currentStep === 2 && (
                    <motion.div
                      key="job"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <Label
                          htmlFor="job-link"
                          className="text-xl font-bold text-gray-800 flex items-center space-x-3"
                        >
                          <Briefcase className="w-6 h-6 text-purple-500" />
                          <span>Job Posting URL</span>
                        </Label>
                        <motion.input
                          id="job-link"
                          type="url"
                          placeholder="https://jobs.greenhouse.io/company/role-id"
                          value={jobDescription}
                          onChange={(e) => setJobDescription(e.target.value)}
                          className="w-full px-4 py-4 rounded-xl border-3 border-gray-200 focus:border-purple-500 bg-white shadow-lg text-xl transition-all duration-300 focus:shadow-xl"
                          whileFocus={{ scale: 1.02 }}
                        />
                      </div>

                      <div className="space-y-4">
                        <Label
                          htmlFor="job-source"
                          className="text-xl font-bold text-gray-800 flex items-center space-x-3"
                        >
                          <Target className="w-6 h-6 text-purple-500" />
                          <span>Job Source Platform</span>
                        </Label>
                        <motion.select
                          id="job-source"
                          value={jobSource}
                          onChange={(e) => setJobSource(e.target.value)}
                          className="w-full px-4 py-4 rounded-xl border-3 border-gray-200 focus:border-purple-500 bg-white shadow-lg text-xl transition-all duration-300 focus:shadow-xl"
                          whileFocus={{ scale: 1.02 }}
                        >
                          <option value="greenhouse">🌱 Greenhouse</option>
                          <option value="workday">💼 Workday</option>
                          <option value="jobslever">🎯 JobsLever</option>
                          <option value="jobsvite">🚀 JobsVite</option>
                          <option value="keka">🚀 Keka</option>
                        </motion.select>
                      </div>

                      <motion.div
                        className="p-8 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-100"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-lg">💡</span>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-bold text-purple-800 text-lg">Pro Tip</h4>
                            <p className="text-purple-700 leading-relaxed">
                              Paste the URL of the job posting from one of the supported platforms. Our AI will extract
                              and analyze the job requirements, company culture, and key skills to create the perfect
                              match.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Template Selection Step */}
                  {currentStep === 3 && (
                    <motion.div
                      key="template"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      className="space-y-6"
                    >
                      <div className="text-center space-y-2">
                        <h3 className="text-xl font-bold text-gray-800">What would you like to generate?</h3>
                        <p className="text-gray-600 text-lg">Choose the type of content our AI will create for you</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          className={`p-4  rounded-2xl border-4 cursor-pointer transition-all duration-500 ${
                            templateType === "cover-letter"
                              ? "border-blue-500 bg-blue-50 shadow-2xl scale-105"
                              : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-xl"
                          }`}
                          onClick={() => setTemplateType("cover-letter")}
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="text-center space-y-4">
                            <motion.div
                              className="w-20 h-20 mx-auto rounded-full bg-blue-500 flex items-center justify-center shadow-xl"
                              animate={templateType === "cover-letter" ? { rotate: [0, 360] } : {}}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            >
                              <FileText className="w-10 h-10 text-white" />
                            </motion.div>
                            <div className="space-y-3">
                              <h3 className="text-xl font-bold text-gray-800">Cover Letter</h3>
                              <p className="text-gray-600 leading-relaxed text-lg">
                                Professional cover letter tailored to the specific job requirements, highlighting your
                                relevant experience and achievements
                              </p>
                            </div>
                            {templateType === "cover-letter" && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="inline-flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-full"
                              >
                                <CheckCircle className="w-5 h-5" />
                                <span className="font-medium">Selected</span>
                              </motion.div>
                            )}
                          </div>
                        </motion.div>

                        <motion.div
                          className={`p-4 rounded-2xl border-4 cursor-pointer transition-all duration-500 ${
                            templateType === "email"
                              ? "border-purple-500 bg-purple-50 shadow-2xl scale-105"
                              : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 hover:shadow-xl"
                          }`}
                          onClick={() => setTemplateType("email")}
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="text-center space-y-4">
                            <motion.div
                              className="w-20 h-20 mx-auto rounded-full bg-purple-500 flex items-center justify-center shadow-xl"
                              animate={templateType === "email" ? { rotate: [0, 360] } : {}}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            >
                              <Briefcase className="w-10 h-10 text-white" />
                            </motion.div>
                            <div className="space-y-3">
                              <h3 className="text-xl font-bold text-gray-800">Cold Email</h3>
                              <p className="text-gray-600 leading-relaxed text-lg">
                                Professional email for networking, direct outreach to hiring managers, or follow-ups
                                that get responses
                              </p>
                            </div>
                            {templateType === "email" && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="inline-flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-full"
                              >
                                <CheckCircle className="w-5 h-5" />
                                <span className="font-medium">Selected</span>
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {/* Generation Step */}
                  {currentStep === 4 && (
                    <motion.div
                      key="generate"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      className="text-center space-y-10"
                    >
                      <div className="space-y-8">
                        <motion.div
                          className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 flex items-center justify-center shadow-2xl"
                          animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            rotate: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                            scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                          }}
                        >
                          <Brain className="w-8 h-8 text-white" />
                        </motion.div>

                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-gray-800">AI is Working Its Magic!</h3>
                          <motion.p
                            className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed"
                            key={loadingStep}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            {loadingStep || "Preparing to analyze your data..."}
                          </motion.p>
                        </div>

                        {/* Animated Progress Steps */}
                        <div className="space-y-3">
                          {loadingSteps.map((step, index) => {
                            const isActive = loadingStep === step.text
                            const isCompleted = loadingSteps.findIndex((s) => s.text === loadingStep) > index

                            return (
                              <motion.div
                                key={index}
                                className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-500 ${
                                  isActive
                                    ? "bg-blue-50 border-2 border-blue-200"
                                    : isCompleted
                                      ? "bg-green-50 border-2 border-green-200"
                                      : "bg-gray-50 border-2 border-gray-100"
                                }`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <motion.div
                                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                    isActive ? "bg-blue-500" : isCompleted ? "bg-green-500" : "bg-gray-300"
                                  }`}
                                  animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                                >
                                  {isCompleted ? (
                                    <CheckCircle className="w-6 h-6 text-white" />
                                  ) : (
                                    <step.icon className="w-6 h-6 text-white" />
                                  )}
                                </motion.div>
                                <span
                                  className={`font-medium text-lg ${
                                    isActive ? "text-blue-700" : isCompleted ? "text-green-700" : "text-gray-500"
                                  }`}
                                >
                                  {step.text}
                                </span>
                                {isActive && (
                                  <motion.div
                                    className="ml-auto"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                  >
                                    <Clock className="w-6 h-6 text-blue-500" />
                                  </motion.div>
                                )}
                              </motion.div>
                            )
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation */}
                {currentStep < 4 && (
                  <div className="flex items-center justify-between pt-10 border-t border-gray-200 mt-10">
                    <div className="flex space-x-2">
                      {steps.slice(0, 4).map((_, index) => (
                        <motion.div
                          key={index}
                          className={`h-3 rounded-full transition-all duration-500 ${
                            index === currentStep
                              ? "bg-gradient-to-r from-blue-500 to-purple-500 w-12"
                              : index < currentStep
                                ? "bg-blue-400 w-3"
                                : "bg-gray-200 w-3"
                          }`}
                          layoutId={`progress-${index}`}
                        />
                      ))}
                    </div>

                    <div className="flex space-x-4">
                      {currentStep < 3 ? (
                        <Button
                          onClick={nextStep}
                          disabled={!canProceed() || loading}
                          size="lg"
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 group"
                        >
                          {loading ? (
                            <>
                              <motion.div
                                className="w-6 h-6 mr-3"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              >
                                <Clock className="w-6 h-6" />
                              </motion.div>
                              Processing...
                            </>
                          ) : (
                            <>
                              Next Step
                              <ChevronRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </Button>
                      ) : (
                        <Button
                          onClick={handleFinalSubmit}
                          disabled={!canProceed() || loading}
                          size="lg"
                          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group"
                        >
                          <Zap className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                          Generate with AI
                          <Rocket className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  )
}



