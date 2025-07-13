import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import {
  CheckCircle,
  XCircle,
  TrendingUp,
  FileText,
  Briefcase,
  RotateCcw,
  Target,
  AlertTriangle,
  Lightbulb,
} from "lucide-react"

export interface SkillGapData {
    message:{
  id: string
  userId: string
  jobId: string
  resumeId: string
  match_percentage: string
  matching_skills: string[]
  missing_skills: string[]
  feedback: string
    }
}

interface SkillGapResultsProps {
  data: SkillGapData
  onNewAnalysis: () => void
}

export function SkillGapResults({ data, onNewAnalysis }: SkillGapResultsProps) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0)
  const matchPercentage = Number.parseInt(data.message.match_percentage.replace("%", ""))

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(matchPercentage)
    }, 500)
    return () => clearTimeout(timer)
  }, [matchPercentage])

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-600"
    if (percentage >= 60) return "bg-yellow-600"
    return "bg-red-600"
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-700">
      {/* Header with Match Percentage */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Skill Match Analysis</h2>
              <div className="flex items-center gap-4 text-sm opacity-90">
                <div className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  Resume: {data.message.resumeId.slice(0, 8)}...
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  Job: {data.message.jobId.slice(0, 8)}...
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold mb-2">{animatedPercentage}%</div>
              <div className="text-sm opacity-90">Match Score</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="w-full bg-white/20 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-1000 ease-out ${getProgressColor(matchPercentage)}`}
                style={{ width: `${animatedPercentage}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onNewAnalysis} variant="outline" className="gap-2 bg-transparent">
          <RotateCcw className="h-4 w-4" />
          New Analysis
        </Button>
      </div>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Matching Skills */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
            <CardTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              Matching Skills ({data.message.matching_skills.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {data.message.matching_skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-100 animate-in slide-in-from-left-5 duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{skill}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Missing Skills */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 border-b">
            <CardTitle className="flex items-center gap-2 text-red-700">
              <XCircle className="h-5 w-5" />
              Missing Skills ({data.message.missing_skills.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {data.message.missing_skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-red-50 border border-red-100 animate-in slide-in-from-right-5 duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{skill}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback Section */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Lightbulb className="h-5 w-5" />
            Personalized Feedback & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="prose prose-sm max-w-none">
            {data.message.feedback.split("\n\n").map((paragraph, index) => (
              <div
                key={index}
                className="mb-4 p-4 rounded-lg bg-blue-50 border border-blue-100 animate-in fade-in-50 duration-700"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{paragraph}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">{data.message.matching_skills.length}</div>
            <div className="text-sm text-gray-600">Skills Matched</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-red-50 to-pink-50">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-700">{data.message.missing_skills.length}</div>
            <div className="text-sm text-gray-600">Skills to Develop</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className={`text-2xl font-bold ${getMatchColor(matchPercentage)}`}>{data.message.match_percentage}</div>
            <div className="text-sm text-gray-600">Overall Match</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
