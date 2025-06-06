import { useState } from 'react';
import { FiFileText, FiUser, FiAward, FiBriefcase, FiTool, FiDownload } from 'react-icons/fi';
import { useResume } from '../contexts/ResumeContext';
import PersonalInfo from '../components/resume/PersonalInfo';
import Experience from '../components/resume/Experience';
import Education from '../components/resume/Education';
import Skills from '../components/resume/Skills';
import ResumePreview from '../components/resume/ResumePreview';
import './ResumeBuilder.css';

function ResumeBuilder() {
  const { activeStep, setActiveStep, resumeData } = useResume();
  const [isGenerating, setIsGenerating] = useState(false);
  
  const steps = [
    { id: 'personal', title: 'Personal Info', icon: <FiUser /> },
    { id: 'experience', title: 'Experience', icon: <FiBriefcase /> },
    { id: 'education', title: 'Education', icon: <FiAward /> },
    { id: 'skills', title: 'Skills', icon: <FiTool /> },
    { id: 'preview', title: 'Preview & Download', icon: <FiDownload /> },
  ];
  
  const nextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };
  
  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };
  
  const goToStep = (index) => {
    setActiveStep(index);
  };
  
  // Render the current step
  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <PersonalInfo onNext={nextStep} />;
      case 1:
        return <Experience onNext={nextStep} onPrev={prevStep} />;
      case 2:
        return <Education onNext={nextStep} onPrev={prevStep} />;
      case 3:
        return <Skills onNext={nextStep} onPrev={prevStep} />;
      case 4:
        return <ResumePreview onPrev={prevStep} />;
      default:
        return <PersonalInfo onNext={nextStep} />;
    }
  };
  
  return (
    <div className="resume-builder-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Resume Builder</h1>
          <p className="page-subtitle">
            Create a professional resume in minutes with our easy-to-use builder
          </p>
        </div>
        
        <div className="steps-container">
          <div className="stepper">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`step ${index <= activeStep ? 'active' : ''}`}
                onClick={() => goToStep(index)}
              >
                <div className="step-icon">{step.icon}</div>
                <div className="step-label">{step.title}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="resume-builder-content">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;