import { useState } from 'react';
import { useResume } from '../contexts/ResumeContext';
import { FiCheck, FiX, FiAlertTriangle } from 'react-icons/fi';
import './ATSChecker.css';

function ATSChecker() {
  const { analyzeResume } = useResume();
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError('Please provide both your resume text and the job description.');
      return;
    }

    try {
      setIsAnalyzing(true);
      setError(null);
      const result = await analyzeResume(resumeText, jobDescription);
      setAnalysis(result);
    } catch (error) {
      setError('Failed to analyze resume. Please try again.');
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="ats-checker-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">AI Resume Analyzer</h1>
          <p className="page-subtitle">
            Check how well your resume matches the job requirements and get AI-powered suggestions
          </p>
        </div>

        <div className="ats-checker-content">
          <div className="ats-input-section">
            <div className="info-card">
              <h3 className="info-card-title">How It Works</h3>
              <p className="info-card-text">
                Our AI analyzes your resume against the job description to provide:
              </p>
              <ul className="info-card-list">
                <li>Match score and compatibility analysis</li>
                <li>Skills gap analysis</li>
                <li>Experience level assessment</li>
                <li>Tailored improvement suggestions</li>
              </ul>
            </div>

            <div className="input-form">
              <div className="form-group">
                <label className="form-label">Your Resume</label>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="form-textarea"
                  placeholder="Paste your complete resume text here..."
                  rows="10"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Job Description</label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="form-textarea"
                  placeholder="Paste the job description here..."
                  rows="10"
                />
              </div>

              {error && (
                <div className="error-message">
                  <FiAlertTriangle /> {error}
                </div>
              )}

              <button
                className="btn btn-primary btn-lg analyze-btn"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
              </button>
            </div>
          </div>

          {analysis && (
            <div className="analysis-results">
              <div className="score-card">
                <div className="score-header">
                  <h3>Match Score</h3>
                  <div className="score-value">{analysis.score}%</div>
                </div>
                
                <div className="score-details">
                  <div className="score-item">
                    <span>Skills Match:</span>
                    <span>{analysis.skillsAnalysis.skillScore}%</span>
                  </div>
                  <div className="score-item">
                    <span>Experience Match:</span>
                    <span>{analysis.experienceMatch.score}%</span>
                  </div>
                </div>
              </div>

              <div className="analysis-card">
                <h3>Skills Analysis</h3>
                
                <div className="skills-section">
                  <h4>Matched Skills</h4>
                  <div className="skills-list">
                    {analysis.skillsAnalysis.matched.map((skill, index) => (
                      <span key={index} className="skill-tag matched">
                        <FiCheck /> {skill}
                      </span>
                    ))}
                  </div>

                  <h4>Missing Skills</h4>
                  <div className="skills-list">
                    {analysis.skillsAnalysis.missing.map((skill, index) => (
                      <span key={index} className="skill-tag missing">
                        <FiX /> {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="experience-section">
                  <h4>Experience Match</h4>
                  <p className="experience-details">{analysis.experienceMatch.details}</p>
                </div>
              </div>

              <div className="recommendations-card">
                <h3>Improvement Suggestions</h3>
                <ul className="recommendations-list">
                  {analysis.recommendations.map((recommendation, index) => (
                    <li key={index} className="recommendation-item">
                      {recommendation}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ATSChecker;