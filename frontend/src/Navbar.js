import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-logo">MoodMate</div>
    <div className="navbar-links">
      <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
      <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
      <a href="https://sudhanshu-shukl.github.io/portfolio/" className="nav-link" target="_blank" rel="noopener noreferrer">Portfolio</a>
    </div>
  </nav>
);

export default Navbar; 