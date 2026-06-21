import React, { useState } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import "./Project.css";

const projects = [
  {
    title: "E-Commerce App",
    phase: "Phase 5",
    status: "Planned",
    description: "Full-featured MERN e-commerce platform.",
    github: "#",
    live: "#",
  },
  {
    title: "MERN Blog",
    phase: "Phase 4",
    status: "Planned",
    description: "Blog platform with authentication and CRUD operations.",
    github: "#",
    live: "#",
  },
  {
    title: "Dashboard App",
    phase: "Phase 3",
    status: "Planned",
    description: "Analytics dashboard with authentication and charts.",
    github: "#",
    live: "#",
  },
  {
    title: "Portfolio Website",
    phase: "Phase 2",
    status: "Completed",
    description: "Personal portfolio showcasing skills and projects.",
    github: "https://github.com/aswinrajkallil/Portfolio",
    live: "https://aswinraj.dev",
  },
  {
    title: "GoalScore AI",
    phase: "Phase 2",
    status: "Completed",
    description:
      "AI-powered football analytics platform with live fixtures, match insights, statistics, and intelligent sports chat assistant.",
    github: "https://github.com/aswinrajkallil/Goal_Score_AI",
    live: "https://goalscore.aswinraj.dev",
  },
  {
    title: "JAR AI",
    phase: "Phase 2",
    status: "Completed",
    description:
      "AI chatbot application built with React and Node.js, featuring conversational AI and real-time responses.",
    github: "https://github.com/aswinrajkallil/jar-ai-assistant",
    live: "https://jar.aswinraj.dev",
  },
  {
    title: "Expense Tracker",
    phase: "Phase 1",
    status: "In Progress",
    description: "Track expenses with charts and reports.",
    github: "#",
    live: "#",
  },
  {
    title: "GitHub Finder",
    phase: "Phase 1",
    status: "Completed",
    description: "Search GitHub users and repositories.",
    github: "https://github.com/aswinrajkallil/github-finder",
    live: "https://devfinder.aswinraj.dev",
  },
  {
    title: "Weather App",
    phase: "Phase 1",
    status: "Completed",
    description: "Real-time weather forecasting application.",
    github: "https://github.com/aswinrajkallil/weather-app",
    live: "https://weather.aswinraj.dev",
  },
  {
    title: "Notes App",
    phase: "Phase 1",
    status: "Completed",
    description: "Create, edit and manage notes.",
    github: "https://github.com/aswinrajkallil/note-app",
    live: "https://notes.aswinraj.dev",
  },
  {
    title: "Todo App",
    phase: "Phase 1",
    status: "Completed",
    description: "Task management application.",
    github: "https://github.com/aswinrajkallil/todo-app",
    live: "https://todo.aswinraj.dev",
  },
];

const Roadmap = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll
    ? projects
    : projects.slice(0, 4);

    const timelineHeight = visibleProjects.length * 650;


  return (
    <section className="roadmap-section">
      <div className="section-header">
        <h2 className="section-title">Developer Roadmap</h2>

        <p className="section-description">
          My journey from React fundamentals to becoming a MERN Stack Developer.
        </p>
      </div>


<svg
  className="timeline-svg"
  viewBox={`0 0 700 ${timelineHeight}`}
  preserveAspectRatio="none"
>
  <path
    d="
     M350 0
    C100 150,100 300,350 450
    C600 600,600 750,350 900
    C100 1050,100 1200,350 1350
    C600 1500,600 1650,350 1800
    C100 1950,100 2100,350 2250
    C600 2400,600 2550,350 2700
    C100 2850,100 3000,350 3150
    C600 3300,600 3450,350 3600
    C100 3750,100 3900,350 4050
    C600 4200,600 4350,350 4500
    C100 4650,100 4800,350 4950
    C600 5100,600 5250,350 5400
    C100 5550,100 5700,350 5850
    C600 6000,600 6150,350 6300
    "
    fill="none"
    stroke="white"
    strokeWidth="5"
  />
</svg>

      <div className="roadmap-container">
        {visibleProjects.map((project, index) => (
          <div
            key={index}
            className={`roadmap-item ${
              index % 2 === 0 ? "left" : "right"
            }`}
          >
            <div className="roadmap-card">
              <span className="phase">{project.phase}</span>

              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <span
                className={`status ${project.status
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                {project.status}
              </span>

              <div className="project-links">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="live-btn"
                >
                  <FaExternalLinkAlt />
                  Live
                </a>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="github-btn"
                >
                  <FaGithub />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button OUTSIDE roadmap-container */}
      <div className="view-more-container">
        <button
          className="view-more-btn"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "View More Projects"}
        </button>
      </div>
    </section>
  );
};

export default Roadmap;