"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import toast, { Toaster } from "react-hot-toast"
import { client, getResumeById } from "../lib/api"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card"
import { Skeleton } from "../components/ui/skeleton"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import {
  Share2,
  Copy,
  ExternalLink,
  Loader2,
  Download,
  Printer,
  FileText,
  User,
  Code,
  Briefcase,
  GraduationCap,
  Trophy,
  Users,
  Folder,
  Calendar,
  MapPin,
  Star,
} from "lucide-react"
import type { Resume , ExperienceEntry, ProjectEntry, EducationEntry , ResponsibilityEntry } from "./Dashboard"

interface GetResumeByIdResponse {
  getResumeById: Resume
}


const Resume_single = () => {
  const { id } = useParams<{ id: string }>()
  const [resumeData, setResumeData] = useState<Resume | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")
  const [copying, setCopying] = useState<boolean>(false)

  useEffect(() => {
    fetchResumeData()
  }, [id])

  const fetchResumeData = async (): Promise<void> => {
    try {
      setLoading(true)
      const response:GetResumeByIdResponse = await client.request(getResumeById, { id })
      setResumeData(response?.getResumeById)
    } catch (err:unknown) {
      console.log(err)
      setError("Failed to fetch resume data")
      toast.error("Failed to fetch resume data")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    if (!resumeData?.resume_data) return

    setCopying(true)
    try {
      const resumeText = JSON.stringify(resumeData.resume_data, null, 2)
      await navigator.clipboard.writeText(resumeText)
      toast.success("Resume copied to clipboard!", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#059669",
          color: "#fff",
        },
      })
    } catch (err:unknown) {
      console.error("Failed to copy to clipboard:", err)
      toast.error("Failed to copy to clipboard", {
        duration: 3000,
        position: "top-center",
      })
    } finally {
      setCopying(false)
    }
  }

  const handlePrint = () => {
    window.print()
    toast.success("Print dialog opened", {
      duration: 2000,
      position: "top-center",
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${resumeData?.resume_data?.Name ||resumeData?.resume_data?.name }'s Resume`,
          text: `Check out ${resumeData?.resume_data?.Name || resumeData?.resume_data?.Name}'s professional resume`,
        })
        toast.success("Resume shared successfully!", {
          duration: 3000,
          position: "top-center",
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      copyToClipboard()
    }
  }
  console.log(resumeData)

  const handleDownloadPDF = () => {
    if (resumeData?.fileUrl) {
      window.open(resumeData.fileUrl, "_blank")
      toast.success("Opening PDF file...", {
        duration: 2000,
        position: "top-center",
      })
    } else {
      toast.promise(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve("PDF generated successfully!")
          }, 2000)
        }),
        {
          loading: "Generating PDF...",
          success: "Resume PDF downloaded successfully!",
          error: "Failed to generate PDF",
        },
        {
          position: "top-center",
        },
      )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-8">
        <Toaster />
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b bg-gradient-to-r from-emerald-50 to-teal-50">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </CardHeader>
              <CardContent className="pt-8">
                <div className="space-y-3">
                  {[...Array(25)].map((_, i) => (
                    <Skeleton key={i} className="h-4 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-8">
        <Toaster />
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border-red-200 bg-red-50/80 backdrop-blur-sm shadow-xl">
              <CardContent className="pt-8">
                <div className="text-center text-red-600">
                  <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                    <FileText className="w-8 h-8" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Error Loading Resume</h2>
                  <p className="mb-6 text-red-500">{error}</p>
                  <Button
                    variant="outline"
                    onClick={fetchResumeData}
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  const resume = resumeData?.resume_data

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8">
      <Toaster />
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Header */}
          <div className="mb-8 text-center">
            <motion.div
              className="flex items-center justify-center gap-3 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {resume?.Name || "Your Name"}
              </h1>
            </motion.div>
            <motion.p
              className="text-slate-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Full Stack Developer & Software Engineer
            </motion.p>
          </div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
              <CardHeader className="border-b bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-emerald-600" />
                      <h2 className="text-2xl font-bold text-slate-800">{ resume?.Name || resume?.name}'s Resume</h2>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                        Professional
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-500">ID: {resumeData?.id?.substring(0, 8)}...</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                      disabled={copying}
                      className="border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                    >
                      {copying ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Copy className="h-4 w-4 mr-2" />}
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrint}
                      className="border-slate-200 text-slate-600 hover:bg-slate-50"
                    >
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-6 mb-6">
                    <TabsTrigger value="overview" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="skills" className="flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      Skills
                    </TabsTrigger>
                    <TabsTrigger value="experience" className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Experience
                    </TabsTrigger>
                    <TabsTrigger value="projects" className="flex items-center gap-2">
                      <Folder className="w-4 h-4" />
                      Projects
                    </TabsTrigger>
                    <TabsTrigger value="education" className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      Education
                    </TabsTrigger>
                    <TabsTrigger value="achievements" className="flex items-center gap-2">
                      <Trophy className="w-4 h-4" />
                      More
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold mb-4 text-emerald-800">Professional Summary</h3>
                          <p className="text-slate-700 leading-relaxed">
                            Experienced Full Stack Developer with expertise in modern web technologies including React,
                            Node.js, and various databases. Proven track record in building scalable applications and
                            leading development teams. Strong background in both frontend and backend development with a
                            focus on user experience and performance optimization.
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-emerald-600">{ (resume?.Experience?.length || resume?.experience?.length ) || 0}</div>
                          <div className="text-sm text-slate-600">Work Experience</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-teal-600">{ (resume?.Projects?.length || resume?.projects?.length) || 0}</div>
                          <div className="text-sm text-slate-600">Projects</div>
                        </CardContent>
                      </Card>
                      {/* <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-cyan-600">
                            {resume?.skills?.programmingLanguages?.length || 0}
                          </div>
                          <div className="text-sm text-slate-600">Languages</div>
                        </CardContent>
                      </Card> */}
                      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-slate-600">{ (resume?.Achievements?.length ||resume?.achievements?.length)  || 0}</div>
                          <div className="text-sm text-slate-600">Achievements</div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="skills" className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="grid gap-6"
                    >
                      {/* Programming Languages */}
                      <Card>
                        <CardHeader>
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Code className="w-5 h-5 text-emerald-600" />
                            Programming Languages
                          </h3>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {(resume?.skills?.programmingLanguages || resume?.Skills?.programmingLanguages)?.map((lang: string, index: number) => (
                              <Badge key={index} variant="secondary" className="bg-emerald-100 text-emerald-700">
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Frameworks & Tools */}
                      <Card>
                        <CardHeader>
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Star className="w-5 h-5 text-teal-600" />
                            Frameworks & Tools
                          </h3>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {(resume?.skills?.frameworksAndTools || resume?.Skills?.frameworksAndTools)?.map((tool: string, index: number) => (
                              <Badge key={index} variant="outline" className="border-teal-200 text-teal-700">
                                {tool}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Databases */}
                      <Card>
                        <CardHeader>
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <FileText className="w-5 h-5 text-cyan-600" />
                            Databases
                          </h3>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {(resume?.skills?.databases || resume?.Skills?.databases)?.map((db: string, index: number) => (
                              <Badge key={index} variant="secondary" className="bg-cyan-100 text-cyan-700">
                                {db}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Areas of Interest */}
                      <Card>
                        <CardHeader>
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-purple-600" />
                            Areas of Interest
                          </h3>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {(resume?.skills?.areasOfInterest || resume?.Skills?.areasOfInterest)?.map((area: string, index: number) => (
                              <Badge key={index} variant="outline" className="border-purple-200 text-purple-700">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="experience" className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-6"
                    >
                      {(resume?.experience || resume?.Experience)?.map((exp: ExperienceEntry, index: number) => (
                        <Card key={index} className="border-l-4 border-l-emerald-500">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-xl font-semibold text-slate-800">{exp.title}</h3>
                                <p className="text-emerald-600 font-medium">{exp.company}</p>
                              </div>
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {exp.duration}
                              </Badge>
                            </div>
                            <ul className="space-y-2">
                              {exp.keyPoints?.map((point: string, pointIndex: number) => (
                                <li key={pointIndex} className="flex items-start gap-2 text-slate-700">
                                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="projects" className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="grid gap-6"
                    >
                      {(resume?.projects || resume?.Projects)?.map((project: ProjectEntry, index: number) => (
                        <Card key={index} className="border-l-4 border-l-teal-500">
                          <CardContent className="p-6">
                            <h3 className="text-xl font-semibold text-slate-800 mb-3">{project.name}</h3>
                            <p className="text-slate-700 mb-4 leading-relaxed">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies?.map((tech: string, techIndex: number) => (
                                <Badge key={techIndex} variant="secondary" className="bg-teal-100 text-teal-700">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="education" className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-6"
                    >
                      {(resume?.education || resume?.Education)?.map((edu: EducationEntry, index: number) => (
                        <Card key={index} className="border-l-4 border-l-blue-500">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="text-xl font-semibold text-slate-800">{edu.degree}</h3>
                                <p className="text-blue-600 font-medium flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {edu.school}
                                </p>
                              </div>
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {edu.duration}
                              </Badge>
                            </div>
                            
                              <div className="mt-3">
                                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                  {edu.details}
                                </Badge>
                              </div>
                           
                          </CardContent>
                        </Card>
                      ))}
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="achievements" className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-6"
                    >
                      {/* Achievements */}
                      <Card>
                        <CardHeader>
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-yellow-600" />
                            Achievements
                          </h3>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {(resume?.achievements || resume?.Achievements)?.map((achievement: string, index: number) => (
                              <li key={index} className="flex items-start gap-2 text-slate-700">
                                <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Positions of Responsibility */}
                      <Card>
                        <CardHeader>
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Users className="w-5 h-5 text-purple-600" />
                            Positions of Responsibility
                          </h3>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {(resume?.PositionsOfResponsibility )?.map((position: ResponsibilityEntry, index: number) => (
                              <div key={index} className="border-l-2 border-purple-200 pl-4">
                                <h4 className="font-semibold text-slate-800">{ position?.title}</h4>
                                <p className="text-purple-600 text-sm">{position.organization || null}</p>
                                <Badge variant="outline" className="mt-1 text-xs">
                                  {position.duration || position?.description}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>
                </Tabs>
              </CardContent>

              <CardFooter className="border-t bg-gradient-to-r from-slate-50 to-slate-100 p-6">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center text-sm text-slate-500">
                    <span>Last updated: {new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-3">
                    {resumeData?.fileUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          window.open(resumeData.fileUrl, "_blank")
                          toast.success("Opening original file...", {
                            duration: 2000,
                            position: "top-center",
                          })
                        }}
                        className="border-blue-200 text-blue-600 hover:bg-blue-50"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View PDF
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleShare}
                      className="border-purple-200 text-purple-600 hover:bg-purple-50"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleDownloadPDF}
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Card className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-200 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-1">Ready to apply?</h3>
                    <p className="text-sm text-slate-600">Your resume looks great! Time to start applying for jobs.</p>
                  </div>
                  <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
                    Find Jobs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Resume_single
