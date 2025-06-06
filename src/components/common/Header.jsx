import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../auth/AuthModal';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const handleSignOut = async () => {
    await signOut();
  };
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };
  
  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <span className="logo-text">AI</span>Resume
        </Link>
        
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
        
        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${isActive('/')}`}
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/resume-builder" 
                className={`nav-link ${isActive('/resume-builder')}`}
                onClick={closeMenu}
              >
                Resume Builder
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/cover-letter" 
                className={`nav-link ${isActive('/cover-letter')}`}
                onClick={closeMenu}
              >
                Cover Letter
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/ats-checker" 
                className={`nav-link ${isActive('/ats-checker')}`}
                onClick={closeMenu}
              >
                ATS Checker
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/job-matcher" 
                className={`nav-link ${isActive('/job-matcher')}`}
                onClick={closeMenu}
              >
                Job Matcher
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/career-guidance" 
                className={`nav-link ${isActive('/career-guidance')}`}
                onClick={closeMenu}
              >
                Career Guidance
              </Link>
            </li>
            <li className="nav-item auth-item">
              {user ? (
                <div className="user-menu">
                  <span className="user-email">{user.email}</span>
                  <button onClick={handleSignOut} className="btn btn-outline">
                    Sign Out
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setShowAuthModal(true)} 
                  className="btn btn-primary"
                >
                  <FiUser /> Sign In
                </button>
              )}
            </li>
          </ul>
        </nav>
      </div>
      
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </header>
  );
}

export default Header;