import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useHistory } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const login = useStoreActions((actions) => actions.login);
  const token = useStoreState((state) => state.userToken);

  useEffect(() => {
    if (token) {
      history.push("/");
    }
  }, [history, token]);

  const submitHandler = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2>Connexion</h2>

          <Form onSubmit={submitHandler} className="mt-4">
            <Form.Group controlId="email">
              <Form.Label>Addresse email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Entrer email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: 450 }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Entrer mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: 450 }}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Continuer
            </Button>
          </Form>

          <Row className="py-3">
            <Col>
              Nouveau Utilisateur? <Link to="/signup">S'inscrire</Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
