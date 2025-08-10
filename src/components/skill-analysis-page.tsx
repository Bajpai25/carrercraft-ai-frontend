import { useEffect, useState } from "react"
import { SkillGapResults } from "./skill-gap-results"
import { SkillGapDialog } from "./skill-gap-dialog"
import type { SkillGapData } from "./skill-gap-results"
import { skill_analysis } from "../lib/api"
import { client } from "../lib/api"
import {GET_RESUME_BY_USER_ID , GET_JOBS_BY_USER_ID} from "../lib/api"
import type { Resume , Job } from "../pages/Dashboard"


interface GetResumeByUserIdResponse {
  getResumeByUserId: Resume[]
}
interface GetJobsByUserIdResponse {
  getJobbyUserId: Job[]
}



export function SkillAnalysisPage() {
  const [isDialogOpen, setDialogOpen] = useState(true)
  const [isLoading, setLoading] = useState(false)
  const [result, setResult] = useState<SkillGapData | null>(null)
  const [resumes,setresumeData]=useState<Resume[]>([]);
  const [jobs,setjobData]=useState<Job[]>([]);
  const userId = localStorage.getItem("userId") || "";

  
const fetchResumedata_by_user_id = async (): Promise<GetResumeByUserIdResponse> => {
  return await client.request(GET_RESUME_BY_USER_ID, { userId })
}
const fetchJobsdata_by_user_id = async (): Promise<GetJobsByUserIdResponse> => {
  return await client.request(GET_JOBS_BY_USER_ID, { userId })
}

 const loadData=async()=>{
  const resData=await fetchResumedata_by_user_id();
  setresumeData(resData.getResumeByUserId || []);
  const jobData=await fetchJobsdata_by_user_id();
  setjobData(jobData.getJobbyUserId || []);
}


useEffect(()=>{
  if(isDialogOpen){
    loadData();
  }
},[])



  const handleAnalyze = async (resumeId: string, jobId: string, userId:string) => {
    setLoading(true)
    try {
      const data = await skill_analysis(resumeId, jobId,userId)
      setResult(data)
      setDialogOpen(false)
    } catch (error) {
      console.error("Failed to analyze skill gap", error)
    } finally {
      setLoading(false)
    }
  }

  const handleNewAnalysis = () => {
    setResult(null)
    setDialogOpen(true)
  }

  return (
    <div className="p-6">
      <SkillGapDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onAnalyze={handleAnalyze}
        isLoading={isLoading}
        resumes={resumes} 
        jobs={jobs}
      />

      {!isDialogOpen && result && (
        <SkillGapResults data={result} onNewAnalysis={handleNewAnalysis} />
      )}

      {!isDialogOpen && !result && (
        <div className="text-center text-gray-600 mt-10">
          <p>No analysis result yet.</p>
        </div>
      )}
    </div>
  )
}
