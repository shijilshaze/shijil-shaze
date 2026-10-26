import React from 'react';
import './Skills.css';

import spiderWebImg from './assets/spiderman-web.png';
import spiderManImg from './assets/image copy 3.png';

const skillsData = [
  // Left Column (Cards 1-5)
  { name: "REACT / NEXT.JS", category: "FRONTEND", level: "ADVANCED", column: "left" },
  { name: "NODE.JS & EXPRESS", category: "BACKEND", level: "ADVANCED", column: "left" },
  { name: "DOCKER & DEV", category: "TOOLS", level: "PROFICIENT", column: "left" },
  { name: "GSAP ANIMATIONS", category: "FRONTEND", level: "ADVANCED", column: "left" },
  { name: "GIT & GITHUB", category: "TOOLS", level: "ADVANCED", column: "left" },
  
  // Right Column (Cards 6-10)
  { name: "JAVASCRIPT / TS", category: "LANGUAGES", level: "ADVANCED", column: "right" },
  { name: "POSTGRESQL & MONGO", category: "BACKEND", level: "PROFICIENT", column: "right" },
  { name: "PYTHON / AI & ML", category: "LANGUAGES", level: "PROFICIENT", column: "right" },
  { name: "TAILWIND CSS", category: "FRONTEND", level: "ADVANCED", column: "right" },
  { name: "DATA STRUCTURES", category: "LANGUAGES", level: "ADVANCED", column: "right" }
];

export default function Skills() {
  const leftColumnSkills = skillsData.filter(s => s.column === 'left');
  const rightColumnSkills = skillsData.filter(s => s.column === 'right');

  return (
    <section className="skills-section">
      {/* Spider Web Background Decoration */}
      <div 
        className="skills-web-decoration" 
        style={{ backgroundImage: `url(${spiderWebImg})` }} 
      />

      {/* Top Header */}
      <div className="skills-header">
        <span className="skills-subtitle">ARSENAL & EXPERTISE</span>
        <h2 className="skills-title">TECHNICAL SKILLS.</h2>
        <div className="skills-title-underline"></div>
      </div>

      {/* Main Container */}
      <div className="skills-container">
        {/* Two Columns Grid */}
        <div className="skills-grid-wrapper">
          <div className="skills-column">
            {leftColumnSkills.map((skill, index) => (
              <div className="skill-card" key={index}>
                <div className="skill-card-fill"></div>
                <div className="skill-card-content">
                  <div className="skill-info-group">
                    <span className="skill-card-indicator"></span>
                    <div className="skill-text-group">
                      <h3 className="skill-card-name">{skill.name}</h3>
                      <span className="skill-card-category">{skill.category}</span>
                    </div>
                  </div>
                  <div className="skill-card-level">{skill.level}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="skills-column">
            {rightColumnSkills.map((skill, index) => (
              <div className="skill-card" key={index}>
                <div className="skill-card-fill"></div>
                <div className="skill-card-content">
                  <div className="skill-info-group">
                    <span className="skill-card-indicator"></span>
                    <div className="skill-text-group">
                      <h3 className="skill-card-name">{skill.name}</h3>
                      <span className="skill-card-category">{skill.category}</span>
                    </div>
                  </div>
                  <div className="skill-card-level">{skill.level}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hanging Spider-Man Illustration on the Right */}
        <div className="skills-spiderman-wrapper">
          <div className="spiderman-thread"></div>
          <img 
            src={spiderManImg} 
            alt="Hanging Spider-Man" 
            className="skills-spiderman"
          />
        </div>
      </div>
    </section>
  );
}