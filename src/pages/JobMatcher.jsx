import { useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import './JobMatcher.css';

function JobMatcher() {
  const [resumeText, setResumeText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  // Define job roles and their associated keywords
  const jobRoles = {
    'Frontend Developer': {
      keywords: ['react', 'javascript', 'html', 'css', 'vue', 'angular', 'typescript', 'responsive', 'ui', 'ux'],
      industries: ['Technology', 'E-commerce', 'Digital Agencies'],
      recommendedTitles: ['UI Developer', 'Web Developer', 'React Developer']
    },
    'Backend Developer': {
      keywords: ['node', 'python', 'java', 'sql', 'api', 'database', 'express', 'django', 'spring', 'microservices'],
      industries: ['Technology', 'Finance', 'Enterprise Software'],
      recommendedTitles: ['API Developer', 'Software Engineer', 'Node.js Developer']
    },
    'Full Stack Developer': {
      keywords: ['react', 'node', 'javascript', 'database', 'api', 'frontend', 'backend', 'fullstack', 'web'],
      industries: ['Technology', 'Startups', 'Digital Agencies'],
      recommendedTitles: ['Full Stack Engineer', 'Web Developer', 'Software Engineer']
    },
    'DevOps Engineer': {
      keywords: ['docker', 'kubernetes', 'aws', 'ci/cd', 'jenkins', 'linux', 'cloud', 'automation', 'terraform'],
      industries: ['Cloud Services', 'Technology', 'Enterprise'],
      recommendedTitles: ['Cloud Engineer', 'Infrastructure Engineer', 'Site Reliability Engineer']
    }
  };

  const analyzeResume = () => {
    if (!resumeText.trim()) {
      setError('Please paste your resume text');
      return;
    }

    try {
      setIsAnalyzing(true);
      setError(null);

      const lowercaseText = resumeText.toLowerCase();
      const results = [];

      // Analyze each job role
      for (const [role, data] of Object.entries(jobRoles)) {
        let matchCount = 0;
        const matchedKeywords = [];
        const missingKeywords = [];

        // Count matching keywords
        data.keywords.forEach(keyword => {
          if (lowercaseText.includes(keyword.toLowerCase())) {
            matchCount++;
            matchedKeywords.push(keyword);
          } else {
            missingKeywords.push(keyword);
          }
        });

        // Calculate match percentage
        const matchPercentage = Math.round((matchCount / data.keywords.length) * 100);

        if (matchCount > 0) {
          results.push({
            role,
            matchPercentage,
            keySkills: matchedKeywords,
            missingSkills: missingKeywords,
            industryFit: data.industries,
            recommendedTitles: data.recommendedTitles
          });
        }
      }

      // Sort by match percentage
      results.sort((a, b) => b.matchPercentage - a.matchPercentage);
      setAnalysis({ matchingRoles: results });
    } catch (error) {
      setError('Failed to analyze resume. Please try again.');
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="job-matcher-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">AI Job Matcher</h1>
          <p className="page-subtitle">
            Paste your resume text to discover your perfect job matches
          </p>
        </div>

        <div className="upload-section">
          <div className="upload-card">
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="form-textarea"
              placeholder="Paste your resume text here..."
              rows="10"
            />
            {error && <div className="error-message">{error}</div>}
            <button
              className="btn btn-primary btn-lg analyze-btn"
              onClick={analyzeResume}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
            </button>
          </div>
        </div>

        {analysis && (
          <div className="analysis-results">
            {analysis.matchingRoles.map((role, index) => (
              <div key={index} className="role-card">
                <div className="role-header">
                  <h2 className="role-title">{role.role}</h2>
                  <div className="match-percentage">
                    <FiCheckCircle />
                    {role.matchPercentage}% Match
                  </div>
                </div>

                <div className="role-details">
                  <div className="skills-section">
                    <h3>Matching Skills</h3>
                    <div className="skills-list">
                      {role.keySkills.map((skill, i) => (
                        <span key={i} className="skill-tag">{skill}</span>
                      ))}
                    </div>

                    <h3>Skills to Develop</h3>
                    <div className="skills-list">
                      {role.missingSkills.map((skill, i) => (
                        <span key={i} className="skill-tag missing">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="industry-section">
                    <h3>Best Industry Matches</h3>
                    <div className="industry-list">
                      {role.industryFit.map((industry, i) => (
                        <span key={i} className="industry-tag">{industry}</span>
                      ))}
                    </div>
                  </div>

                  <div className="titles-section">
                    <h3>Recommended Job Titles</h3>
                    <ul className="titles-list">
                      {role.recommendedTitles.map((title, i) => (
                        <li key={i}>{title}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default JobMatcher;