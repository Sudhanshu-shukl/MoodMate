import React from 'react';
import './About.css';

const About = () => (
  <div className="about-container">
    <div className="about-card">
      <img src={process.env.PUBLIC_URL + '/moomate logo.png'} alt="MoodMate Logo" className="about-logo" />
      <h1>About MoodMate AI</h1>
      <h2 className="about-mission">Your Modern, Emotionally Intelligent Chat Companion</h2>
      <p className="about-desc">
        MoodMate AI is designed to help you express, reflect, and grow—whether you need a supportive friend, a brutally honest advisor, or just a little sarcasm to brighten your day.
      </p>
      <ul className="about-features">
        <li><span className="about-icon">💬</span> Multiple conversation modes: Sarcastic, Brutally Honest, Supportive, Neutral</li>
        <li><span className="about-icon">🔒</span> Private, local chat history</li>
        <li><span className="about-icon">⚡</span> Fast, on-device AI (no cloud, no wait)</li>
        <li><span className="about-icon">🎨</span> Beautiful, modern, and responsive design</li>
      </ul>
      <div className="about-author">
        <div className="about-author-title">Created by <b>Sudhanshu Shukla</b></div>
        <a href="https://sudhanshu-shukl.github.io/portfolio/" target="_blank" rel="noopener noreferrer" className="about-portfolio-link">See Portfolio</a>
      </div>
    </div>
  </div>
);

export default About; 