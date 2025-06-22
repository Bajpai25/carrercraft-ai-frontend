import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReactSpeedometer from "react-d3-speedometer";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { generateATS, client } from "../lib/api";
import ResumeUploadDialog from "../components/ResumeUploadDialog";

interface RunATSOutput {
  id: string;
  score: number;
  missingSkills: string[];
  Issues: string;
  atsResultData: {
    structure: string;
    formatting: string;
    readability: string;
    keywordDensity: string;
    sectionCoverage: string[];
  };
  suggestions: string;
  userId: string;
  resumeId: string;
}

interface RunATSdata {
  runATSAnalysis: RunATSOutput;
}

const Ats = () => {
  const [atsData, setAtsData] = useState<RunATSOutput | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [resumeUploaded, setResumeUploaded] = useState(false);

  // useEffect(() => {
  //   const fetchAtsData = async () => {
  //     const resumeId = localStorage.getItem("resumeId");
  //     const userId = localStorage.getItem("userId");

  //     if (resumeId && userId) {
  //       try {
  //         const data: RunATSdata = await client.request(generateATS, { userId, resumeId });
  //         setAtsData(data?.runATSAnalysis);
  //         console.log("Raw ATS response:", data);
  //       } catch (error) {
  //         console.error("Error fetching ATS data:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   };

  //   fetchAtsData();
  // }, []);
useEffect(() => {
    const fetchAtsData = async () => {
      const resumeId = localStorage.getItem("resumeId");
      const userId = localStorage.getItem("userId");

      if (resumeId && userId) {
        try {
          const data: RunATSdata = await client.request(generateATS, { userId, resumeId });
          setAtsData(data?.runATSAnalysis);
        } catch (error) {
          console.error("Error fetching ATS data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (resumeUploaded) {
      fetchAtsData();
    }
    localStorage.removeItem('resumeId')
  }, [resumeUploaded]);


  const score = atsData?.score ?? 0;

   if (!resumeUploaded) {
    return (
      <ResumeUploadDialog
        isOpen={!resumeUploaded}
        onFinish={() => setResumeUploaded(true)}
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">Analyzing your resume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-white py-12 px-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl"
      >
        <Card className="rounded-3xl shadow-2xl p-8 space-y-8 border border-slate-200 bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-gray-800">
              ATS Resume Score
            </CardTitle>
            <p className="text-gray-500 mt-2 text-sm">
              Analyze your resume's effectiveness with an ATS system.
            </p>
          </CardHeader>

          <CardContent className="flex flex-col items-center gap-8">
            <ReactSpeedometer
              value={score}
              maxValue={100}
              segments={10}
              needleColor="steelblue"
              startColor="red"
              endColor="green"
              textColor="#333"
              height={220}
            />
            <p className="text-xl font-semibold text-gray-700">
              You scored <span className="text-blue-600">{score}%</span>
            </p>

            <Separator />

            <div className="w-full space-y-4">
              <Section title="Missing Skills">
                <div className="flex flex-wrap gap-2">
                  {atsData?.missingSkills.map((skill, idx) => (
                    <Badge key={idx} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Section>

              <Section title="Issues Found">
                <p className="text-gray-600 text-sm whitespace-pre-line">
                  {atsData?.Issues}
                </p>
              </Section>

              <Section title="Suggestions">
                <p className="text-gray-600 text-sm whitespace-pre-line">
                  {atsData?.suggestions}
                </p>
              </Section>

              <Section title="ATS Structural Insights">
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li><strong>Structure:</strong> {atsData?.atsResultData.structure}</li>
                  <li><strong>Formatting:</strong> {atsData?.atsResultData.formatting}</li>
                  <li><strong>Readability:</strong> {atsData?.atsResultData.readability}</li>
                  <li><strong>Keyword Density:</strong> {atsData?.atsResultData.keywordDensity}</li>
                  <li><strong>Section Coverage:</strong> {(atsData?.atsResultData.sectionCoverage || []).join(", ")}</li>
                </ul>
              </Section>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Button className="mt-6 px-8 py-2 text-base font-medium rounded-xl shadow-md">
                Improve Resume
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

// Reusable Section Component
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="p-4 rounded-xl border border-gray-200 shadow-sm bg-slate-50">
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    {children}
  </div>
);

export default Ats;
