import { useState } from 'react';
import { FiFileText, FiDownload } from 'react-icons/fi';
import './CoverLetterGenerator.css';

function CoverLetterGenerator() {
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    department: '',
    skills: '',
    experience: '',
    resumeHighlights: ''
  });
  
  const [coverLetter, setCoverLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const generateCoverLetter = async () => {
    if (!formData.companyName || !formData.jobTitle || !formData.skills) {
      setError('Please fill in all required fields');
      return;
    }
    
    try {
      setIsGenerating(true);
      setError(null);
      
      const prompt = `
        Write a professional cover letter with the following details:
        Company: ${formData.companyName}
        Job Title: ${formData.jobTitle}
        Department: ${formData.department}
        Key Skills: ${formData.skills}
        Experience Highlights: ${formData.resumeHighlights}
        
        The cover letter should:
        1. Be professional and engaging
        2. Highlight relevant skills and experience
        3. Show enthusiasm for the role and company
        4. Be concise (3-4 paragraphs)
        5. Include a strong opening and closing
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
        throw new Error('Failed to generate cover letter');
      }
      
      const data = await response.json();
      setCoverLetter(data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error('Error generating cover letter:', error);
      setError('Failed to generate cover letter. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
  };
  
  return (
    <div className="cover-letter-generator">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">AI Cover Letter Generator</h1>
          <p className="page-subtitle">
            Create a personalized cover letter tailored to your skills and target company
          </p>
        </div>
        
        <div className="generator-content">
          <div className="input-section">
            <div className="form-card">
              <div className="form-group">
                <label className="form-label" htmlFor="companyName">Company Name *</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="jobTitle">Job Title *</label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="department">Department (Optional)</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="skills">Key Skills *</label>
                <textarea
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="List your relevant skills, separated by commas"
                  rows="3"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="resumeHighlights">Experience Highlights</label>
                <textarea
                  id="resumeHighlights"
                  name="resumeHighlights"
                  value={formData.resumeHighlights}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Add key achievements and experience from your resume"
                  rows="4"
                />
              </div>
              
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}
              
              <button
                type="button"
                className="btn btn-primary btn-lg generate-btn"
                onClick={generateCoverLetter}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <span className="loading-spinner"></span>
                    Generating...
                  </>
                ) : (
                  <>
                    <FiFileText />
                    Generate Cover Letter
                  </>
                )}
              </button>
            </div>
          </div>
          
          {coverLetter && (
            <div className="output-section">
              <div className="cover-letter-preview">
                <div className="preview-header">
                  <h2>Your Cover Letter</h2>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={handleCopy}
                  >
                    Copy to Clipboard
                  </button>
                </div>
                <div className="preview-content">
                  {coverLetter.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CoverLetterGenerator;