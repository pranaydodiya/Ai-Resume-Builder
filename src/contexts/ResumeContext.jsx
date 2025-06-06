import { createContext, useState, useContext } from 'react';

const initialResumeState = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    title: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
  template: 'modern',
};

const ResumeContext = createContext();

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(initialResumeState);
  const [activeStep, setActiveStep] = useState(0);
  const [atsScore, setAtsScore] = useState(null);
  const [aiSuggestions, setAiSuggestions] = useState(null);
  
  const updatePersonalInfo = (newInfo) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...newInfo
      }
    }));
  };
  
  const addExperience = (experience) => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, experience]
    }));
  };
  
  const updateExperience = (index, updatedExperience) => {
    setResumeData(prev => {
      const updatedExperienceList = [...prev.experience];
      updatedExperienceList[index] = updatedExperience;
      return {
        ...prev,
        experience: updatedExperienceList
      };
    });
  };
  
  const removeExperience = (index) => {
    setResumeData(prev => {
      const updatedExperienceList = [...prev.experience];
      updatedExperienceList.splice(index, 1);
      return {
        ...prev,
        experience: updatedExperienceList
      };
    });
  };
  
  const addEducation = (education) => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, education]
    }));
  };
  
  const updateEducation = (index, updatedEducation) => {
    setResumeData(prev => {
      const updatedEducationList = [...prev.education];
      updatedEducationList[index] = updatedEducation;
      return {
        ...prev,
        education: updatedEducationList
      };
    });
  };
  
  const removeEducation = (index) => {
    setResumeData(prev => {
      const updatedEducationList = [...prev.education];
      updatedEducationList.splice(index, 1);
      return {
        ...prev,
        education: updatedEducationList
      };
    });
  };
  
  const updateSkills = (skills) => {
    setResumeData(prev => ({
      ...prev,
      skills
    }));
  };
  
  const generateAiSummary = async (role, experienceLevel) => {
    try {
      const prompt = `
        Generate a professional summary for a ${role} with ${experienceLevel} experience level.
        The summary should:
        1. Be concise (2-3 sentences)
        2. Highlight key skills and expertise
        3. Show career progression
        4. Be written in first person
        5. Be ATS-friendly
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
        throw new Error('Failed to generate summary');
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error generating AI summary:', error);
      // Fallback to default summaries if AI fails
      const defaultSummaries = {
        'Frontend Developer': {
          'Entry Level': 'Enthusiastic Frontend Developer with strong foundation in HTML, CSS, and JavaScript. Eager to contribute to web development projects and create engaging user interfaces.',
          'Mid Level': 'Frontend Developer with 3-5 years of experience crafting responsive web applications. Proficient in React and modern JavaScript.',
          'Senior Level': 'Senior Frontend Developer with 5+ years of expertise in building scalable web applications. Deep knowledge of React ecosystem and frontend architecture.'
        },
        'Backend Developer': {
          'Entry Level': 'Motivated Backend Developer with solid understanding of server-side programming and databases. Passionate about building efficient systems.',
          'Mid Level': 'Backend Developer with 3-5 years of experience in developing robust server applications. Strong expertise in Node.js and API development.',
          'Senior Level': 'Senior Backend Developer with 5+ years of experience architecting scalable backend systems. Expert in distributed systems and microservices.'
        },
        'Full Stack Developer': {
          'Entry Level': 'Versatile Full Stack Developer with knowledge of both frontend and backend technologies. Eager to build end-to-end applications.',
          'Mid Level': 'Full Stack Developer with 3-5 years of experience building complete web applications using React and Node.js.',
          'Senior Level': 'Senior Full Stack Developer with 5+ years of expertise in end-to-end development. Proven track record of delivering scalable solutions.'
        },
        'DevOps Engineer': {
          'Entry Level': 'Detail-oriented DevOps Engineer with foundation in CI/CD and cloud technologies. Eager to optimize development workflows.',
          'Mid Level': 'DevOps Engineer with 3-5 years of experience streamlining deployment processes and managing cloud infrastructure.',
          'Senior Level': 'Senior DevOps Engineer with 5+ years of expertise in building robust CI/CD pipelines and managing complex cloud architectures.'
        }
      };

      return defaultSummaries[role]?.[experienceLevel] || 'Professional summary not available.';
    }
  };
  
  const analyzeResume = async (resumeText, jobDescription) => {
    try {
      const prompt = `
        Analyze this resume against the job description. Provide:
        1. Overall match score (0-100)
        2. Skills analysis:
           - List matched skills
           - List missing important skills
        3. Experience match analysis
        4. Specific recommendations to improve the resume
        
        Resume:
        ${resumeText}
        
        Job Description:
        ${jobDescription}
        
        Format response as JSON:
        {
          "score": 75,
          "skillsAnalysis": {
            "matched": ["skill1", "skill2"],
            "missing": ["skill3", "skill4"],
            "skillScore": 80
          },
          "experienceMatch": {
            "level": "good/partial/insufficient",
            "score": 70,
            "details": "Experience analysis details..."
          },
          "recommendations": [
            "Add skill X to your resume",
            "Emphasize experience with Y"
          ]
        }
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
        throw new Error('Failed to analyze resume');
      }

      const data = await response.json();
      const analysis = JSON.parse(data.candidates[0].content.parts[0].text);
      
      setAtsScore(analysis.score);
      setAiSuggestions(analysis);
      
      return analysis;
    } catch (error) {
      console.error('Error analyzing resume:', error);
      throw new Error('Failed to analyze resume');
    }
  };
  
  const contextValue = {
    resumeData,
    activeStep,
    atsScore,
    aiSuggestions,
    setActiveStep,
    updatePersonalInfo,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    updateSkills,
    generateAiSummary,
    analyzeResume
  };
  
  return (
    <ResumeContext.Provider value={contextValue}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}