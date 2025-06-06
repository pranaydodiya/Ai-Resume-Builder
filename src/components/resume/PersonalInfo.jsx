import { useState } from 'react';
import { FiZap } from 'react-icons/fi';
import { useResume } from '../../contexts/ResumeContext';
import './PersonalInfo.css';

function PersonalInfo({ onNext }) {
  const { resumeData, updatePersonalInfo, generateAiSummary } = useResume();
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [formData, setFormData] = useState(resumeData.personalInfo);
  const [role, setRole] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleRoleChange = async (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    if (selectedRole && experienceLevel) {
      try {
        setIsGeneratingSummary(true);
        const summary = await generateAiSummary(selectedRole, experienceLevel);
        setFormData({
          ...formData,
          summary
        });
      } catch (error) {
        console.error('Error generating summary:', error);
      } finally {
        setIsGeneratingSummary(false);
      }
    }
  };
  
  const handleExperienceChange = async (e) => {
    const selectedLevel = e.target.value;
    setExperienceLevel(selectedLevel);
    if (role && selectedLevel) {
      try {
        setIsGeneratingSummary(true);
        const summary = await generateAiSummary(role, selectedLevel);
        setFormData({
          ...formData,
          summary
        });
      } catch (error) {
        console.error('Error generating summary:', error);
      } finally {
        setIsGeneratingSummary(false);
      }
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    updatePersonalInfo(formData);
    onNext();
  };
  
  return (
    <div className="personal-info-section">
      <h2 className="section-heading">Personal Information</h2>
      <p className="section-description">
        Start by filling in your personal details. This information will appear at the top of your resume.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="title">Professional Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g., Senior Frontend Developer"
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-input"
            placeholder="Street Address"
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="state">State/Province</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>
        
        <div className="ai-summary-generator">
          <div className="ai-summary-header">
            <h3>
              <FiZap className="ai-icon" />
              AI Summary Generator
            </h3>
            <p>Generate a professional summary based on your role and experience level</p>
          </div>
          
          <div className="ai-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="role">Your Role</label>
                <select
                  id="role"
                  value={role}
                  onChange={handleRoleChange}
                  className="form-select"
                >
                  <option value="">Select a role</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                  <option value="DevOps Engineer">DevOps Engineer</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="experienceLevel">Experience Level</label>
                <select
                  id="experienceLevel"
                  value={experienceLevel}
                  onChange={handleExperienceChange}
                  className="form-select"
                >
                  <option value="">Select experience level</option>
                  <option value="Entry Level">Entry Level (0-2 years)</option>
                  <option value="Mid Level">Mid Level (3-5 years)</option>
                  <option value="Senior Level">Senior Level (5+ years)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="summary">Professional Summary</label>
          <textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            className="form-textarea"
            rows="4"
            placeholder="Your professional summary will appear here after selecting a role and experience level"
          ></textarea>
        </div>
        
        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            Continue to Experience
          </button>
        </div>
      </form>
    </div>
  );
}

export default PersonalInfo;