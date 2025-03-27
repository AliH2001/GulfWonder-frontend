import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import Logo from "../../assets/NavBar.png";

const NavBar = ({ user, handleSignout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
    <div className="container">

      <Link className="navbar-brand" to="/">
        <img src={Logo} height="50" alt="Gulf Wonder Logo" loading="lazy" />
      </Link>
  

      <button
        className="navbar-toggler"
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
  
      <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>

        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
          {user && (
            <li className="nav-item">
              <Link className="nav-link" to="/places">Places</Link>
            </li>
          )}
          {user && user.role === "admin" && (
            <li className="nav-item">
              <Link className="nav-link" to="/places/new">Add Place</Link>
            </li>
          )}
        </ul>
  
        <div className="d-flex align-items-center">
          {user ? (
            <button className="btn btn-danger ms-3" onClick={handleSignout}>
              Sign Out
            </button>
          ) : (
            <div className="d-flex align-items-center">
            <Link to="/signin">
              <button className="btn btn-success ms-3">
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button className="btn btn-dark ms-3">
                Sign Up
              </button>
            </Link>
          </div>
          )}
        </div>
      </div>
    </div>
  </nav>
  );
};

export default NavBar;
