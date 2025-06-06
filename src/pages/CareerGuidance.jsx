import { useState } from 'react';
import { FiCheckCircle, FiAlertTriangle, FiBookOpen, FiCode } from 'react-icons/fi';
import './CareerGuidance.css';

const careerPaths = [
  {
    id: 'frontend',
    title: 'Frontend Developer',
    description: 'Create user interfaces and interactive web applications',
    icon: <FiCode />,
    skills: ['HTML/CSS', 'JavaScript', 'React', 'UI/UX', 'Responsive Design', 'API Integration']
  },
  {
    id: 'react',
    title: 'React Developer',
    description: 'Build modern web applications using React and related technologies',
    icon: <FiCode />,
    skills: ['React', 'Redux', 'Hooks', 'Context API', 'Next.js', 'Testing']
  },
  {
    id: 'backend',
    title: 'Backend Developer',
    description: 'Develop server-side logic, databases, and APIs',
    icon: <FiCode />,
    skills: ['Node.js', 'Express', 'Database Design', 'REST APIs', 'Authentication', 'Performance']
  },
  {
    id: 'node',
    title: 'Node.js Developer',
    description: 'Create scalable backend systems using JavaScript and Node.js',
    icon: <FiCode />,
    skills: ['Node.js', 'Express', 'MongoDB', 'API Development', 'Microservices', 'WebSockets']
  }
];

const quizzes = {
  frontend: [
    {
      question: 'Which CSS property would you use to create space between elements?',
      options: ['margin', 'padding', 'spacing', 'border-spacing'],
      answer: 'margin'
    },
    {
      question: 'Which of the following is NOT a JavaScript framework/library?',
      options: ['React', 'Vue', 'Angular', 'Laravel'],
      answer: 'Laravel'
    },
    {
      question: 'Which method would you use to select an element by its ID in JavaScript?',
      options: ['getElementById()', 'querySelector()', 'getElementByClass()', 'getElement()'],
      answer: 'getElementById()'
    }
  ],
  react: [
    {
      question: 'What hook would you use to run code after rendering?',
      options: ['useEffect', 'useState', 'useCallback', 'useReducer'],
      answer: 'useEffect'
    },
    {
      question: 'Which function allows you to update state in a React component?',
      options: ['setState', 'updateState', 'changeState', 'modifyState'],
      answer: 'setState'
    },
    {
      question: 'What is the correct way to pass props to a React component?',
      options: [
        '<Component name="value" />',
        '<Component {name="value"} />',
        '<Component props={name: "value"} />',
        '<Component props.name="value" />'
      ],
      answer: '<Component name="value" />'
    }
  ],
  backend: [
    {
      question: 'Which of the following is a NoSQL database?',
      options: ['MySQL', 'PostgreSQL', 'MongoDB', 'Oracle'],
      answer: 'MongoDB'
    },
    {
      question: 'What does REST stand for?',
      options: [
        'Representational State Transfer',
        'Remote Endpoint Service Transfer',
        'React Express Server Technology',
        'Recursive Entity System Template'
      ],
      answer: 'Representational State Transfer'
    },
    {
      question: 'Which HTTP method should be used to retrieve data from a server?',
      options: ['GET', 'POST', 'PUT', 'DELETE'],
      answer: 'GET'
    }
  ],
  node: [
    {
      question: 'What is the package manager for Node.js?',
      options: ['npm', 'yarn', 'pnpm', 'All of the above'],
      answer: 'All of the above'
    },
    {
      question: 'Which module helps in handling file paths in Node.js?',
      options: ['fs', 'path', 'http', 'os'],
      answer: 'path'
    },
    {
      question: 'How do you include a module in Node.js?',
      options: [
        'require("module")',
        'import "module"',
        'include "module"',
        'using "module"'
      ],
      answer: 'require("module")'
    }
  ]
};

function generateFeedback(careerId, score) {
  const api_key = 'AIzaSyDIQlCJz5Y0u-Tn1BUuR5H7pKTzDh1Dnek';
  
  // We'll generate feedback using the Gemini API
  const career = careerPaths.find(path => path.id === careerId);
  const scoreText = score === 3 ? 'excellent' : score >= 2 ? 'good' : 'needs improvement';
  
  // Resources per career path
  const resources = {
    frontend: [
      { title: "Frontend Masters", url: "https://frontendmasters.com/" },
      { title: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/" },
      { title: "CSS-Tricks", url: "https://css-tricks.com/" }
    ],
    react: [
      { title: "React Documentation", url: "https://reactjs.org/docs/getting-started.html" },
      { title: "Epic React by Kent C. Dodds", url: "https://epicreact.dev/" },
      { title: "React for Beginners by Wes Bos", url: "https://reactforbeginners.com/" }
    ],
    backend: [
      { title: "Node.js Documentation", url: "https://nodejs.org/en/docs/" },
      { title: "Express.js Documentation", url: "https://expressjs.com/" },
      { title: "MongoDB University", url: "https://university.mongodb.com/" }
    ],
    node: [
      { title: "Node.js Documentation", url: "https://nodejs.org/en/docs/" },
      { title: "Node.js Design Patterns", url: "https://www.nodejsdesignpatterns.com/" },
      { title: "Node.js Best Practices", url: "https://github.com/goldbergyoni/nodebestpractices" }
    ]
  };
  
  return {
    career: career.title,
    score: score,
    scoreText: scoreText,
    message: score === 3 
      ? `Excellent! You have a strong understanding of ${career.title} concepts.` 
      : score >= 2 
        ? `Good job! You have a solid foundation in ${career.title}, but there's room to grow.` 
        : `You're just getting started with ${career.title}. Focus on building your fundamental knowledge.`,
    nextSteps: score === 3
      ? `Consider deepening your expertise in ${career.title} with advanced projects and specialization.`
      : score >= 2
        ? `Continue learning and practicing ${career.title} skills with more complex projects.`
        : `Start with foundational courses and simple projects to build your ${career.title} skills.`,
    resources: resources[careerId]
  };
}

function CareerGuidance() {
  const [selectedPath, setSelectedPath] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [feedback, setFeedback] = useState(null);
  
  const selectPath = (pathId) => {
    setSelectedPath(pathId);
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setQuizCompleted(false);
    setFeedback(null);
  };
  
  const startQuiz = () => {
    setQuizStarted(true);
  };
  
  const selectAnswer = (questionIndex, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answer
    });
  };
  
  const nextQuestion = () => {
    if (currentQuestion < quizzes[selectedPath].length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeQuiz();
    }
  };
  
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const completeQuiz = () => {
    // Calculate score
    const quiz = quizzes[selectedPath];
    let score = 0;
    
    for (let i = 0; i < quiz.length; i++) {
      if (selectedAnswers[i] === quiz[i].answer) {
        score++;
      }
    }
    
    // Generate feedback
    const careerFeedback = generateFeedback(selectedPath, score);
    setFeedback(careerFeedback);
    setQuizCompleted(true);
  };
  
  return (
    <div className="career-guidance-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Career Guidance</h1>
          <p className="page-subtitle">
            Explore different career paths, test your knowledge, and get personalized guidance
          </p>
        </div>
        
        {!selectedPath && (
          <div className="career-paths-grid">
            {careerPaths.map((path) => (
              <div 
                className="career-path-card" 
                key={path.id}
                onClick={() => selectPath(path.id)}
              >
                <div className="path-icon">{path.icon}</div>
                <h3 className="path-title">{path.title}</h3>
                <p className="path-description">{path.description}</p>
                <div className="path-skills">
                  <h4 className="skills-title">Key Skills</h4>
                  <div className="skills-list">
                    {path.skills.map((skill, index) => (
                      <span className="path-skill" key={index}>{skill}</span>
                    ))}
                  </div>
                </div>
                <button className="btn btn-outline path-button">Explore Path</button>
              </div>
            ))}
          </div>
        )}
        
        {selectedPath && !quizStarted && !quizCompleted && (
          <div className="career-path-detail">
            <button className="btn btn-text back-button" onClick={() => setSelectedPath(null)}>
              ← Back to All Paths
            </button>
            
            <h2 className="path-detail-title">
              {careerPaths.find(path => path.id === selectedPath).title}
            </h2>
            
            <div className="path-detail-content">
              <div className="path-description-card">
                <h3 className="card-title">About This Career Path</h3>
                <p className="card-description">
                  {careerPaths.find(path => path.id === selectedPath).description}
                </p>
                <h4 className="skills-heading">Key Skills & Technologies</h4>
                <div className="path-detail-skills">
                  {careerPaths.find(path => path.id === selectedPath).skills.map((skill, index) => (
                    <span className="path-detail-skill" key={index}>{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className="quiz-intro-card">
                <h3 className="card-title">Test Your Knowledge</h3>
                <p className="card-description">
                  Take a short quiz to assess your current knowledge level in this area. 
                  Based on your results, we'll provide personalized recommendations for your next steps.
                </p>
                <button className="btn btn-primary start-quiz-btn" onClick={startQuiz}>
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        )}
        
        {selectedPath && quizStarted && !quizCompleted && (
          <div className="quiz-container">
            <div className="quiz-progress">
              <div className="progress-label">
                Question {currentQuestion + 1} of {quizzes[selectedPath].length}
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${((currentQuestion + 1) / quizzes[selectedPath].length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="quiz-question-card">
              <h3 className="question-text">
                {quizzes[selectedPath][currentQuestion].question}
              </h3>
              
              <div className="answer-options">
                {quizzes[selectedPath][currentQuestion].options.map((option, index) => (
                  <div 
                    className={`answer-option ${selectedAnswers[currentQuestion] === option ? 'selected' : ''}`}
                    key={index}
                    onClick={() => selectAnswer(currentQuestion, option)}
                  >
                    <div className="option-marker">
                      {selectedAnswers[currentQuestion] === option ? <FiCheckCircle /> : String.fromCharCode(65 + index)}
                    </div>
                    <div className="option-text">{option}</div>
                  </div>
                ))}
              </div>
              
              <div className="quiz-navigation">
                {currentQuestion > 0 && (
                  <button className="btn btn-outline" onClick={prevQuestion}>
                    Previous
                  </button>
                )}
                
                <button 
                  className="btn btn-primary"
                  onClick={nextQuestion}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                >
                  {currentQuestion < quizzes[selectedPath].length - 1 ? 'Next' : 'Complete Quiz'}
                </button>
              </div>
            </div>
          </div>
        )}
        
        {quizCompleted && feedback && (
          <div className="feedback-container">
            <button className="btn btn-text back-button" onClick={() => selectPath(null)}>
              ← Back to All Paths
            </button>
            
            <div className="feedback-header">
              <h2 className="feedback-title">Your {feedback.career} Assessment Results</h2>
            </div>
            
            <div className="feedback-card">
              <div className="feedback-score-section">
                <div className={`feedback-score score-${feedback.scoreText.replace(' ', '-')}`}>
                  <span className="score-number">{feedback.score}</span>
                  <span className="score-total">/{quizzes[selectedPath].length}</span>
                </div>
                <div className="score-description">
                  <h3 className={`score-text ${feedback.scoreText.replace(' ', '-')}`}>
                    {feedback.scoreText}
                  </h3>
                  <p className="score-message">{feedback.message}</p>
                </div>
              </div>
              
              <div className="guidance-section">
                <h3 className="guidance-title">Next Steps</h3>
                <p className="guidance-text">{feedback.nextSteps}</p>
                
                <h3 className="resources-title">Recommended Resources</h3>
                <div className="resources-list">
                  {feedback.resources.map((resource, index) => (
                    <a 
                      href={resource.url} 
                      className="resource-link" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      key={index}
                    >
                      <div className="resource-icon"><FiBookOpen /></div>
                      <div className="resource-info">
                        <h4 className="resource-title">{resource.title}</h4>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="feedback-actions">
              <button 
                className="btn btn-primary" 
                onClick={() => selectPath(selectedPath)}
              >
                Retake Quiz
              </button>
              <button 
                className="btn btn-outline" 
                onClick={() => setSelectedPath(null)}
              >
                Explore Other Paths
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CareerGuidance;