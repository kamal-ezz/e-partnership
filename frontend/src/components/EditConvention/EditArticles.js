import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import CreationSteps from "../CreationSteps";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useStoreState } from "easy-peasy";

function EditArticles({ match }) {
  const conventionId = match.params.id;
  const history = useHistory();
  const location = useLocation();
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

    const fetchArticles = async () => {
      try {
        const { data } = await axios.get(API_URL + "/api/articles/", config);
        const filtredArticles = data.filter(
          (article) => article.convention === conventionId
        );
        setArticles(filtredArticles);
      } catch (err) {
        console.log(err);
      }
    };

    fetchArticles();
  }, [location, config, conventionId]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        API_URL + "/api/articles/",
        articles,
        config
      );

      history.push({
        pathname: "/edit/intervenants",
        state: {
          id: location.state.id,
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
    }
  };

  const deleteArticle = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} id="c">
          <CreationSteps step1 step2 />

          {articles.length > 0 &&
            articles.map((article, index) => (
              <div key={index} className="d-flex">
                <Alert variant="info" style={{ width: 450 }}>
                  {article.titre}
                </Alert>
                <Button variant="danger" onClick={deleteArticle}>
                  Delete
                </Button>
              </div>
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
                  Ajouter une autre article
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

export default EditArticles;
