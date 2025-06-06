import { useState } from 'react';
import { FiPlus, FiTrash2, FiEdit } from 'react-icons/fi';
import { useResume } from '../../contexts/ResumeContext';
import './Skills.css';

function Skills({ onNext, onPrev }) {
  const { resumeData, updateSkills } = useResume();
  const [skills, setSkills] = useState(resumeData.skills || []);
  const [currentSkill, setCurrentSkill] = useState('');
  const [currentLevel, setCurrentLevel] = useState('Intermediate');
  const [editIndex, setEditIndex] = useState(null);
  
  const skillLevels = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Expert'
  ];
  
  const handleAddSkill = (e) => {
    e.preventDefault();
    
    if (!currentSkill.trim()) return;
    
    const newSkill = {
      name: currentSkill.trim(),
      level: currentLevel
    };
    
    if (editIndex !== null) {
      // Update existing skill
      const updatedSkills = [...skills];
      updatedSkills[editIndex] = newSkill;
      setSkills(updatedSkills);
      updateSkills(updatedSkills);
      setEditIndex(null);
    } else {
      // Add new skill
      const updatedSkills = [...skills, newSkill];
      setSkills(updatedSkills);
      updateSkills(updatedSkills);
    }
    
    // Reset form
    setCurrentSkill('');
    setCurrentLevel('Intermediate');
  };
  
  const handleRemoveSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    updateSkills(updatedSkills);
    
    // If removing the skill being edited, reset edit mode
    if (editIndex === index) {
      setEditIndex(null);
      setCurrentSkill('');
      setCurrentLevel('Intermediate');
    }
  };
  
  const handleEditSkill = (index) => {
    const skillToEdit = skills[index];
    setCurrentSkill(skillToEdit.name);
    setCurrentLevel(skillToEdit.level);
    setEditIndex(index);
  };
  
  const handleCancel = () => {
    setCurrentSkill('');
    setCurrentLevel('Intermediate');
    setEditIndex(null);
  };
  
  // Common skill categories for suggestions
  const skillCategories = [
    {
      name: 'Programming Languages',
      skills: ['JavaScript', 'Python', 'Java', 'C++', 'Ruby', 'PHP', 'Swift', 'Go']
    },
    {
      name: 'Frontend Development',
      skills: ['React', 'Angular', 'Vue.js', 'HTML5', 'CSS3', 'SASS/SCSS', 'Tailwind CSS', 'Bootstrap']
    },
    {
      name: 'Backend Development',
      skills: ['Node.js', 'Express.js', 'Django', 'Flask', 'Ruby on Rails', 'Spring Boot', 'Laravel']
    },
    {
      name: 'Database',
      skills: ['SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'Redis', 'GraphQL']
    },
    {
      name: 'DevOps & Tools',
      skills: ['Git', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'CI/CD', 'Jenkins', 'Terraform']
    },
    {
      name: 'Soft Skills',
      skills: ['Communication', 'Teamwork', 'Problem Solving', 'Time Management', 'Leadership', 'Adaptability']
    }
  ];
  
  const handleAddSuggestedSkill = (skill) => {
    if (skills.some(s => s.name.toLowerCase() === skill.toLowerCase())) {
      return; // Skill already exists
    }
    
    const newSkill = {
      name: skill,
      level: 'Intermediate'
    };
    
    const updatedSkills = [...skills, newSkill];
    setSkills(updatedSkills);
    updateSkills(updatedSkills);
  };
  
  return (
    <div className="skills-section">
      <h2 className="section-heading">Skills</h2>
      <p className="section-description">
        Add your technical and soft skills. You can specify proficiency levels for each skill.
      </p>
      
      <form onSubmit={handleAddSkill} className="skills-form">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="skillName">Skill Name</label>
            <input
              type="text"
              id="skillName"
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              className="form-input"
              placeholder="e.g., JavaScript, Project Management"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="skillLevel">Proficiency Level</label>
            <select
              id="skillLevel"
              value={currentLevel}
              onChange={(e) => setCurrentLevel(e.target.value)}
              className="form-select"
            >
              {skillLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="form-buttons skills-form-buttons">
          {editIndex !== null ? (
            <>
              <button type="button" className="btn btn-outline" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update Skill
              </button>
            </>
          ) : (
            <button type="submit" className="btn btn-primary">
              <FiPlus /> Add Skill
            </button>
          )}
        </div>
      </form>
      
      {skills.length > 0 && (
        <div className="skills-list">
          {skills.map((skill, index) => (
            <div className="skill-item" key={index}>
              <div className="skill-info">
                <h3 className="skill-name">{skill.name}</h3>
                <span className={`skill-level skill-level-${skill.level.toLowerCase()}`}>
                  {skill.level}
                </span>
              </div>
              <div className="skill-actions">
                <button 
                  type="button" 
                  className="btn-icon"
                  onClick={() => handleEditSkill(index)}
                  aria-label="Edit skill"
                >
                  <FiEdit />
                </button>
                <button 
                  type="button" 
                  className="btn-icon btn-delete"
                  onClick={() => handleRemoveSkill(index)}
                  aria-label="Remove skill"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="skill-suggestions">
        <h3 className="suggestions-title">Popular Skills</h3>
        <p className="suggestions-description">
          Click to add relevant skills to your resume
        </p>
        
        {skillCategories.map((category, index) => (
          <div className="skill-category" key={index}>
            <h4 className="category-title">{category.name}</h4>
            <div className="suggested-skills">
              {category.skills.map((skill, i) => (
                <button
                  key={i}
                  type="button"
                  className={`skill-tag ${skills.some(s => s.name.toLowerCase() === skill.toLowerCase()) ? 'skill-tag-added' : ''}`}
                  onClick={() => handleAddSuggestedSkill(skill)}
                  disabled={skills.some(s => s.name.toLowerCase() === skill.toLowerCase())}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="navigation-buttons">
        <button type="button" className="btn btn-outline" onClick={onPrev}>
          Back to Education
        </button>
        <button type="button" className="btn btn-primary" onClick={onNext}>
          Preview Resume
        </button>
      </div>
    </div>
  );
}

export default Skills;