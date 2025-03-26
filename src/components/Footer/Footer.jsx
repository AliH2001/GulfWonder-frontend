import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import Logo from "../../assets/Footer.png";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <Link to="/">
            <img src={Logo} alt="Gulf Wonder Tourism Logo" className="logo-image1" />
          </Link>
        </div>
        <nav className="footer-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/places">Places</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/signin">Login</Link></li>
          </ul>
        </nav>
      </div>
      <div className="footer-contact">
        <p>Contact us: <a href="mailto:info@gulfwonder.com">info@gulfwonder.com</a></p>
        <p>&copy; {new Date().getFullYear()} Gulf Wonder Tourism. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;