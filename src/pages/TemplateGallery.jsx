import { Link } from 'react-router-dom';
import { FiEye, FiCheckCircle } from 'react-icons/fi';
import { useResume } from '../contexts/ResumeContext';
import './TemplateGallery.css';

function TemplateGallery() {
  const { changeTemplate, resetResume } = useResume();
  
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'A clean, professional template with a colored header and modern layout',
      features: ['Colored header', 'Modern typography', 'Balanced layout', 'Skill badges'],
      imageSrc: 'https://images.pexels.com/photos/1764956/pexels-photo-1764956.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'A minimalist, elegant design with clean typography and ample white space',
      features: ['Minimalist design', 'Clean typography', 'Skill bars', 'Subtle formatting'],
      imageSrc: 'https://images.pexels.com/photos/5483073/pexels-photo-5483073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];
  
  const handleSelectTemplate = (templateId) => {
    changeTemplate(templateId);
    resetResume();
    
    // Navigate to resume builder
    window.location.href = '/resume-builder';
  };
  
  return (
    <div className="template-gallery-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Resume Templates</h1>
          <p className="page-subtitle">
            Choose from our collection of professionally designed templates
          </p>
        </div>
        
        <div className="templates-grid">
          {templates.map((template) => (
            <div className="template-card" key={template.id}>
              <div className="template-preview">
                <img src={template.imageSrc} alt={`${template.name} template preview`} />
                <div className="template-overlay">
                  <button 
                    className="btn btn-primary preview-btn"
                    onClick={() => handleSelectTemplate(template.id)}
                  >
                    <FiEye /> Use This Template
                  </button>
                </div>
              </div>
              
              <div className="template-info">
                <h3 className="template-name">{template.name}</h3>
                <p className="template-description">{template.description}</p>
                
                <h4 className="features-title">Features</h4>
                <ul className="template-features">
                  {template.features.map((feature, index) => (
                    <li className="feature-item" key={index}>
                      <FiCheckCircle className="feature-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="templates-cta">
          <div className="cta-content">
            <h2 className="cta-title">Ready to build your resume?</h2>
            <p className="cta-text">
              Select any template to get started with our easy-to-use resume builder
            </p>
          </div>
          <Link to="/resume-builder" className="btn btn-primary btn-lg">
            Start Building
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TemplateGallery;