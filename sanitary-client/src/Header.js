import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleNavLinkClick = () => {
    const navbarCollapse = document.getElementById('navbarCollapse');
    if (navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="container-fluid sticky-top">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light p-0">
          <Link to="/" className="navbar-brand">
            <img
              className="logo-img"
              src="assets/img/Screenshot_2024-09-16_130809-removebg-preview.png"
              alt="logo"
            />
          </Link>
          <button
            type="button"
            className="navbar-toggler ms-auto me-0"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto">
              <Link to="/" className="nav-item nav-link" onClick={handleNavLinkClick}>Home</Link>

              {/* Dropdown for About */}
              <div className="nav-item dropdown">
                <Link
                  to="#"
                  className="nav-link dropdown-toggle"
                  onClick={toggleDropdown}
                  aria-expanded={isDropdownOpen ? 'true' : 'false'}
                >
                  More
                </Link>
                <div
                  className={`dropdown-menu bg-light mt-2 ${isDropdownOpen ? 'show' : ''}`}
                  style={{ zIndex: 1000 }}
                >
                  <Link to="/about" className="dropdown-item" onClick={handleNavLinkClick}>About</Link>
                  <Link to="/community" className="dropdown-item" onClick={handleNavLinkClick}>Community Impact</Link>
                  <Link to="/awards" className="dropdown-item" onClick={handleNavLinkClick}>Awards & Achievements</Link>
                  <Link to="/blogs" className="dropdown-item" onClick={handleNavLinkClick}>Blogs</Link>
                  <Link to="/ourteam" className="dropdown-item" onClick={handleNavLinkClick}>Our Team</Link>
                </div>
              </div>

              <Link to="/product" className="nav-item nav-link" onClick={handleNavLinkClick}>Products</Link>
              <Link to="/contact" className="nav-item nav-link" onClick={handleNavLinkClick}>Contact</Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
