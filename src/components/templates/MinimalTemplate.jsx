import './MinimalTemplate.css';

function MinimalTemplate({ resumeData }) {
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
  
  return (
    <div className="minimal-template">
      <header className="minimal-header">
        <h1 className="minimal-name">{personalInfo.firstName} {personalInfo.lastName}</h1>
        <h2 className="minimal-title">{personalInfo.title}</h2>
      </header>
      
      <div className="minimal-contact-bar">
        {personalInfo.email && (
          <span className="minimal-contact-item">{personalInfo.email}</span>
        )}
        
        {personalInfo.phone && (
          <span className="minimal-contact-item">{personalInfo.phone}</span>
        )}
        
        {(personalInfo.city || personalInfo.state) && (
          <span className="minimal-contact-item">
            {personalInfo.city}{personalInfo.city && personalInfo.state ? ', ' : ''}{personalInfo.state}
          </span>
        )}
      </div>
      
      {personalInfo.summary && (
        <section className="minimal-section">
          <h3 className="minimal-section-title">Profile</h3>
          <p className="minimal-summary">{personalInfo.summary}</p>
        </section>
      )}
      
      {experience.length > 0 && (
        <section className="minimal-section">
          <h3 className="minimal-section-title">Experience</h3>
          <div className="minimal-experience">
            {experience.map((exp, index) => (
              <div className="minimal-experience-item" key={index}>
                <div className="minimal-experience-header">
                  <h4 className="minimal-experience-title">{exp.title}</h4>
                  <span className="minimal-experience-period">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <div className="minimal-experience-company">{exp.company}</div>
                <p className="minimal-experience-description">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {education.length > 0 && (
        <section className="minimal-section">
          <h3 className="minimal-section-title">Education</h3>
          <div className="minimal-education">
            {education.map((edu, index) => (
              <div className="minimal-education-item" key={index}>
                <div className="minimal-education-header">
                  <h4 className="minimal-education-degree">
                    {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                  </h4>
                  <span className="minimal-education-period">
                    {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                  </span>
                </div>
                <div className="minimal-education-institution">{edu.institution}</div>
                {edu.description && (
                  <p className="minimal-education-description">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {skills.length > 0 && (
        <section className="minimal-section">
          <h3 className="minimal-section-title">Skills</h3>
          <div className="minimal-skills">
            {skills.map((skill, index) => (
              <div className="minimal-skill" key={index}>
                <span className="minimal-skill-name">{skill.name}</span>
                <div className="minimal-skill-level-bar">
                  <div 
                    className="minimal-skill-level-fill"
                    style={{ 
                      width: 
                        skill.level === 'Beginner' ? '25%' : 
                        skill.level === 'Intermediate' ? '50%' : 
                        skill.level === 'Advanced' ? '75%' : '100%'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default MinimalTemplate;