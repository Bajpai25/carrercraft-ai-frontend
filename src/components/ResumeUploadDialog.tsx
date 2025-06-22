import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "./ui/dialog";
import { Upload, Clock, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { uploadAndParseResume } from "../lib/api";

interface Props {
  isOpen: boolean;
  onFinish: () => void;
}

const ResumeUploadDialog: React.FC<Props> = ({ isOpen, onFinish }) => {
  const [resume, setResume] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setResume(file);
  };

  const handleUpload = async () => {
    if (!resume) return;
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId") || "";
      await uploadAndParseResume(resume, userId);
      onFinish(); // Resume parsed successfully
    } catch (err) {
      console.error("Resume upload failed", err);
      alert("Failed to parse resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="max-w-xl border-0 shadow-2xl rounded-3xl bg-gradient-to-br from-white to-slate-50 px-10 py-8">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-6 text-center"
          >
            <motion.div
              className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center shadow-lg"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <FileText className="w-10 h-10 text-white" />
            </motion.div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">Upload Your Resume</h2>
              <p className="text-gray-500 text-sm">
                Upload your latest resume to begin the AI analysis journey.
              </p>
            </div>

            <div className="relative">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
                className="block w-full px-4 py-3 text-sm border-2 border-dashed border-gray-300 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all duration-200"
              />
            </div>

            {resume && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-gray-600 font-medium"
              >
                📄 <strong>{resume.name}</strong> – {(resume.size / 1024 / 1024).toFixed(2)} MB
              </motion.div>
            )}

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={handleUpload}
                disabled={!resume || loading}
                className="w-full px-6 py-4 text-base font-semibold rounded-xl shadow-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all"
              >
                {loading ? (
                  <>
                    <Clock className="w-5 h-5 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    Upload & Analyze
                  </>
                )}
              </Button>
            </motion.div>

            <p className="text-xs text-gray-400 mt-2">
              Supported: PDF, DOC, DOCX • Max 10MB
            </p>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeUploadDialog;
