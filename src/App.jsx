import { Routes, Route } from 'react-router-dom'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import ResumeBuilder from './pages/ResumeBuilder'
import ATSChecker from './pages/ATSChecker'
import CareerGuidance from './pages/CareerGuidance'
import JobMatcher from './pages/JobMatcher'
import CoverLetterGenerator from './pages/CoverLetterGenerator'
import './styles/App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/ats-checker" element={<ATSChecker />} />
          <Route path="/career-guidance" element={<CareerGuidance />} />
          <Route path="/job-matcher" element={<JobMatcher />} />
          <Route path="/cover-letter" element={<CoverLetterGenerator />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App