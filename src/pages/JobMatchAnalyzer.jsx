import { useState } from 'react';
import { FiUpload, FiSearch, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './JobMatchAnalyzer.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function JobMatchAnalyzer() {
  const [resumeText, setResumeText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const analyzeResume = async () => {
    if (!resumeText.trim()) {
      setError('Please provide your resume text');
      return;
    }

    try {
      setIsAnalyzing(true);
      setError(null);

      const prompt = `
        Analyze this resume and provide:
        1. Top 3 best matching job roles based on skills and experience
        2. Required skills for each role
        3. Missing skills or areas for improvement
        4. Recommended courses or certifications
        5. Potential companies hiring for these roles
        6. Career growth trajectory for each role
        
        Resume:
        ${resumeText}
        
        Format response as JSON:
        {
          "matchingRoles": [
            {
              "role": "Role name",
              "matchScore": 85,
              "requiredSkills": ["skill1", "skill2"],
              "missingSkills": ["skill3", "skill4"],
              "recommendedCourses": ["course1", "course2"],
              "potentialCompanies": ["company1", "company2"],
              "careerPath": ["Junior", "Mid", "Senior", "Lead"]
            }
          ]
        }
      `;

      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': 'AIzaSyDIQlCJz5Y0u-Tn1BUuR5H7pKTzDh1Dnek'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze resume');
      }

      const data = await response.json();
      const result = JSON.parse(data.candidates[0].content.parts[0].text);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis error:', error);
      setError('Failed to analyze resume. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Role Match Scores'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  const chartData = analysis ? {
    labels: analysis.matchingRoles.map(role => role.role),
    datasets: [
      {
        label: 'Match Score',
        data: analysis.matchingRoles.map(role => role.matchScore),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      }
    ]
  } : null;

  return (
    <div className="job-match-analyzer">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">AI Job Match Analyzer</h1>
          <p className="page-subtitle">
            Upload your resume to discover the best matching job roles and get personalized career insights
          </p>
        </div>

        <div className="analyzer-content">
          <div className="input-section">
            <div className="resume-input">
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="form-textarea"
                placeholder="Paste your resume text here..."
                rows="10"
              />
              {error && (
                <div className="error-message">
                  <FiAlertTriangle /> {error}
                </div>
              )}
              <button
                className="btn btn-primary btn-lg analyze-btn"
                onClick={analyzeResume}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <span className="loading-spinner"></span>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <FiSearch /> Analyze Resume
                  </>
                )}
              </button>
            </div>
          </div>

          {analysis && (
            <div className="analysis-results">
              <div className="chart-section">
                <Line options={chartOptions} data={chartData} />
              </div>

              <div className="matching-roles">
                {analysis.matchingRoles.map((role, index) => (
                  <div key={index} className="role-card">
                    <div className="role-header">
                      <h3>{role.role}</h3>
                      <div className="match-score">
                        <FiCheckCircle />
                        {role.matchScore}% Match
                      </div>
                    </div>

                    <div className="role-details">
                      <div className="skills-section">
                        <h4>Required Skills</h4>
                        <div className="skills-list">
                          {role.requiredSkills.map((skill, i) => (
                            <span key={i} className="skill-tag">{skill}</span>
                          ))}
                        </div>

                        <h4>Skills to Develop</h4>
                        <div className="skills-list">
                          {role.missingSkills.map((skill, i) => (
                            <span key={i} className="skill-tag missing">{skill}</span>
                          ))}
                        </div>
                      </div>

                      <div className="recommendations-section">
                        <h4>Recommended Courses</h4>
                        <ul className="courses-list">
                          {role.recommendedCourses.map((course, i) => (
                            <li key={i}>{course}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="companies-section">
                        <h4>Potential Companies</h4>
                        <div className="companies-list">
                          {role.potentialCompanies.map((company, i) => (
                            <span key={i} className="company-tag">{company}</span>
                          ))}
                        </div>
                      </div>

                      <div className="career-path-section">
                        <h4>Career Path</h4>
                        <div className="career-path">
                          {role.careerPath.map((level, i) => (
                            <div key={i} className="career-level">
                              <div className="level-marker"></div>
                              <span>{level}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobMatchAnalyzer;