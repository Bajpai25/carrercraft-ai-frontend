import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Layout } from "./components/layout"
import { HomePage } from "./pages/HomePage"
import { CoverLetterTemplates } from "./pages/CoverLetterTemplates"
import { EmailTemplates } from "./pages/EmailTemplates"
import { AuthPage } from "./pages/AuthPage"
import { Dashboard } from "./pages/Dashboard"
import { ThemeProvider } from "./components/theme-provider"
import { AuthProvider } from "./components/auth-provider"
import { DebugPanel } from "./components/debug-panel"
import { ResultsDisplay } from "./components/ResultsDisplay"
import Cover_letter from "./pages/Cover_letter"
import Email from "./pages/Email"
import Resume from "./pages/Resume"
import { ProtectedRoute } from "./pages/ProtectedRoute"

function App() {
  const mockResults = {
    matchedSkills: ["React", "TypeScript", "Node.js", "Git"],
    missingSkills: ["GraphQL", "AWS", "Docker"],
    learningResources: [
      { title: "GraphQL Fundamentals", url: "https://graphql.org/learn/" },
      { title: "AWS Certified Solutions Architect", url: "https://aws.amazon.com/certification/" },
      { title: "Docker for Beginners", url: "https://docs.docker.com/get-started/" },
    ],
    coverLetter: `Dear Hiring Manager,\n\nI am writing to express my strong interest...`,
    latexResumeUrl: "/sample-resume.pdf",
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/results" element={<ResultsDisplay {...mockResults} />} />

              {/* Protected Routes */}
              <Route path="/cover-letters" element={<ProtectedRoute><CoverLetterTemplates /></ProtectedRoute>} />
              <Route path="/email-templates" element={<ProtectedRoute><EmailTemplates /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/test" element={<ProtectedRoute><DebugPanel /></ProtectedRoute>} />
              <Route path="/cover_letter/:id" element={<ProtectedRoute><Cover_letter /></ProtectedRoute>} />
              <Route path="/email/:id" element={<ProtectedRoute><Email /></ProtectedRoute>} />
              <Route path="/resume/:id" element={<ProtectedRoute><Resume /></ProtectedRoute>} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
