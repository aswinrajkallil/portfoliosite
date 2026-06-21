import React from 'react'
import resume from '../assets/Aswinraj_resume.pdf'

const Hero = () => {
  return (
    <div>
      <div className="hero-content">
        <span className="availability-badge">
            • Available to Work
        </span>

        <h1 className="hero-title">
            Aswin Raj K C
        </h1>

        <h3 className="hero-subtitle">
            MERN Stack Developer & Problem Solver
        </h3>

        <p className="hero-description">
            Developed and contributed to the Nexus project over a
            period of 6 months, building features using the MERN
            stack. Collaborated on planning, implementation,
            testing, and deployment while gaining hands-on
            experience in full-stack development.
        </p>

        <div className="hero-actions">
            {/* Contact Button */}
            <button
            className="btn btn-primary"
            onClick={() => {
                document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            >
            Let's Connect
            </button>

            {/* Resume Button */}
            <button className="btn btn-secondary" 
            onClick={() => {
                const link = document.createElement("a");
                link.href = resume;
                link.download = "Aswin_Raj_Resume.pdf";
                link.click();
            }}>
                Download Resume
            </button>
        </div>
    </div>
    </div>
  )
}

export default Hero
