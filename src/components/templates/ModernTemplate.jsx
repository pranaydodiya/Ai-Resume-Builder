import './ModernTemplate.css';

function ModernTemplate({ resumeData }) {
  const { 
    personalInfo, 
    experience, 
    education, 
    skills 
  } = resumeData;
  
  // Format date strings from YYYY-MM to Month YYYY
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
      const [year, month] = dateString.split('-');
      const date = new Date(year, month - 1);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch (error) {
      return dateString;
    }
  };
  
  // Group skills by level
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.level]) {
      acc[skill.level] = [];
    }
    acc[skill.level].push(skill.name);
    return acc;
  }, {});
  
  return (
    <div className="modern-template">
      <header className="modern-header">
        <div className="modern-name-title">
          <h1 className="modern-name">{personalInfo.firstName} {personalInfo.lastName}</h1>
          <h2 className="modern-title">{personalInfo.title}</h2>
        </div>
        
        <div className="modern-contact">
          {personalInfo.email && (
            <div className="modern-contact-item">
              <span className="contact-label">Email:</span>
              <span className="contact-value">{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="modern-contact-item">
              <span className="contact-label">Phone:</span>
              <span className="contact-value">{personalInfo.phone}</span>
            </div>
          )}
          
          {(personalInfo.city || personalInfo.state) && (
            <div className="modern-contact-item">
              <span className="contact-label">Location:</span>
              <span className="contact-value">
                {personalInfo.city}{personalInfo.city && personalInfo.state ? ', ' : ''}{personalInfo.state}
              </span>
            </div>
          )}
        </div>
      </header>
      
      {personalInfo.summary && (
        <section className="modern-section modern-summary">
          <h3 className="modern-section-title">Professional Summary</h3>
          <p className="modern-summary-text">{personalInfo.summary}</p>
        </section>
      )}
      
      {experience.length > 0 && (
        <section className="modern-section">
          <h3 className="modern-section-title">Experience</h3>
          <div className="modern-experience">
            {experience.map((exp, index) => (
              <div className="modern-experience-item" key={index}>
                <div className="modern-experience-header">
                  <div className="modern-experience-title-company">
                    <h4 className="modern-experience-title">{exp.title}</h4>
                    <div className="modern-experience-company">{exp.company}</div>
                  </div>
                  <div className="modern-experience-period">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                <p className="modern-experience-description">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {education.length > 0 && (
        <section className="modern-section">
          <h3 className="modern-section-title">Education</h3>
          <div className="modern-education">
            {education.map((edu, index) => (
              <div className="modern-education-item" key={index}>
                <div className="modern-education-header">
                  <div className="modern-education-degree-institution">
                    <h4 className="modern-education-degree">
                      {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                    </h4>
                    <div className="modern-education-institution">{edu.institution}</div>
                  </div>
                  <div className="modern-education-period">
                    {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                  </div>
                </div>
                {edu.description && (
                  <p className="modern-education-description">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {skills.length > 0 && (
        <section className="modern-section">
          <h3 className="modern-section-title">Skills</h3>
          <div className="modern-skills">
            {Object.entries(groupedSkills).map(([level, skillNames]) => (
              <div className="modern-skill-group" key={level}>
                <h4 className="modern-skill-level">{level}</h4>
                <div className="modern-skill-list">
                  {skillNames.map((name, i) => (
                    <span className="modern-skill" key={i}>{name}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ModernTemplate;