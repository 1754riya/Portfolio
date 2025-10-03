import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeGirl from "../../Assets/Home-girl.png";
import Particle from "../Particle";
import ParticleBackground from "../ParticleBackground";
import Home2 from "./Home2";
import Type from "./Type";
import ContactModal from "../ContactModal";

function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <section>
      <ParticleBackground />
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row className="align-items-center home-main-row">
            <Col md={6} className="home-image-col">
              <div className="home-image-container">
                <div className="neon-circles">
                  <div className="neon-circle circle-1"></div>
                  <div className="neon-circle circle-2"></div>
                  <div className="neon-circle circle-3"></div>
                </div>
                <img
                  src={homeGirl}
                  alt="Riya Mehta"
                  className="home-girl-image"
                />
              </div>
            </Col>

            <Col md={6} className="home-text-col">
              <div className="home-content-wrapper">
                <h2 className="home-greeting">
                  Hello, I'm
                </h2>
                
                <h1 className="home-name">
                  RIYA MEHTA
                </h1>

                <h3 className="home-title">
                  And I'm a <span className="home-type-wrapper"><Type /></span>
                </h3>

                <p className="home-description">
                  A passionate Computer Science student at VIT Bhopal with a strong interest 
                  in building full-stack applications and a keen interest in open source contribution 
                  and AI in healthcare.
                </p>

                <div className="home-buttons">
                  <button className="home-btn hire-btn">
                    Let's Build
                  </button>
                  <button 
                    className="home-btn contact-btn"
                    onClick={() => {
                      console.log('Contact button clicked!');
                      setIsContactModalOpen(true);
                    }}
                  >
                    Contact Me
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </section>
  );
}

export default Home;
