import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import CreationSteps from "../CreationSteps";
import axios from "axios";
import { useStoreState } from "easy-peasy";

function Final() {
  const history = useHistory();
  const location = useLocation();
  const conventionId = location.state.conventionId;
  const institution = location.state.institution;
  const title = location.state.title;
  const context = location.state.context;
  const dateDebut = location.state.dateDebut;
  const dateFin = location.state.dateFin;
  //const articles = location.state.articles;
  const [articles, setArticles] = useState([]);
  const intervenants = location.state.intervenants;
  const API_URL = "http://localhost:8000";
  const token = useStoreState((state) => state.userToken);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token.auth_token}`,
    },
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await axios.get(API_URL + "/api/articles/", config);
        const filtredArticles = data.filter(
          (article) => article.convention == conventionId
        );
        setArticles(filtredArticles);
      } catch (err) {
        console.log(err);
      }
    };

    fetchArticles();
  }, [conventionId]);

  const finish = (e) => {
    history.push("/conventions");
  };

  return (
    <>
      <CreationSteps step1 step2 step3 step4 />
      <Row className="justify-content-md-center">
        <Card style={{ width: 400 }}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Récapitulation</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Institution</Col>
                <Col>{institution}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Titre</Col>
                <Col>{title}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Contexte</Col>
                <Col>{context}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Article</Col>
                <Col>
                  {articles.length > 0 ? (
                    articles.map((article, index) => (
                      <div key={index}>
                        <strong>{article.titre}</strong>
                        <p>{article.contenu}</p>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Intervenants</Col>
                <Col>
                  {intervenants.length > 0 ? (
                    intervenants.map((intervenant, index) => (
                      <div key={index}>
                        <span>{intervenant.email}</span>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant="primary" onClick={finish}>
                Terminer
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Row>
    </>
  );
}

export default Final;
