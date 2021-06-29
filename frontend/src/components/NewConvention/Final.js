import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import CreationSteps from "../CreationSteps";

function Final() {
  const history = useHistory();
  const location = useLocation();
  const id = location.state.id;
  const institution = location.state.institution;
  const title = location.state.title;
  const context = location.state.context;
  const dateDebut = location.state.dateDebut;
  const dateFin = location.state.dateFin;
  const articles = location.state.articles;
  const intervenants = location.state.intervenants;

  const finish = (e) => {
    //e.preventDefault()
    localStorage.setItem(`convention_${id}`, location.state);
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
                <Col>Articles</Col>
                <Col>
                  {articles.length > 0 ? (
                    articles.map((article, index) => (
                      <div key={index}>
                        <span>{article.title}</span>
                        <p>{article.content}</p>
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
                        {/*<img src={intervenant.sign} />*/}
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
