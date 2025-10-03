import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Riya Mehta </span>
            from <span className="purple"> Indore, India.</span>
            <br />
            I am <span className="purple">aspiring software developer</span> and curious learner and enthusiastic developer from VIT Bhopal.
            <br />
           I’m deeply curious about <strong className="purple">innovation, leadership, and creating</strong> opportunities that drive growth.
            <br />
            <br />
            <span className="purple">Apart from coding, some other activities that I love to do!</span>
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Games-Badminton,Volleyball,Circket
            </li>
            <li className="about-activity">
              <ImPointRight /> Writing Tech Blogs
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build things that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">Riya</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
