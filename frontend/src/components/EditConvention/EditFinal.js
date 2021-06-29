import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import CreationSteps from "../CreationSteps";

function EditFinal() {
  const [context, setContext] = useState({
    title: "b",
    context: "c",
  });
  const [articles, setArticles] = useState([
    {
      title: "a",
      content: "d",
    },
  ]);
  const [intervenants, setIntervenants] = useState([
    {
      email: "kamal@g.net",
      sign: "",
    },
  ]);

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
                <Col>Titre</Col>
                <Col>{context.title}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Contexte</Col>
                <Col>{context.context}</Col>
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
              <Button variant="primary">Terminer</Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Row>
    </>
  );
}

export default EditFinal;
