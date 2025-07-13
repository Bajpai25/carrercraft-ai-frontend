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
import CoverLetter from "./pages/Cover_letter"
import Email from "./pages/Email"
import Resume from "./pages/Resume"
import { ProtectedRoute } from "./pages/ProtectedRoute"
import Ats from "./pages/Ats"

import { SkillAnalysisPage } from "./components/skill-analysis-page"
import Job_Single from "./pages/Job_single"

function App() {

  


  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/results" element={<ResultsDisplay/>} />

              {/* Protected Routes */}
              <Route path="/cover-letters" element={<ProtectedRoute><CoverLetterTemplates /></ProtectedRoute>} />
              <Route path="/email-templates" element={<ProtectedRoute><EmailTemplates /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/test" element={<ProtectedRoute><DebugPanel /></ProtectedRoute>} />
              <Route path="/cover_letter/:id" element={<ProtectedRoute><CoverLetter /></ProtectedRoute>} />
              <Route path="/job/:id" element={<ProtectedRoute><Job_Single/></ProtectedRoute>}/>
              <Route path="/email/:id" element={<ProtectedRoute><Email /></ProtectedRoute>} />
              <Route path="/resume/:id" element={<ProtectedRoute><Resume /></ProtectedRoute>} />
              <Route path="/ats"  element={<ProtectedRoute><Ats/></ProtectedRoute>}/>
              <Route path="/skill-analysis" element={<ProtectedRoute><SkillAnalysisPage/></ProtectedRoute>}/>
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
