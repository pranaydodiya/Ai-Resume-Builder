import { useState } from 'react';
import { FiPlus, FiTrash2, FiEdit } from 'react-icons/fi';
import { useResume } from '../../contexts/ResumeContext';
import './Experience.css';

function Experience({ onNext, onPrev }) {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResume();
  const [experiences, setExperiences] = useState(resumeData.experience);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    if (name === 'current' && checked) {
      setFormData(prev => ({
        ...prev,
        endDate: ''
      }));
    }
  };
  
  const handleAdd = (e) => {
    e.preventDefault();
    
    if (isEditing && currentIndex !== null) {
      // Update existing experience
      updateExperience(currentIndex, formData);
      setExperiences(prev => {
        const updated = [...prev];
        updated[currentIndex] = formData;
        return updated;
      });
    } else {
      // Add new experience
      addExperience(formData);
      setExperiences(prev => [...prev, formData]);
    }
    
    // Reset form
    setFormData({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
    setIsEditing(false);
    setCurrentIndex(null);
  };
  
  const handleEdit = (index) => {
    setIsEditing(true);
    setCurrentIndex(index);
    setFormData(experiences[index]);
  };
  
  const handleRemove = (index) => {
    removeExperience(index);
    setExperiences(prev => prev.filter((_, i) => i !== index));
    
    // Reset editing state if the item being edited is removed
    if (isEditing && currentIndex === index) {
      setIsEditing(false);
      setCurrentIndex(null);
      setFormData({
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      });
    }
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setCurrentIndex(null);
    setFormData({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
  };
  
  return (
    <div className="experience-section">
      <h2 className="section-heading">Work Experience</h2>
      <p className="section-description">
        Add your work experience, starting with the most recent position. You can add multiple entries.
      </p>
      
      {experiences.length > 0 && (
        <div className="experience-list">
          {experiences.map((exp, index) => (
            <div className="experience-item" key={index}>
              <div className="experience-content">
                <h3 className="experience-title">{exp.title}</h3>
                <p className="experience-company">{exp.company}</p>
                <p className="experience-period">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </p>
                <p className="experience-description">{exp.description}</p>
              </div>
              <div className="experience-actions">
                <button 
                  type="button" 
                  className="btn-icon"
                  onClick={() => handleEdit(index)}
                  aria-label="Edit experience"
                >
                  <FiEdit />
                </button>
                <button 
                  type="button" 
                  className="btn-icon btn-delete"
                  onClick={() => handleRemove(index)}
                  aria-label="Remove experience"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <form onSubmit={handleAdd} className="experience-form">
        <h3 className="form-subtitle">
          {isEditing ? 'Edit Experience' : 'Add Experience'}
        </h3>
        
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="title">Job Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g., New York, NY or Remote"
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="startDate">Start Date</label>
            <input
              type="month"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="endDate">End Date</label>
            <input
              type="month"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="form-input"
              disabled={formData.current}
              required={!formData.current}
            />
            <div className="form-checkbox">
              <input
                type="checkbox"
                id="current"
                name="current"
                checked={formData.current}
                onChange={handleChange}
              />
              <label htmlFor="current">I currently work here</label>
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="description">Job Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-textarea"
            rows="4"
            placeholder="Describe your responsibilities, achievements, and skills used"
            required
          ></textarea>
        </div>
        
        <div className="form-buttons experience-form-buttons">
          {isEditing ? (
            <>
              <button type="button" className="btn btn-outline" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update Experience
              </button>
            </>
          ) : (
            <button type="submit" className="btn btn-primary">
              <FiPlus /> Add Experience
            </button>
          )}
        </div>
      </form>
      
      <div className="navigation-buttons">
        <button type="button" className="btn btn-outline" onClick={onPrev}>
          Back to Personal Info
        </button>
        <button type="button" className="btn btn-primary" onClick={onNext}>
          Continue to Education
        </button>
      </div>
    </div>
  );
}

export default Experience;