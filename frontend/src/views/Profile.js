import React, { useState, useEffect } from "react";
import { useStoreState } from "easy-peasy";
import axios from "axios";
import { Container, Button, Row, Card, Image, Col } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState({});
  const location = useLocation();
  const loc = location.state;

  const API_URL = "http://localhost:8000";
  const token = useStoreState((state) => state.userToken);

  useEffect(() => {
    const fetchProfile = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token.auth_token}`,
        },
      };

      try {
        const path = loc ? `/auth/users/${loc.id}` : "/auth/users/me";

        const { data } = await axios.get(API_URL + path, config);
        setProfile(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, [API_URL, token, loc]);

  return (
    <Container fluid className="mt-5">
      <Row className="gutters-sm">
        <Col md={4} className="mb-3">
          <Card>
            <Card.Body>
              <div className="d-flex flex-column align-items-center text-center">
                <Image
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  alt="User"
                  roundedCircle
                  width={150}
                />
                <div className="mt-3">
                  <h4>{profile.username}</h4>
                  <p className="text-secondary mb-1">{profile.occupation}</p>
                  <p className="text-muted font-size-sm">
                    {profile.institution}
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Row>
                <Col sm={3}>
                  <h6 className="mb-0">Nom de l'utilsateur</h6>
                </Col>
                <Col sm={9} className="text-secondary">
                  {profile.username}
                </Col>
              </Row>

              <hr />

              <Row>
                <Col sm={3}>
                  <h6 className="mb-0">Email</h6>
                </Col>
                <Col sm={9} className="text-secondary">
                  {profile.email}
                </Col>
              </Row>

              <hr />

              <Row>
                <Col sm={3}>
                  <h6 className="mb-0">Numéro de téléphone</h6>
                </Col>
                <Col sm={9} className="text-secondary">
                  {profile.phone}
                </Col>
              </Row>

              <hr />

              {/*<div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Mobile</h6>
                </div>
                <div className="col-sm-9 text-secondary">(320) 380-4539</div>
              </div>

              <hr />

              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Address</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  Bay Area, San Francisco, CA
                </div>
              </div>
  */}

              {!loc && (
                <Row>
                  <Col sm={12}>
                    <Link to="/edit/profile">
                      <Button variant="info">Edit</Button>
                    </Link>
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
