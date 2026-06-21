import React from 'react';
import './Home.css';

import Hero from './Hero';
import Social from './Social';
import TechStack from './TechStack';
import Snake from './Snake';
import Roadmap from './Project';
import Contact from './Contact';
import Footer from './Footer';
import Chatbot from './Chatbot';

const Home = () => {
  return (
    <div className="home-page">
      <Chatbot />

      {/* Hero Section */}
      <section className="hero-section">
        <Hero />

        <div className="hero-sidebar">
          <Social />
          <TechStack />
        </div>
      </section>

      {/* Snake Animation */}
      <section className="tech-snake-section">
        <Snake />
      </section>


      {/* Roadmap */}
      <Roadmap />

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;