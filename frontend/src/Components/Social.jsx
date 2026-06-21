import React from 'react'
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Social = () => {
  return (
    <div className="social-section">
    <h4 className="section-heading">
        Connect
    </h4>

    <div className="social-links">
        <a
            className="social-link"
            href="https://www.linkedin.com/in/aswinrajkallil/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
        >
            <FaLinkedin />
        </a>

        <a
            className="social-link"
            href="https://github.com/aswinrajkallil"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
        >
            <FaGithub />
        </a>

        <a
            className="social-link"
            href="https://www.instagram.com/aswinraj.dev/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
        >
            <FaInstagram />
        </a>

        <a
            className="social-link"
            href="mailto:aswinrajcholakuzhi@gmail.com"
            aria-label="Email"
        >
            <MdEmail />
        </a>
        </div>
    </div>      

  )
}

export default Social
