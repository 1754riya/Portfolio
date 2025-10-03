import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import skillcircuitImg from "../../Assets/Projects/skillcircuit.png";
import edustackImg from "../../Assets/Projects/edustack.png";
import medichainImg from "../../Assets/Projects/medichain.png";
import jeevanChakraImg from "../../Assets/Projects/jeevanChakra.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={skillcircuitImg}
              isBlog={false}
              title=<span className="purple">"SkillCircuit 3D Nexus"</span>
              description="Developed a dynamic, single-page website for SkillCircuit's 3D Nexus project using React.js and Tailwind CSS. Engineered a responsive and visually appealing user interface with smooth scrolling effects and modern design, ensuring an optimal experience across various devices."
              ghLink="https://github.com/1754riya/skillcircuit-3d-nexus-49-main"
              demoLink="https://skillcircuit-delta.vercel.app"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={edustackImg}
              isBlog={false}
              title=<span className="purple">"EduStack"</span>
              description="AI Course Generator is a web application built with Next.js to create and manage personalized coding courses. This project leverages the power of Gemini for generating course content and integrates YouTube videos using the YouTube Data API v3, tailoring course materials to users' preferences and learning needs."
              ghLink="https://github.com/1754riya/EduStack-"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={medichainImg}
              isBlog={false}
              title=<span className="purple">"MediChain"</span>
              description="MediChain is an online healthcare platform designed to streamline access and delivery through features like appointment booking, NGO integration, and child vaccination tracking. Built with the goal of supporting underserved communities, MediChain offers dedicated dashboards for both doctors and patients, promoting transparency, efficiency, and targeted medical aid."
              ghLink="https://github.com/1754riya/MediChain"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={jeevanChakraImg}
              isBlog={false}
              title=<span className="purple">"Jeevan Chakra"</span>
              description="A comprehensive digital healthcare ecosystem designed to provide seamless healthcare solutions through technology. Features an AI-driven medical chatbot for guidance, doctor appointment booking, a BMI calculator with personalized meal plans, pill reminders, and mental wellness support."
              ghLink="https://github.com/1754riya/Jeevan_Chakra"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
