
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs"
import { Badge } from "../components/ui/badge"
import { Textarea } from "../components/ui/textarea"
import { CheckCircle,  Download, FileText,  Briefcase, Trophy, Star, Code } from "lucide-react"
import { motion } from "framer-motion"
import {client ,getColdEmailById,getCoverletterById , getJobById , getResumeById  } from "../lib/api"
import {   useEffect,useState } from "react"
import { ExpandableText } from "./ui/ExpandableText"
import { useLocation , useNavigate } from "react-router-dom"

interface ResultsDisplayProps {
  matchedSkills: string[]
  missingSkills: string[]
  learningResources: Array<{
    title: string
    url: string
  }>
  coverLetter: string
  latexResumeUrl: string
}



export function ResultsDisplay({
  
  latexResumeUrl,
}: ResultsDisplayProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }
 

  const jobId = localStorage.getItem("jobId") || ""
  const resumeId = localStorage.getItem("resumeId") || "" 
  // const userId = localStorage.getItem("userId") || ""
  const coverLetterId = localStorage.getItem("cover_letterId") || ""
  const emailId=localStorage.getItem("emailId") || ""
  const [jobData, setJobData] = useState<any>(null)
  const [resumeData, setResumeData] = useState<any>(null)
  const [coverLetterData, setCoverLetterData] = useState<any>(null)
  const [coldemailData,setColdemaildata]=useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

useEffect(()=>{
localStorage.removeItem('coverletter_gen');
localStorage.removeItem('coldemail_gen');
},[location.pathname])


  // Fetch job data
  // const fetchJobdata_by_user_id=async()=>{
  //   const jobs=await client.request(GET_JOBS_BY_USER_ID, { userId })
  //   return jobs;
  // }

  const fetchJobdata_by_id=async()=>{
    const job=await client.request(getJobById, { id: jobId }) 
    return job;
  }

  const fetch_coldemail_by_id=async()=>{
    const coldemail=await client.request(getCoverletterById, { id: emailId })
    return coldemail;
  }

  // Fetch resume data
  // const fetchResumedata_by_user_id=async()=>{
  //   const resume=await client.request(GET_RESUME_BY_USER_ID, { userId })
  //   return resume;
  // }

  const fetchResumedata_by_id=async()=>{
    const resume=await client.request(getResumeById, { id: resumeId })
    return resume;
  }

  // Fetch cover letter data

  // const fetchCoverLetterdata_by_user_id=async()=>{
  //   const coverLetter=await client.request(Get_cover_letter_by_userId, { userId })
  //   return coverLetter;
  // }

  const fetchCoverLetterdata_by_id=async()=>{
    const coverLetter=await client.request(getCoverletterById, { id: coverLetterId })
    return coverLetter;
  }

 useEffect(() => {
  let isMounted = true

  const fetchData = async () => {
    const jobId = localStorage.getItem("jobId") || ""
    const resumeId = localStorage.getItem("resumeId") || "" 
    const userId = localStorage.getItem("userId") || ""
    const coverLetterId = localStorage.getItem("cover_letterId") || ""

    try {
      const [job, resume, coverLetter,coldEmail] = await Promise.all([
        client.request(getJobById, { id: jobId }),
        client.request(getResumeById, { id: resumeId }),
        client.request(getCoverletterById, { id: coverLetterId }),
        client.request(getColdEmailById, { id: emailId }),
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
}, []) // empty dependency array ensures this runs only once on mount
console.log(coverLetterData);
console.log(jobData);
console.log(resumeData);
console.log(coldemailData);





 



  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
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

      <div className="grid gap-8 md:grid-cols-2">
        {/* Skills Analysis */}
        {/* <motion.div variants={itemVariants}>
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-white/20 shadow-xl h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-500" />
                <span>Skills Analysis</span>
              </CardTitle>
              <CardDescription>AI-powered skill matching and gap analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium text-green-700 dark:text-green-400 mb-3 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Matched Skills ({matchedSkills.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {matchedSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-orange-700 dark:text-orange-400 mb-3 flex items-center">
                  <XCircle className="w-4 h-4 mr-2" />
                  Skills to Develop ({missingSkills.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {missingSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div> */}

        {/* Learning Resources */}
        {/* <motion.div variants={itemVariants}>
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-white/20 shadow-xl h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-purple-500" />
                <span>Learning Resources</span>
              </CardTitle>
              <CardDescription>Personalized recommendations to bridge skill gaps</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learningResources.map((resource, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-purple-50/50 to-blue-50/50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200/30 dark:border-purple-800/30"
                  >
                    <div className="flex items-center space-x-3">
                      <BookOpen className="w-4 h-4 text-purple-600" />
                      <span className="font-medium">{resource.title}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-600 hover:text-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900/30"
                      asChild
                    >
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div> */}
 {jobData && (
  <motion.div variants={itemVariants}>
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

            <ExpandableText text={jobData?.description} lines={4} />
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

        <Tabs defaultValue="education" className="mt-6 w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-5">
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="more">Other</TabsTrigger>
          </TabsList>

          {/* Education */}
          <TabsContent value="education">
            <h3 className="font-semibold text-lg mb-2">Education</h3>
            <ul className="space-y-2 list-disc list-inside">
              {(resumeData?.resume_data?.Education || resumeData?.resume_data?.education)?.map((edu: any, index: number) => (
                <li key={index}>
                  <p>{edu.degree} at {edu.school} ({edu.duration})</p>
                  {edu.gpa && <p>GPA: {edu.gpa}</p>}
                  {edu.percentage && <p>Percentage: {edu.percentage}</p>}
                </li>
              ))}
            </ul>
          </TabsContent>

          {/* Experience */}
          <TabsContent value="experience">
            <h3 className="font-semibold text-lg mb-2">Experience</h3>
            <ul className="space-y-3 list-disc list-inside">
              {(resumeData?.resume_data?.Experience || resumeData?.resume_data?.experience)?.map((exp: any, index: number) => (
                <li key={index}>
                  <p>{exp.role} at {exp.company} ({exp.duration})</p>
                  <ul className="list-[circle] ml-4">
                    {exp.key_points?.map((point: string, idx: number) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </TabsContent>

          {/* Projects */}
          <TabsContent value="projects">
            <h3 className="font-semibold text-lg mb-2">Projects</h3>
            <ul className="space-y-3 list-disc list-inside">
              {(resumeData?.resume_data?.Projects || resumeData?.resume_data?.projects)?.map((proj: any, index: number) => (
                <li key={index}>
                  <p><strong>{proj.name}</strong>: {proj.description}</p>
                  <p><strong>Technologies:</strong> {proj.technologies.join(", ")}</p>
                </li>
              ))}
            </ul>
          </TabsContent>

          {/* Skills */}
          <TabsContent value="skills">
            <motion.div>
            <h3 className="font-semibold text-lg mb-2">Skills</h3>
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
                          <h3 className="text-lg font-semibold flex items-center gap-2">
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
            {/* <p><strong></strong> {resumeData?.resume_data?.Skills?.join(", ")}</p>
            <p><strong>Databases:</strong> {resumeData?.Skills?.Databases?.join(", ")}</p>
            <p><strong>Frameworks/Tools:</strong> {resumeData?.Skills?.["Frameworks and Tools"]?.join(", ")}</p>
            <p><strong>Interests:</strong> {resumeData?.Skills?.Interests?.join(", ")}</p> */}
          

          {/* Other: Achievements + Positions */}
          <TabsContent value="more">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">Achievements</h3>
                <ul className="list-disc list-inside">
                  {(resumeData?.resume_data?.Achievements || resumeData?.resume_data?.achievements)?.map((ach: string, index: number) => (
                    <li key={index}>{ach}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-1">Positions of Responsibility</h3>
                <ul className="list-disc list-inside">
                  {(resumeData?.resume_data?.["Positions of Responsibility"] || resumeData?.resume_data?.positionsOfResponsibility)?.map((pos: any, index: number) => (
                    <li key={index}>
                      {pos.title || pos.role} at {pos.description}
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
        {/* <Button
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          asChild
        >
          <a href={latexResumeUrl} download>
            <Download className="w-4 h-4 mr-2" />
            Download Enhanced Resume
          </a>
        </Button> */}

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
