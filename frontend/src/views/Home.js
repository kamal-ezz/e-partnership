import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Switch, Route, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Activity from "../views/Activity";
import Profile from "../views/Profile";
import Convention from "../views/Convention";
import Deadline from "./Deadline";
import Articles from "../components/NewConvention/Articles";
import NewConvention from "../components/NewConvention/NewConvention";
import Intervenants from "../components/NewConvention/Intervenants";
import Final from "../components/NewConvention/Final";
import Membres from "../views/Membres";
import EditArticles from "../components/EditConvention/EditArticles";
import EditConvention from "../components/EditConvention/EditConvention";
import EditIntervenants from "../components/EditConvention/EditIntervenants";
import EditFinal from "../components/EditConvention/EditFinal";

import EditProfile from "./EditProfile";
import { useStoreState } from "easy-peasy";

function Home() {
  const token = useStoreState((state) => state.userToken);

  return (
    <>
      {token ? (
        <Row>
          <Col md={3}>
            <Sidebar />
          </Col>
          <Col md={9}>
            <Switch>
              <Route path="/conventions" component={Convention} />
              <Route path="/search/:keyword" component={Convention} />
              <Route path="/activities" component={Activity} />
              <Route path="/profile" component={Profile} />
              <Route path="/deadline" component={Deadline} />
              <Route path="/membres" component={Membres} />

              <Route path="/new/articles" component={Articles} />
              <Route path="/new-convention" component={NewConvention} />
              <Route path="/new/intervenants" component={Intervenants} />
              <Route path="/new/final" component={Final} />

              <Route path="/edit/articles/:id" component={EditArticles} />
              <Route path="/edit-convention/:id" component={EditConvention} />
              <Route
                path="/edit/intervenants/:id"
                component={EditIntervenants}
              />
              <Route path="/edit/final" component={EditFinal} />
              <Route path="/edit/profile" component={EditProfile} />
            </Switch>
          </Col>
        </Row>
      ) : (
        <Container className="mt-5">
          <Row>
            <Col md={6}>
              <Row>
                <h2>Bienvenue à ePartnership</h2>
                <p className="mt-3" style={{ fontSize: 20 }}>
                  Le moyen le plus simple de collaborer sur, signer, gérer et
                  stocker des conventions
                </p>
              </Row>
              <Row className="mt-5">
                <Link to="/login">
                  <Button variant="secondary" className="mr-3">
                    Déja inscrit ? Se connecter
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary">Nouveau ? S'inscrire</Button>
                </Link>
              </Row>
            </Col>
            <Col md={6}>
              <Image src="main.jpg" width={700} height={400} />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default Home;
