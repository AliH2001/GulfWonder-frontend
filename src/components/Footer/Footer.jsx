import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import Logo from "../../assets/Footer.png";

const Footer = () => {
  return (
    <footer className="footer text-white text-center text-lg-start footer-custom">
      <div className="container p-4">
        <div className="row my-4">
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0 text-center">
            <div className="rounded-circle bg-white d-flex align-items-center justify-content-center mb-4 mx-auto" style={{ width: '150px', height: '150px' }}>
              <img src={Logo} alt="Gulf Wonder Logo" className="logo-image1" height="70" />
            </div>
            <p>Explore the best destinations in the Gulf with Gulf Wonder Tourism.</p>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="text-white">Home</Link></li>
              <li className="mb-2"><Link to="/about" className="text-white">About Us</Link></li>
              <li className="mb-2"><Link to="/places" className="text-white">Places</Link></li>
              <li className="mb-2"><Link to="/signup" className="text-white">Sign Up</Link></li>
              <li className="mb-2"><Link to="/signin" className="text-white">Login</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="https://www.linkedin.com/in/ali-hussian/" className="text-white">Linkedin</Link></li>
              <li className="mb-2"><Link to="https://github.com/AliH2001" className="text-white">Github</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} Gulf Wonder Tourism. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
