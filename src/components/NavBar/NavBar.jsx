import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./NavBar.css";
import Logo from "../../assets/NavBar.png";

const NavBar = ({ user, handleSignout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <nav className="navbar">
        <div className="container">
          {/* Logo */}
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="Logo" className="logo-image" />
            </Link>
          </div>
          {/* Desktop Menu */}
          <div className={`menu-links ${menuOpen ? "active" : ""}`}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/places">Places</Link> 
            {user && user.role === "admin" && (
              <>
                <Link to="/places/new">Add Place</Link>
                <Link to="/places/:placeId/edit">Edit Place</Link>
              </>
            )}
            {user ? (
              <button className="btn-signout" onClick={handleSignout}>
                Sign Out
              </button>
            ) : (
              <>
                <Link to="/signin">
                  <button className="btn-login">Login</button>
                </Link>
                <Link to="/signup">
                  <button className="btn-signup">Sign Up</button>
                </Link>
              </>
            )}
          </div>
          {/* Hamburger Icon */}
          <button className="menu-toggle" onClick={toggleMenu}>
            <div className={`hamburger ${menuOpen ? "open" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;