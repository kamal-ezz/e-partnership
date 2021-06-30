import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import axios from "axios";
import { useStoreState } from "easy-peasy";
import { useHistory } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function ConventionDetails({ match }) {
  const conventionId = match.params.id;
  const history = useHistory();
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

  const back = (e) => {
    history.push("/conventions");
  };

  const download = (e) => {
    e.preventDefault();
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save(`convention_${conventionId}.pdf`);
    });
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
      <Row
        className="d-flex justify-content-between mt-3"
        style={{ width: "80%" }}
      >
        <Button variant="primary" onClick={back}>
          Retour
        </Button>
        <Button variant="info" onClick={download}>
          Télécharger
        </Button>
      </Row>

      <Row className="mt-3" id="divToPrint">
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
