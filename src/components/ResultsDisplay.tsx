
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs"
import { Badge } from "../components/ui/badge"
import { Textarea } from "../components/ui/textarea"
import { CheckCircle, FileText,  Briefcase, Trophy, Star, Code } from "lucide-react"
import { motion } from "framer-motion"
import {client ,getColdEmailById,getCoverletterById , getJobById , getResumeById  } from "../lib/api"
import {   useEffect,useState } from "react"
import { ExpandableText } from "./ui/ExpandableText"
import { useLocation , useNavigate } from "react-router-dom"
import type {Resume , CoverLetter , ColdEmail , Job, EducationEntry, ExperienceEntry, ProjectEntry, ResponsibilityEntry} from "../pages/Dashboard"






export function ResultsDisplay() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }
 
  const coverLetterId = localStorage.getItem("cover_letterId") || ""
  const emailId=localStorage.getItem("emailId") || ""
  const [jobData, setJobData] = useState<Job| null>(null)
  const [resumeData, setResumeData] = useState<Resume| null>(null)
  const [coverLetterData, setCoverLetterData] = useState<CoverLetter| null>(null)
  const [coldemailData,setColdemaildata]=useState<ColdEmail | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  interface GetResumeByIdResponse {
  getResumeById: Resume
}

interface GetCoverletterByIdResponse {
  getCoverletterById: CoverLetter
}

interface GetJobbyIdResponse {
  getJobbyId: Job
}

interface GetColdEmailByIdResponse {
  getColdEmailById: ColdEmail
}


useEffect(()=>{
localStorage.removeItem('coverletter_gen');
localStorage.removeItem('coldemail_gen');
},[location.pathname])


  

 useEffect(() => {
  let isMounted = true

  const fetchData = async () => {
    const jobId = localStorage.getItem("jobId") || ""
    const resumeId = localStorage.getItem("resumeId") || "" 
  
    const coverLetterId = localStorage.getItem("cover_letterId") || ""

    try {
      const [job , resume, coverLetter,coldEmail] = await Promise.all([
        client.request<GetJobbyIdResponse>(getJobById, { id: jobId }),
        client.request<GetResumeByIdResponse>(getResumeById, { id: resumeId }),
        client.request<GetCoverletterByIdResponse>(getCoverletterById, { id: coverLetterId }),
        client.request<GetColdEmailByIdResponse>(getColdEmailById, { id: emailId }),
      ])

      if (isMounted) {
        setJobData(job.getJobbyId)
        setResumeData(resume.getResumeById)
        setCoverLetterData(coverLetter.getCoverletterById)
        setColdemaildata(coldEmail?.getColdEmailById)
      }
    } catch (error) {
      console.error("Data fetch error:", error)
    }
  }

  fetchData()

  return () => {
    isMounted = false
  }
}, []) 





 



  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 px-4 sm:px-6 lg:px-8 w-full">
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center space-y-4">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
          <span className="text-sm font-medium text-green-700 dark:text-green-400">Analysis Complete</span>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Your AI-Generated Results
        </h2>
      </motion.div>

      <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2">
       
 {jobData && (
  <motion.div variants={itemVariants} className="w-full">
    <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Briefcase className="w-5 h-5 text-indigo-500" />
          <span>Job Details</span>
        </CardTitle>
        <CardDescription>Details of the job you applied for</CardDescription>
      </CardHeader>

      <CardContent>
        <p><strong>Title:</strong> {jobData?.title}</p>
        <p><strong>Company:</strong> {jobData?.company}</p>
        <p><strong>Location:</strong> {jobData?.location}</p>

        <Tabs defaultValue="description" className="mt-6 w-full">
         

          <TabsContent value="description">
            <h3 className="font-semibold text-lg mb-2">Job Description</h3>

            <ExpandableText text={jobData?.description ?? ""} lines={4} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  </motion.div>
)}



{resumeData && (
  <motion.div variants={itemVariants}>
    <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-emerald-500" />
          <span>Resume Details</span>
        </CardTitle>
        <CardDescription>Your uploaded resume details</CardDescription>
      </CardHeader>

      <CardContent>
        <p><strong>Name:</strong> {resumeData?.resume_data?.Name || resumeData?.resume_data?.name}</p>

        <Tabs defaultValue="education" className="mt-6 w-full ">
          <TabsList className="grid grid-cols-3 md:grid-cols-5">
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="more">Other</TabsTrigger>
          </TabsList>

          {/* Education */}
          <TabsContent value="education">
            <h3 className="font-semibold text-lg mb-2 pt-6">Education</h3>
            <ul className="space-y-2 list-disc ">
              {(resumeData?.resume_data?.Education || resumeData?.resume_data?.education)?.map((edu: EducationEntry, index: number) => (
                <li key={index}>
                  <p>{edu.degree} at {edu.school} ({edu.duration})</p>
                  {edu.details}
                </li>
              ))}
            </ul>
          </TabsContent>

          {/* Experience */}
          <TabsContent value="experience">
            <h3 className="font-semibold text-lg mb-2 pt-6">Experience</h3>
            <ul className="space-y-3 list-disc ">
              {(resumeData?.resume_data?.Experience || resumeData?.resume_data?.experience)?.map((exp: ExperienceEntry, index: number) => (
                <li key={index}>
                  <p>{exp?.title} at {exp.company} ({exp.duration})</p>
                  <ul className="list-[circle] ml-4">
                    {exp?.description}
                  </ul>
                </li>
              ))}
            </ul>
          </TabsContent>

          {/* Projects */}
          <TabsContent value="projects">
            <h3 className="font-semibold text-lg mb-2 pt-6">Projects</h3>
            <ul className="space-y-3 list-disc ">
              {(resumeData?.resume_data?.Projects || resumeData?.resume_data?.projects)?.map((proj: ProjectEntry, index: number) => (
                <li key={index}>
                  <p><strong>{proj.name}</strong>: {proj.description}</p>
                  <p><strong>Technologies:</strong> {(proj?.technologies?.length ? proj.technologies.join(", ") : "")}</p>
                </li>
              ))}
            </ul>
          </TabsContent>

          {/* Skills */}
          <TabsContent value="skills">
            <motion.div>
            <h3 className="font-semibold text-lg mb-2 pt-6">Skills</h3>
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
                            {(resumeData?.resume_data?.skills?.programmingLanguages || resumeData?.resume_data?.Skills?.programmingLanguages)?.map((lang: string, index: number) => (
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
                          <h3 className="text-lg font-semibold flex items-center gap-2 pt-6">
                            <Star className="w-5 h-5 text-teal-600" />
                            Frameworks & Tools
                          </h3>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {(resumeData?.resume_data?.skills?.frameworksAndTools || resumeData?.resume_data?.Skills?.frameworksAndTools)?.map((tool: string, index: number) => (
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
                            {(resumeData?.resume_data?.skills?.databases || resumeData?.resume_data?.Skills?.databases)?.map((db: string, index: number) => (
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
                            {(resumeData?.resume_data?.skills?.areasOfInterest || resumeData?.resume_data?.Skills?.areasOfInterest)?.map((area: string, index: number) => (
                              <Badge key={index} variant="outline" className="border-purple-200 text-purple-700">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>
           
          

          {/* Other: Achievements + Positions */}
          <TabsContent value="more">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-1 pt-6">Achievements</h3>
                <ul className="list-disc list-inside">
                  {(resumeData?.resume_data?.Achievements || resumeData?.resume_data?.achievements)?.map((ach: string, index: number) => (
                    <li key={index}>{ach}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-1 pt-6">Positions of Responsibility</h3>
                <ul className="list-disc list-inside">
                  {resumeData?.resume_data?.PositionsOfResponsibility?.map((pos: ResponsibilityEntry, index: number) => (
                    <li key={index}>
                    {pos.role || ''} at {pos.organization || ""} from {pos.duration || ""}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  </motion.div>
)}

      </div>

       {/* Cover Letter */}

{
  coverLetterId ? 
 <motion.div variants={itemVariants}>
        <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-500" />
              <span>AI-Generated Cover Letter</span>
            </CardTitle>
            <CardDescription>Personalized cover letter based on your resume and job requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={coverLetterData?.data}
              readOnly
              className="min-h-[300px] bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 resize-none"
            />
          </CardContent>
        </Card>
      </motion.div>
      :null
}

 {/* COLD EMAIL */}

 {
  emailId ?
<motion.div variants={itemVariants}>
        <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-500" />
              <span>AI-Generated Cold Email</span>
            </CardTitle>
            <CardDescription>Personalized cold email based on your resume and job requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={coldemailData?.data}
              readOnly
              className="min-h-[300px] bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 resize-none"
            />
          </CardContent>
        </Card>
      </motion.div>
      :null
 }

      {/* Action Buttons */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
       

        <Button
          variant="outline"
          className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-105"
          onClick={() => navigate("/")}
        >
          Start New Analysis
        </Button>
      </motion.div>
    </motion.div>
  )
}
