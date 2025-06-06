import { useState } from 'react';
import { FiPlus, FiTrash2, FiEdit } from 'react-icons/fi';
import { useResume } from '../../contexts/ResumeContext';
import './Education.css';

function Education({ onNext, onPrev }) {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();
  const [educations, setEducations] = useState(resumeData.education);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    fieldOfStudy: '',
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
      // Update existing education
      updateEducation(currentIndex, formData);
      setEducations(prev => {
        const updated = [...prev];
        updated[currentIndex] = formData;
        return updated;
      });
    } else {
      // Add new education
      addEducation(formData);
      setEducations(prev => [...prev, formData]);
    }
    
    // Reset form
    setFormData({
      institution: '',
      degree: '',
      fieldOfStudy: '',
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
    setFormData(educations[index]);
  };
  
  const handleRemove = (index) => {
    removeEducation(index);
    setEducations(prev => prev.filter((_, i) => i !== index));
    
    // Reset editing state if the item being edited is removed
    if (isEditing && currentIndex === index) {
      setIsEditing(false);
      setCurrentIndex(null);
      setFormData({
        institution: '',
        degree: '',
        fieldOfStudy: '',
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
      institution: '',
      degree: '',
      fieldOfStudy: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
  };
  
  return (
    <div className="education-section">
      <h2 className="section-heading">Education</h2>
      <p className="section-description">
        Add your educational background, starting with the most recent. You can add multiple entries.
      </p>
      
      {educations.length > 0 && (
        <div className="education-list">
          {educations.map((edu, index) => (
            <div className="education-item" key={index}>
              <div className="education-content">
                <h3 className="education-institution">{edu.institution}</h3>
                <p className="education-degree">
                  {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                </p>
                <p className="education-period">
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                </p>
                {edu.description && (
                  <p className="education-description">{edu.description}</p>
                )}
              </div>
              <div className="education-actions">
                <button 
                  type="button" 
                  className="btn-icon"
                  onClick={() => handleEdit(index)}
                  aria-label="Edit education"
                >
                  <FiEdit />
                </button>
                <button 
                  type="button" 
                  className="btn-icon btn-delete"
                  onClick={() => handleRemove(index)}
                  aria-label="Remove education"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <form onSubmit={handleAdd} className="education-form">
        <h3 className="form-subtitle">
          {isEditing ? 'Edit Education' : 'Add Education'}
        </h3>
        
        <div className="form-group">
          <label className="form-label" htmlFor="institution">Institution</label>
          <input
            type="text"
            id="institution"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g., University of California, Berkeley"
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="degree">Degree</label>
            <input
              type="text"
              id="degree"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., Bachelor of Science"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="fieldOfStudy">Field of Study</label>
            <input
              type="text"
              id="fieldOfStudy"
              name="fieldOfStudy"
              value={formData.fieldOfStudy}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., Computer Science"
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
            placeholder="e.g., Berkeley, CA"
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
              <label htmlFor="current">I am currently studying here</label>
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="description">Description (Optional)</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-textarea"
            rows="3"
            placeholder="Notable achievements, activities, or relevant coursework"
          ></textarea>
        </div>
        
        <div className="form-buttons education-form-buttons">
          {isEditing ? (
            <>
              <button type="button" className="btn btn-outline" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update Education
              </button>
            </>
          ) : (
            <button type="submit" className="btn btn-primary">
              <FiPlus /> Add Education
            </button>
          )}
        </div>
      </form>
      
      <div className="navigation-buttons">
        <button type="button" className="btn btn-outline" onClick={onPrev}>
          Back to Experience
        </button>
        <button type="button" className="btn btn-primary" onClick={onNext}>
          Continue to Skills
        </button>
      </div>
    </div>
  );
}

export default Education;