import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

const CreationSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4 mt-2">
      <Nav.Item>
        {step1 ? (
          <Nav.Link href="/new-convention">Contexte</Nav.Link>
        ) : (
          <Nav.Link disabled>Contexte</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <Nav.Link>Articles</Nav.Link>
        ) : (
          <Nav.Link disabled>Articles</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <Nav.Link>Intervenants</Nav.Link>
        ) : (
          <Nav.Link disabled>Intervenants</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <Nav.Link>Finalisation</Nav.Link>
        ) : (
          <Nav.Link disabled>Finalisation</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CreationSteps;
