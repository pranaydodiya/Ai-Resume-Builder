import { Link } from 'react-router-dom';
import { FiFileText, FiCheck, FiSearch, FiAward } from 'react-icons/fi';
import './Home.css';

function Home() {
  const features = [
    {
      icon: <FiFileText />,
      title: 'Professional Templates',
      description: 'Choose from professionally designed resume templates that stand out from the crowd.'
    },
    {
      icon: <FiCheck />,
      title: 'ATS-Friendly',
      description: 'Our resumes are designed to pass through Applicant Tracking Systems with flying colors.'
    },
    {
      icon: <FiSearch />,
      title: 'AI-Powered Analysis',
      description: 'Get personalized feedback and suggestions to improve your resume with our AI analysis.'
    },
    {
      icon: <FiAward />,
      title: 'Career Guidance',
      description: 'Take our career assessment and get tailored advice for your professional journey.'
    }
  ];
  
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Create Your Perfect Resume with <span className="text-gradient">AI-Powered</span> Tools
            </h1>
            <p className="hero-subtitle">
              Stand out from the competition with professional templates, AI-generated content, 
              and ATS optimization to land your dream job.
            </p>
            <div className="hero-buttons">
              <Link to="/resume-builder" className="btn btn-primary btn-lg">
                Build Your Resume
              </Link>
              <Link to="/templates" className="btn btn-outline btn-lg">
                View Templates
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Professional creating a resume" 
              className="rounded-image"
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="features-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Why Choose Our AI Resume Builder?</h2>
            <p className="section-subtitle">
              Our platform combines cutting-edge AI technology with professional design to help you create the perfect resume.
            </p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div className="feature-card" key={index}>
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="how-it-works-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              Create a professional resume in just a few simple steps
            </p>
          </div>
          
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3 className="step-title">Choose a Template</h3>
              <p className="step-description">
                Select from our collection of professionally designed resume templates.
              </p>
            </div>
            
            <div className="step">
              <div className="step-number">2</div>
              <h3 className="step-title">Fill Your Details</h3>
              <p className="step-description">
                Enter your information or import from LinkedIn to populate your resume.
              </p>
            </div>
            
            <div className="step">
              <div className="step-number">3</div>
              <h3 className="step-title">Enhance with AI</h3>
              <p className="step-description">
                Use our AI tools to create compelling summaries and improve content.
              </p>
            </div>
            
            <div className="step">
              <div className="step-number">4</div>
              <h3 className="step-title">Download & Apply</h3>
              <p className="step-description">
                Download your polished resume in PDF format and start applying to jobs.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2 className="cta-title">Ready to Create Your Professional Resume?</h2>
            <p className="cta-description">
              Join thousands of job seekers who have successfully landed interviews with our AI-powered resume builder.
            </p>
            <Link to="/resume-builder" className="btn btn-primary btn-lg">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;