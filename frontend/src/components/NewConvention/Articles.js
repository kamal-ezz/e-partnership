import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import CreationSteps from "../CreationSteps";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useStoreState } from "easy-peasy";

function Articles() {
  const history = useHistory();
  const location = useLocation();
  const conventionId = location.state.id;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [articles, setArticles] = useState([]);
  const API_URL = "http://localhost:8000";
  const token = useStoreState((state) => state.userToken);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token.auth_token}`,
    },
  };

  useEffect(() => {
    if (!location) {
      alert("You need to specify a convention");
    }
  }, [location]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        API_URL + "/api/articles/",
        articles,
        config
      );

      history.push({
        pathname: "/new/intervenants",
        state: {
          conventionId,
          institution: location.state.institution,
          title: location.state.title,
          context: location.state.context,
          dateDebut: location.state.dateDebut,
          dateFin: location.state.dateFin,
          articles,
        },
      });
    } catch (err) {
      console.log(err);
    }

    //console.log(articles);
  };

  const addNewArticle = (e) => {
    e.preventDefault();
    if (title === "" || title === null || content === "" || content === null) {
      alert("Il faut d'abord remplir les champs manquants");
    } else {
      const form = document.querySelector("#r");
      let data = new FormData(form);
      let serializedData = {};

      for (let [key, value] of data) {
        serializedData[key] = value;
      }

      serializedData.convention = location.state.id;

      setArticles([...articles, serializedData]);

      setTitle("");
      setContent("");

      /*const container = document.querySelector('#c')
      const alert = document.createElement("div")
      alert.innetHTML = `
        <div class="alert alert-info" role="alert">
            ${serializedData.title}
        </div>
      `
      container.appendChild(alert)
      */
    }
  };

  const deleteArticle = async (id) => {
    setArticles(articles.filter((article) => article.id == id));
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} id="c">
          <CreationSteps step1 step2 />

          {articles.length > 0 &&
            articles.map((article, index) => (
              <Alert key={index} variant="info" style={{ width: 450 }}>
                {article.titre}
              </Alert>
            ))}

          <Form onSubmit={submitHandler} className="mt-3" id="r">
            <Form.Group controlId="title">
              <Form.Label>Titre</Form.Label>
              <Form.Control
                name="titre"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: 450 }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="title">
              <Form.Label>Contenu</Form.Label>
              <Form.Control
                name="contenu"
                as="textarea"
                value={content}
                rows={5}
                onChange={(e) => setContent(e.target.value)}
                style={{ width: 450 }}
              ></Form.Control>
            </Form.Group>

            <Row>
              <Col>
                <Button onClick={addNewArticle} variant="secondary">
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

export default Articles;
