import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        <h3 className="footer-logo">
          Aswin Raj
        </h3>

        <p className="footer-text">
          MERN Stack Developer | React Enthusiast
        </p>

        <div className="footer-socials">
          <a
            href="https://github.com/aswinrajkallil"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://instagram.com/aswinraj.dev"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram />
          </a>
        </div>

        <div className="footer-line"></div>

        <p className="footer-copy">
          © 2026 Aswin Raj. Built with React.
        </p>

      </div>
    </footer>
  );
};

export default Footer;