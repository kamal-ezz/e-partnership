import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CreationSteps from "../CreationSteps";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

function Intervenants() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [sign, setSign] = useState("");
  const [intervenants, setIntervenants] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push("/edit/final");
  };

  const addNewIntervenant = (e) => {
    e.preventDefault();
    if (email === "" || email === null) {
      alert("Il faut d'abord remplir les champs manquants");
    } else {
      const form = document.querySelector("#r");
      let data = new FormData(form);
      let serializedData = {};

      for (let [key, value] of data) {
        serializedData[key] = value;
      }

      setIntervenants([...intervenants, serializedData]);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} id="c">
          <CreationSteps step1 step2 step3 />

          {intervenants.length > 0 &&
            intervenants.map((intervenant, index) => (
              <Alert key={index} variant="info" style={{ width: 450 }}>
                {intervenant.email}
              </Alert>
            ))}

          <Form onSubmit={submitHandler} className="mt-3" id="r">
            <Form.Group controlId="title">
              <Form.Label>Titre</Form.Label>
              <Form.Control
                name="email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: 450 }}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.File id="controlFile" label="Insérer la signature" />
            </Form.Group>

            <Row>
              <Col>
                <Button onClick={addNewIntervenant} variant="secondary">
                  Ajouter un autre intervenant
                </Button>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col>
                <Button type="submit" variant="primary">
                  Continuer
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Intervenants;
