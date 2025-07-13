import { useState } from "react"
import { SkillGapResults } from "./skill-gap-results"
import { SkillGapDialog } from "./skill-gap-dialog"
import type { SkillGapData } from "./skill-gap-results"
import { skill_analysis } from "../lib/api"


export function SkillAnalysisPage() {
  const [isDialogOpen, setDialogOpen] = useState(true)
  const [isLoading, setLoading] = useState(false)
  const [result, setResult] = useState<SkillGapData | null>(null)

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
