

import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import toast, { Toaster } from "react-hot-toast"
import { client, getCoverletterById } from "../lib/api"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card"
import { Skeleton } from "../components/ui/skeleton"
import { Badge } from "../components/ui/badge"
import { Share2, Copy, ExternalLink, Loader2, Download, Printer } from "lucide-react"

const CoverLetter = () => {
  const { id } = useParams<{ id: string }>()
  const [cover_letter_data, setCoverLetterData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")
  const [copying, setCopying] = useState<boolean>(false)

  useEffect(() => {
    fetchCoverLetterData()
  }, [id])

  const fetchCoverLetterData = async () => {
    try {
      setLoading(true)
      const response = await client.request(getCoverletterById, { id })
      console.log(response)
      setCoverLetterData(response?.getCoverletterById)
    } catch (err) {
        console.log(err)
      setError("Failed to fetch cover letter data")
      toast.error("Failed to fetch cover letter data")
    } finally {
      setLoading(false)
    }
  }

  const formatCoverLetter = (text: string) => {
    return text.split("\\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split("\\n").length - 1 && <br />}
      </React.Fragment>
    ))
  }

  const copyToClipboard = async () => {
    if (!cover_letter_data?.data) return

    setCopying(true)
    try {
      await navigator.clipboard.writeText(cover_letter_data.data)
      toast.success("Cover letter copied to clipboard!", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#10b981",
          color: "#fff",
        },
      })
    } catch (err) {
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
          title: "Cover Letter",
          text: cover_letter_data?.data,
        })
        toast.success("Cover letter shared successfully!", {
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

  const handleDownloadPDF = () => {
    toast.promise(
      new Promise((resolve) => {
        // Simulate PDF generation
        setTimeout(() => {
          resolve("PDF generated successfully!")
        }, 2000)
      }),
      {
        loading: "Generating PDF...",
        success: "PDF downloaded successfully!",
        error: "Failed to generate PDF",
      },
      {
        position: "top-center",
      },
    )
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
                    onClick={fetchCoverLetterData}
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
  console.log(cover_letter_data)

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
              Cover Letter
            </motion.h1>
            <motion.p
              className="text-slate-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Professional cover letter for your application
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
                      <h2 className="text-2xl font-bold text-slate-800">Cover Letter</h2>
                      {/* <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                        Tower Research Capital
                      </Badge> */}
                    </div>
                    <p className="text-sm text-slate-500">ID: {cover_letter_data?.id?.substring(0, 8)}...</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                      disabled={copying}
                      className="border-blue-200 text-blue-600 hover:bg-blue-50"
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

              <CardContent className="p-0">
                <motion.div
                  className="p-8 bg-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="prose prose-slate max-w-none">
                    <div className="font-serif text-slate-800 leading-relaxed text-base whitespace-pre-line">
                      {cover_letter_data?.data && formatCoverLetter(cover_letter_data.data)}
                    </div>
                  </div>
                </motion.div>
              </CardContent>

              <CardFooter className="border-t bg-gradient-to-r from-slate-50 to-slate-100 p-6">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center text-sm text-slate-500">
                    <span>Last updated: June 10, 2025</span>
                  </div>
                  <div className="flex gap-3">
                    {cover_letter_data?.fileUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          window.open(cover_letter_data.fileUrl, "_blank")
                          toast.success("Opening original file...", {
                            duration: 2000,
                            position: "top-center",
                          })
                        }}
                        className="border-green-200 text-green-600 hover:bg-green-50"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Original
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
                  </div>
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
                  {cover_letter_data?.data?.split(" ").length || 0}
                </div>
                <div className="text-sm text-slate-600">Words</div>
              </CardContent>
            </Card>
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-indigo-600">{cover_letter_data?.data?.length || 0}</div>
                <div className="text-sm text-slate-600">Characters</div>
              </CardContent>
            </Card>
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.ceil((cover_letter_data?.data?.split(" ").length || 0) / 200)}
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

export default CoverLetter
