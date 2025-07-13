

import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import toast, { Toaster } from "react-hot-toast"
import { client, getJobById } from "../lib/api"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card"
import { Skeleton } from "../components/ui/skeleton"
import {   ExternalLink } from "lucide-react"
import type { Job } from "./Dashboard"

interface GetJobbyIdResponse {
  getJobbyId: Job
}

const Job_Single = () => {
  const { id } = useParams<{ id: string }>()
  const [job_data, setJobData] = useState<Job | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    fetchJobData()
  },[])

  const fetchJobData = async (): Promise<void> => {
  try {
    setLoading(true)
    
    const response: GetJobbyIdResponse = await client.request(getJobById, { id })
    
    setJobData(response.getJobbyId)
  } catch (err) {
    console.error(err)
    setError("Failed to fetch Job data")
    toast.error("Failed to fetch Job data")
  } finally {
    setLoading(false)
  }
}

  const formatJob = (text: string) => {
    return text.split("\\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split("\\n").length - 1 && <br />}
      </React.Fragment>
    ))
  }


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
        <Toaster />
        <div className="container max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </CardHeader>
              <CardContent className="pt-8">
                <div className="space-y-3">
                  {[...Array(20)].map((_, i) => (
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
        <Toaster />
        <div className="container max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border-red-200 bg-red-50/80 backdrop-blur-sm shadow-xl">
              <CardContent className="pt-8">
                <div className="text-center text-red-600">
                  <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                    <ExternalLink className="w-8 h-8" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Error Loading Cover Letter</h2>
                  <p className="mb-6 text-red-500">{error}</p>
                  <Button
                    variant="outline"
                    onClick={fetchJobData}
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
  console.log(job_data)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <Toaster />
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Header */}
          <div className="mb-8 text-center">
            <motion.h1
              className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Scraped Job
            </motion.h1>
            <motion.p
              className="text-slate-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Scraped Job description for your application
            </motion.p>
          </div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
              <CardHeader className="border-b bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-slate-800">{job_data?.title || "Job"} </h2>
                     
                    </div>
                    <p className="text-sm text-slate-500">ID: {job_data?.id?.substring(0, 8)}...</p>
                  </div>
                  <div className="flex gap-2">
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <motion.div
                  className="p-8 bg-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="prose prose-slate max-w-none">
                    <div className="font-serif text-slate-800 leading-relaxed text-base whitespace-pre-line">
                      {job_data && formatJob(job_data?.description || "")}
                    </div>
                  </div>
                </motion.div>
              </CardContent>

              <CardFooter className="border-t bg-gradient-to-r from-slate-50 to-slate-100 p-6">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center text-sm text-slate-500">
                    <span>Last updated: June 10, 2025</span>
                  </div>
                  {/* <div className="flex gap-3">
                    {job_data?.fileUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          window.open(job_data.fileUrl, "_blank")
                          toast.success("Opening original file...", {
                            duration: 2000,
                            position: "top-center",
                          })
                        }}
                        className="border-green-200 text-green-600 hover:bg-green-50"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Job Link
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
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div> */}
                </div>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {job_data?.description?.split(" ").length || 0}
                </div>
                <div className="text-sm text-slate-600">Words</div>
              </CardContent>
            </Card>
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-indigo-600">{job_data?.description?.length || 0}</div>
                <div className="text-sm text-slate-600">Characters</div>
              </CardContent>
            </Card>
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.ceil((job_data?.description?.split(" ").length || 0) / 200)}
                </div>
                <div className="text-sm text-slate-600">Reading Time (min)</div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Job_Single
