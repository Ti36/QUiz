import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand">Quizzer</NavLink>
      
      <button 
        className="hamburger" 
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation menu"
        aria-expanded={open}
      >
        {open ? '✕' : '☰'}
      </button>

      <div className={`nav-links ${open ? 'open' : ''}`}>
        <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''} onClick={closeMenu}>
          Home
        </NavLink>
        <NavLink to="/quiz" className={({ isActive }) => isActive ? 'active-link' : ''} onClick={closeMenu}>
          Start Quiz
        </NavLink>
        <NavLink to="/scores" className={({ isActive }) => isActive ? 'active-link' : ''} onClick={closeMenu}>
          Scores
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'active-link' : ''} onClick={closeMenu}>
          About
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;