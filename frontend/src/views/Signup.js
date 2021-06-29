import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useHistory } from "react-router";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [institution, setInsitution] = useState("");
  const [occupation, setOccupation] = useState("");
  //
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const signup = useStoreActions((actions) => actions.signup);
  const token = useStoreState((state) => state.userToken);
  const history = useHistory();

  useEffect(() => {
    if (token) {
      history.push("/");
    }
  }, [history, token]);

  const submitHandler = (e) => {
    e.preventDefault();
    signup({
      username: name,
      email,
      institution,
      occupation,
      phone,
      password,
      re_password: confirmPassword,
    });
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center flex-column"
      style={{ marginTop: 80, marginBottom: 50 }}
    >
      <div
        className="d-flex justify-content-center align-items-center mb-3"
        style={{
          height: 100,
          backgroundImage: `url("main.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: 450,
        }}
      >
        <h1 className="text-white">S'insrire</h1>
      </div>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrer le nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: 450 }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Address Email </Form.Label>
          <Form.Control
            type="email"
            placeholder="Entrer email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: 450 }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="institution">
          <Form.Label>Institution</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrer le nom de votre institution"
            value={institution}
            onChange={(e) => setInsitution(e.target.value)}
            style={{ width: 450 }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="occupation">
          <Form.Label>Occupation</Form.Label>
          <Form.Control
            type="text"
            placeholder="Votre occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            style={{ width: 450 }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Numéro de téléphone(optionelle)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrer votre numéro de téléphone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirmer Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirmer mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ width: 450 }}
          ></Form.Control>
        </Form.Group>

        <Row className="py-3">
          <Button type="submit" variant="dark" className="mx-auto">
            S'inscrire
          </Button>
        </Row>
      </Form>

      <Row className="py-3">
        <Col>
          Vous avez un compte? <Link to="/login">Se connecter</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
