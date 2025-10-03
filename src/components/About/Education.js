import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CBSELogo from "../../Assets/logos/CBSE.png";
import VITLogo from "../../Assets/logos/vit-bhopal-logo.png";

// Main Education Component
function Education() {
  // EducationCard Internal Component
  const EducationCard = ({ logoSrc, degree, institute, years, grade }) => {
    return (
      <div className="education-card-refactored">
        <div className="education-card-content-refactored">
          <div className="education-logo-container">
            <img src={logoSrc} alt="Institution Logo" className="education-logo-img" />
          </div>
          <div className="education-text-content">
            <h3 className="education-degree-title">{degree}</h3>
            <h4 className="education-institute-name">{institute}</h4>
            <p className="education-duration">{years}</p>
            <p className="education-grade-score">{grade}</p>
          </div>
        </div>
      </div>
    );
  };

  // Education data with imported logos
  const educationData = [
    {
      id: 1,
      logoSrc: CBSELogo,
      degree: "10th Secondary School",
      institute: "Central Board of Secondary Education",
      years: "March 2020 – April 2021",
      grade: "86.6%",
    },
    {
      id: 2,
      logoSrc: CBSELogo,
      degree: "12th Senior Secondary School",
      institute: "Central Board of Secondary Education", 
      years: "March 2022 – May 2023",
      grade: "88.6%",
    },
    {
      id: 3,
      logoSrc: VITLogo,
      degree: "B.Tech, Computer Science",
      institute: "Vellore Institute of Technology, Bhopal",
      years: "August 2023 – July 2027",
      grade: "8.94 CGPA",
    },
  ];

  return (
    <Container fluid className="education-section">
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col md={12}>
            <h1 className="project-heading">
              My <strong className="purple">Education</strong>
            </h1>
            
            {/* Horizontal Timeline Container */}
            <div className="timeline-container-horizontal">
              <div className="timeline-line-horizontal"></div>
              <div className="timeline-entries-horizontal">
                {educationData.map((education, index) => (
                  <div key={education.id} className="timeline-entry-horizontal">
                    {/* Timeline Dot */}
                    <div className="timeline-dot-horizontal"></div>
                    
                    {/* Education Card */}
                    <EducationCard
                      logoSrc={education.logoSrc}
                      degree={education.degree}
                      institute={education.institute}
                      years={education.years}
                      grade={education.grade}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Education;