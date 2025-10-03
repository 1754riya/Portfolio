import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaTrophy, FaCode, FaLaptopCode, FaGitAlt, FaBullhorn, FaRegLightbulb, FaTimes } from "react-icons/fa";
import { TbApi } from "react-icons/tb";
import { SiIeee } from "react-icons/si";

// Certificate imports
import tataCert from "../../Assets/certificates/TATA Imagination Semi-Finalist.pdf";
import startupCert from "../../Assets/certificates/Riya Mehta Startup.pdf";
import campusAmbassadorCert from "../../Assets/certificates/Riya Mehta_Cert_Campus Ambassador_GSSoC2024.png";
import ieeeCert from "../../Assets/certificates/IEEE Hackathon.pdf";
import gssocCert from "../../Assets/certificates/Gssoc.png";
import postmanCert from "../../Assets/certificates/Postman API Fundamentals Student.png";
import hackgroundCert from "../../Assets/certificates/HackGround.pdf";
import codefestCert from "../../Assets/certificates/Summer of Codefest'25.pdf";
import vsocCert from "../../Assets/certificates/VSOC'24.pdf";

// Certifications data
const certifications = [
  {
    id: 1,
    title: "Tata Imagination Challenge 2024",
    provider: "The TATA Group",
    date: "2024",
    Icon: FaTrophy,
    statusTag: "National Semi-Finalist",
    imageFile: tataCert
  },
  {
    id: 2,
    title: "Pitch Deck Prastuti",
    provider: "StartUp Club, VIT Bhopal",
    date: "Sep 2024",
    Icon: FaRegLightbulb,
    statusTag: "Participant",
    imageFile: startupCert
  },
  {
    id: 3,
    title: "Campus Ambassador - GSSoC '24",
    provider: "GirlScript Foundation",
    date: "2024",
    Icon: FaBullhorn,
    statusTag: "Campus Ambassador",
    imageFile: campusAmbassadorCert
  },
  {
    id: 4,
    title: "IEEE Hackathon",
    provider: "IEEE VIT Bhopal Student Branch",
    date: "Aug 2024",
    Icon: SiIeee,
    statusTag: "Participant",
    imageFile: ieeeCert
  },
  {
    id: 5,
    title: "GirlScript Summer of Code '24",
    provider: "GirlScript Foundation",
    date: "Aug 2024",
    Icon: FaGitAlt,
    statusTag: "Contributor",
    imageFile: gssocCert
  },
  {
    id: 6,
    title: "API Fundamentals Student Expert",
    provider: "Postman",
    date: "Aug 2024",
    Icon: TbApi,
    statusTag: "Student Expert",
    imageFile: postmanCert
  },
  {
    id: 7,
    title: "HACKGROUND INDIA 2K25",
    provider: "TechVerse Nexus",
    date: "August 2025",
    Icon: FaCode,
    statusTag: "Grand Finalist",
    imageFile: hackgroundCert
  },
  {
    id: 8,
    title: "Summer of Codefest '25",
    provider: "VIT Bhopal University",
    date: "2025",
    Icon: FaLaptopCode,
    statusTag: "Participant",
    imageFile: codefestCert
  },
  {
    id: 9,
    title: "Vinyasa Summer of Code (VSOC)",
    provider: "Dayananda Sagar Academy of Technology",
    date: "2024",
    Icon: FaCode,
    statusTag: "Contributor",
    imageFile: vsocCert
  }
];

// Main Certifications Component
function Certifications() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCertImage, setSelectedCertImage] = useState("");
  const [selectedCertTitle, setSelectedCertTitle] = useState("");

  // Function to get status tag color - All Purple Theme
  const getStatusColor = (status) => {
    const statusColors = {
      "National Semi-Finalist": "bg-purple-700 text-purple-100",
      "Grand Finalist": "bg-purple-600 text-purple-100",
      "Campus Ambassador": "bg-purple-500 text-purple-100",
      "Student Expert": "bg-purple-600 text-purple-100",
      "Contributor": "bg-purple-500 text-purple-100",
      "Participant": "bg-purple-400 text-purple-100"
    };
    return statusColors[status] || "bg-purple-400 text-purple-100";
  };

  // Handle view certificate
  const onViewCert = (imageFile, title) => {
    if (imageFile) {
      setSelectedCertImage(imageFile);
      setSelectedCertTitle(title);
      setShowModal(true);
    }
  };

  // CertificationCard Internal Component
  const CertificationCard = ({ cert, onViewCert }) => {
    const { Icon } = cert;
    
    return (
      <div className="certification-card">
        <div className="certification-card-content">
          {/* Status Tag */}
          <div className={`certification-status-tag ${getStatusColor(cert.statusTag)}`}>
            {cert.statusTag}
          </div>
          
          {/* Icon Container */}
          <div className="certification-icon-container">
            <Icon className="certification-icon" />
          </div>
          
          {/* Content */}
          <div className="certification-text-content">
            <h3 className="certification-title">{cert.title}</h3>
            <h4 className="certification-provider">{cert.provider}</h4>
            <p className="certification-date">{cert.date}</p>
          </div>
          
          {/* View Certificate Button */}
          {cert.imageFile && (
            <button
              onClick={() => onViewCert(cert.imageFile, cert.title)}
              className="certification-view-btn"
            >
              View Certificate
            </button>
          )}
        </div>
      </div>
    );
  };

  // Modal Component
  const CertificateModal = () => {
    if (!showModal) return null;

    const isPDF = selectedCertImage.toLowerCase().includes('.pdf');

    return (
      <div className="certification-modal-overlay" onClick={() => setShowModal(false)}>
        <div className="certification-modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="certification-modal-header">
            <h3 className="certification-modal-title">{selectedCertTitle}</h3>
            <button 
              onClick={() => setShowModal(false)}
              className="certification-modal-close"
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="certification-modal-body">
            {isPDF ? (
              <div className="certification-pdf-container">
                <iframe
                  src={selectedCertImage}
                  title="Certificate PDF"
                  className="certification-pdf-iframe"
                />
                <div className="certification-pdf-fallback">
                  <p>Cannot display PDF? 
                    <a 
                      href={selectedCertImage} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="certification-pdf-link"
                    >
                      Open in new tab
                    </a>
                  </p>
                </div>
              </div>
            ) : (
              <img 
                src={selectedCertImage} 
                alt="Certificate" 
                className="certification-modal-image"
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Container fluid className="certifications-section">
        <Container>
          <Row style={{ justifyContent: "center", padding: "10px" }}>
            <Col md={12}>
              <h1 className="project-heading text-center mb-10">
                My <strong className="purple">Certifications</strong>
              </h1>
              
              {/* Horizontal Scrollable Container */}
              <div className="certifications-container">
                <div className="certifications-scroll-wrapper">
                  {certifications.map((cert) => (
                    <CertificationCard
                      key={cert.id}
                      cert={cert}
                      onViewCert={onViewCert}
                    />
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>

      {/* Certificate Modal */}
      <CertificateModal />
    </>
  );
}

export default Certifications;