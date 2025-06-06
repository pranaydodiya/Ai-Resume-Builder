import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">AIResume</h3>
            <p className="footer-description">
              Create professional, ATS-friendly resumes powered by AI. Stand out from the competition and land your dream job.
            </p>
            <div className="social-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FiGithub />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FiTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FiLinkedin />
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">Home</Link>
              </li>
              <li>
                <Link to="/resume-builder" className="footer-link">Resume Builder</Link>
              </li>
              <li>
                <Link to="/templates" className="footer-link">Templates</Link>
              </li>
              <li>
                <Link to="/ats-checker" className="footer-link">ATS Checker</Link>
              </li>
              <li>
                <Link to="/career-guidance" className="footer-link">Career Guidance</Link>
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li>
                <a href="#" className="footer-link">Resume Tips</a>
              </li>
              <li>
                <a href="#" className="footer-link">Career Blog</a>
              </li>
              <li>
                <a href="#" className="footer-link">Interview Prep</a>
              </li>
              <li>
                <a href="#" className="footer-link">Job Search Guide</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} AIResume. All rights reserved.
          </p>
          <div className="legal-links">
            <a href="#" className="legal-link">Privacy Policy</a>
            <a href="#" className="legal-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;