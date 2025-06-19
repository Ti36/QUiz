import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-brand">Quizzer</div>
      <div className={`nav-links ${open ? 'open' : ''}`}>
        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/quiz" onClick={() => setOpen(false)}>Start Quiz</Link>
        <Link to="/scores" onClick={() => setOpen(false)}>Scores</Link>
        <Link to="/about" onClick={() => setOpen(false)}>About</Link>
      </div>
      <div className="hamburger" onClick={() => setOpen(!open)}>
        ☰
      </div>
    </nav>
  );
}

export default Navbar;
