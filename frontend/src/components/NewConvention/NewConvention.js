import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useStoreState } from "easy-peasy";
import CreationSteps from "../CreationSteps";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function NewConvention() {
  const history = useHistory();
  const [institution, setInstitution] = useState("");
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");

  const API_URL = "http://localhost:8000";
  const token = useStoreState((state) => state.userToken);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token.auth_token}`,
    },
  };

  function join(t, s) {
    function format(m) {
      let f = new Intl.DateTimeFormat("en", m);
      return f.format(t);
    }
    let a = [{ year: "numeric" }, { month: "numeric" }, { day: "numeric" }];
    return a.map(format).join(s);
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const ins = await axios.get(API_URL + "/auth/users/me/", config);
      const institution_source = ins.data.institution;

      const payload = {
        titre: title,
        institution_a: institution_source,
        institution_b: institution,
        contenu: context,
        date_debut: join(dateDebut, "-"),
        date_fin: join(dateFin, "-"),
      };

      const { data } = await axios.post(
        API_URL + "/api/conventions/",
        payload,
        config
      );

      history.push({
        pathname: "/new/articles",
        state: {
          id: data.id,
          institution,
          title,
          context,
          dateDebut,
          dateFin,
        },
      });

      //console.log(institution_source);

      //console.log(join(dateDebut, "-"));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <CreationSteps step1 />
          <Form onSubmit={submitHandler} className="mt-3">
            <Form.Group controlId="institution">
              <Form.Label>Institution</Form.Label>
              <Form.Control
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                style={{ width: 450 }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="title">
              <Form.Label>Titre</Form.Label>
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: 450 }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="context">
              <Form.Label>Contexte</Form.Label>
              <Form.Control
                as="textarea"
                value={context}
                rows={5}
                onChange={(e) => setContext(e.target.value)}
                style={{ width: 450 }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="date_debut" className="d-flex flex-column">
              <Form.Label>Date début</Form.Label>
              <DatePicker
                selected={dateDebut}
                onChange={(date) => setDateDebut(date)}
              />
            </Form.Group>

            <Form.Group controlId="date_fin" className="d-flex flex-column">
              <Form.Label>Date fin</Form.Label>
              <DatePicker
                selected={dateFin}
                onChange={(date) => setDateFin(date)}
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Continuer
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default NewConvention;
