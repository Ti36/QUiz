import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <h2 className="notfound-subtitle">Page Not Found</h2>
      <p>The page you are looking for doesn't exist.</p>
      <Link to="/" className="notfound-link">
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;