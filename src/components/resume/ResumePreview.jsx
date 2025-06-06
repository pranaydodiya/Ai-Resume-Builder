import { useState, useRef } from 'react';
import { useResume } from '../../contexts/ResumeContext';
import html2pdf from 'html2pdf.js';
import { FiDownload, FiEye, FiCheckCircle, FiRefreshCw } from 'react-icons/fi';
import ModernTemplate from '../templates/ModernTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';
import './ResumePreview.css';

function ResumePreview({ onPrev }) {
  const { resumeData, changeTemplate } = useResume();
  const [selectedTemplate, setSelectedTemplate] = useState(resumeData.template || 'modern');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const resumeRef = useRef(null);
  
  const handleTemplateChange = (template) => {
    setSelectedTemplate(template);
    changeTemplate(template);
  };
  
  const downloadPDF = async () => {
    if (!resumeRef.current) return;
    
    try {
      setIsDownloading(true);
      
      const element = resumeRef.current;
      const opt = {
        margin:       [0.5, 0.5, 0.5, 0.5],
        filename:     `${resumeData.personalInfo.firstName}-${resumeData.personalInfo.lastName}-Resume.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      
      await html2pdf().set(opt).from(element).save();
      
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };
  
  return (
    <div className="resume-preview-section">
      <h2 className="section-heading">Preview Your Resume</h2>
      <p className="section-description">
        Review your resume, choose a template, and download it as a PDF.
      </p>
      
      <div className="template-selector">
        <h3 className="template-selector-title">Choose a Template</h3>
        <div className="template-options">
          <div 
            className={`template-option ${selectedTemplate === 'modern' ? 'selected' : ''}`}
            onClick={() => handleTemplateChange('modern')}
          >
            <div className="template-preview modern-preview">
              <div className="preview-header"></div>
              <div className="preview-content">
                <div className="preview-section"></div>
                <div className="preview-section"></div>
                <div className="preview-section"></div>
              </div>
            </div>
            <span className="template-name">Modern</span>
            {selectedTemplate === 'modern' && (
              <span className="template-selected">
                <FiCheckCircle />
              </span>
            )}
          </div>
          
          <div 
            className={`template-option ${selectedTemplate === 'minimal' ? 'selected' : ''}`}
            onClick={() => handleTemplateChange('minimal')}
          >
            <div className="template-preview minimal-preview">
              <div className="preview-header-minimal"></div>
              <div className="preview-content">
                <div className="preview-section"></div>
                <div className="preview-section"></div>
                <div className="preview-section"></div>
              </div>
            </div>
            <span className="template-name">Minimal</span>
            {selectedTemplate === 'minimal' && (
              <span className="template-selected">
                <FiCheckCircle />
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="preview-actions">
        <button 
          type="button" 
          className="btn btn-primary btn-lg"
          onClick={downloadPDF}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <>
              <span className="loading-spinner"></span>
              Generating PDF...
            </>
          ) : downloadSuccess ? (
            <>
              <FiCheckCircle />
              Downloaded Successfully
            </>
          ) : (
            <>
              <FiDownload />
              Download PDF
            </>
          )}
        </button>
      </div>
      
      <div className="resume-preview-container">
        <div className="resume-paper" ref={resumeRef}>
          {selectedTemplate === 'modern' ? (
            <ModernTemplate resumeData={resumeData} />
          ) : (
            <MinimalTemplate resumeData={resumeData} />
          )}
        </div>
      </div>
      
      <div className="navigation-buttons">
        <button type="button" className="btn btn-outline" onClick={onPrev}>
          Back to Skills
        </button>
      </div>
    </div>
  );
}

export default ResumePreview;