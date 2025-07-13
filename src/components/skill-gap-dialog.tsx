
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent } from "../components/ui/card"
import { ChevronRight, ChevronLeft, FileText, Briefcase, Zap, Loader2 } from "lucide-react"
// import type { SkillGapData } from "./skill-gap-results"

interface SkillGapDialogProps {
  isOpen: boolean
  onClose: () => void
  onAnalyze: (resumeId: string, jobId: string,userId:string) => void
  isLoading: boolean
}

export function SkillGapDialog({ isOpen, onClose, onAnalyze, isLoading }: SkillGapDialogProps) {
  const [step, setStep] = useState(1)
  const [resumeId, setResumeId] = useState(localStorage.getItem("resumeId")|| null)
  const [jobId, setJobId] = useState(localStorage.getItem("jobId")|| null)
  const [userId ,setuserId]=useState(localStorage.getItem("userId") || null)

  const handleNext = () => {
    if (step === 1 && resumeId?.trim()) {
      setStep(2)
    }
  }

  const handleBack = () => {
    if (step === 2) {
      setStep(1)
    }
  }

  const handleAnalyze = () => {
    if (resumeId?.trim() && jobId?.trim() && userId?.trim()) {
      onAnalyze(resumeId, jobId, userId)
    }
  }

  const resetDialog = () => {
    setStep(1)
    setResumeId("")
    setJobId("")
    setuserId("")
    
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isLoading) {
          onClose()
          resetDialog()
        }
      }}
    >
      <DialogContent className="sm:max-w-md bg-white fade-300">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Zap className="h-5 w-5 text-blue-600" />
            Skill Gap Analysis
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-4 my-8">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                step >= 1 ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 text-gray-400"
              }`}
            >
              1
            </div>
            <div className={`h-0.5 w-8 transition-all duration-300 ${step >= 2 ? "bg-blue-600" : "bg-gray-300"}`} />
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                step >= 2 ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 text-gray-400"
              }`}
            >
              2
            </div>
          </div>

          {/* Step Content */}
          <div className="min-h-[200px]">
            {step === 1 && (
              <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-100 to-indigo-100">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <FileText className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900">Resume Information</h3>
                    <p className="text-sm text-gray-600 mt-1">Enter your resume ID to get started</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="resumeId" className="text-sm font-medium text-gray-700">
                        Resume ID
                      </Label>
                      <Input
                        id="resumeId"
                        type="text"
                        placeholder="e.g., 2e43bbcd-ef02-4fa9-94a7-514f25dc4d4b"
                        value={resumeId || ""}
                        onChange={(e) => setResumeId(e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <Button
                      onClick={handleNext}
                      disabled={!resumeId?.trim()}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Next Step
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <Briefcase className="h-12 w-12 text-green-600 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900">Job Information</h3>
                    <p className="text-sm text-gray-600 mt-1">Enter the job ID you want to analyze against</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="jobId" className="text-sm font-medium text-gray-700">
                        Job ID
                      </Label>
                      <Input
                        id="jobId"
                        type="text"
                        placeholder="e.g., 46b39e72-1902-4192-bf9b-aedc420c135f"
                        value={jobId || ""}
                        onChange={(e) => setJobId(e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={handleBack} variant="outline" className="flex-1 bg-transparent">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>

                      <Button
                        onClick={handleAnalyze}
                        disabled={!jobId?.trim() || isLoading}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Zap className="mr-2 h-4 w-4" />
                            Analyze Skills
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
