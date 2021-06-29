import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { useStoreState } from "easy-peasy";

function ConventionDetails({ match }) {
  const conventionId = match.params.id;
  const [institution, setInstitution] = useState("");
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [articles, setArticles] = useState([]);
  const [intervenants, setIntervenants] = useState([]);

  const API_URL = "http://localhost:8000";
  const token = useStoreState((state) => state.userToken);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token.auth_token}`,
    },
  };

  useEffect(() => {
    const fetchContext = async () => {
      try {
        const { data } = await axios.get(
          API_URL + "/api/conventions/" + conventionId,
          config
        );
        setInstitution(data.institution_b);
        setTitle(data.titre);
        setContext(data.contenu);
        setDateDebut(data.date_debut);
        setDateFin(data.date_fin);
      } catch (err) {
        console.log(err);
      }
    };

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

    const fetchIntervenants = async () => {
      try {
        const { data } = await axios.get(
          API_URL + "/api/intervenants/",
          config
        );
        const filtredIntervenants = data.filter(
          (intervenant) => intervenant.convention == conventionId
        );
        setIntervenants(filtredIntervenants);
      } catch (err) {
        console.log(err);
      }
    };

    fetchContext();
    fetchArticles();
    fetchIntervenants();
  }, [conventionId]);

  return (
    <Container>
      <Row>
        <ListGroup variant="flush" style={{ width: "80%" }}>
          <ListGroup.Item>
            <h5>Context</h5>
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
              <Col>Date Début</Col>
              <Col>{dateDebut}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Date Fin</Col>
              <Col>{dateFin}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>
                <h5>Articles</h5>
              </Col>
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
              <Col>
                <h5>Intervenants</h5>
              </Col>
              <Col>
                {intervenants.length > 0 ? (
                  intervenants.map((intervenant, index) => (
                    <div key={index}>
                      <span>{intervenant.email}</span>
                      <img
                        src={intervenant.signature.replace(
                          "http://localhost:8000/public/",
                          "/"
                        )}
                        width={250}
                        height={150}
                        className="mt-3"
                      />
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Row>
    </Container>
  );
}

export default ConventionDetails;
