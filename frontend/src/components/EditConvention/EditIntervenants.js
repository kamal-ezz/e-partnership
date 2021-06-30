import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import CreationSteps from "../CreationSteps";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useStoreState } from "easy-peasy";

function EditIntervenants({ match }) {
  const conventionId = match.params.id;
  const history = useHistory();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [sign, setSign] = useState(null);
  const [intervenants, setIntervenants] = useState([]);
  const [formData, setFormData] = useState([]);
  const API_URL = "http://localhost:8000";
  const token = useStoreState((state) => state.userToken);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Token ${token.auth_token}`,
    },
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      /*const { data } = await axios.post(
        API_URL + "/api/intervenants/",
        intervenants,
        config
      );*/

      let fData;
      for (fData of formData) {
        const { data } = await axios.post(
          API_URL + "/api/upload/signature",
          fData,
          config
        );
      }
    } catch (err) {
      console.log(err);
    }

    history.push({
      pathname: "/final",
      state: {
        id: location.state.id,
        institution: location.state.institution,
        title: location.state.title,
        context: location.state.context,
        dateDebut: location.state.dateDebut,
        dateFin: location.state.dateFin,
        articles: location.state.articles,
        intervenants,
      },
    });

    console.log(intervenants);
  };

  const imageHandler = (e) => {
    setSign(e.target.files[0]);
  };

  const addNewIntervenant = (e) => {
    e.preventDefault();
    if (email === "" || email === null) {
      alert("Il faut d'abord remplir les champs manquants");
    } else {
      const form = document.querySelector("#r");
      let data = new FormData(form);

      data.append("convention", location.state.id);

      if (sign) {
        data.append("signature", sign, sign.name);
      }

      let serializedData = {};

      for (let [key, value] of data) {
        serializedData[key] = value;
      }

      //serializedData.convention = location.state.id;
      //serializedData.signature = sign;

      setIntervenants([...intervenants, serializedData]);
      setFormData([...formData, data]);

      setEmail("");
      setSign(null);
      //setFormData(data);
      //console.log(location.state.articles);
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
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: 450 }}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.File
                id="controlFile"
                accept="image/png, image/jpeg"
                onChange={imageHandler}
                label="Insérer la signature"
              />
            </Form.Group>

            <Row>
              <Col>
                <Button onClick={addNewIntervenant} variant="secondary">
                  Ajouter
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

export default EditIntervenants;
