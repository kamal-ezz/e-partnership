import React, { useState, useEffect } from "react";
import { useStoreState } from "easy-peasy";
import axios from "axios";
import {
  Container,
  Button,
  Row,
  Card,
  Image,
  Col,
  Form,
} from "react-bootstrap";

function EditProfile() {
  const [profile, setProfile] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [institution, setInsitution] = useState("");
  const [occupation, setOccupation] = useState("");
  const [phone, setPhone] = useState("");

  const API_URL = "http://localhost:8000";
  const token = useStoreState((state) => state.userToken);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token.auth_token}`,
    },
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(API_URL + "/auth/users/me/", config);
        setProfile(data);
        setUsername(data.username);
        setEmail(data.email);
        setInsitution(data.institution);
        setOccupation(data.occupation);
        setPhone(data.phone);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, [API_URL, token, config]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      username,
      email,
      phone,
      institution,
      occupation,
    };

    try {
      const res = await axios.put(API_URL + "/auth/users/me/", payload, config);
      alert("Profile mis à jour avec succès");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="mt-3">
      <div className="main-body">
        <Row>
          <Col lg={4}>
            <Card>
              <Card.Body>
                <div class="d-flex flex-column align-items-center text-center">
                  <Image
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    alt="User"
                    roundedCircle
                    className="p-1 bg-primary"
                    width={110}
                  />
                  <div className="mt-3">
                    <h4>{profile.username}</h4>
                    <p className="text-secondary mb-1">{profile.occupation}</p>
                    <p className="text-muted font-size-sm">
                      {profile.institution}
                    </p>
                  </div>
                </div>
                <hr className="my-4" />
              </Card.Body>
            </Card>
          </Col>

          <Col lg={8}>
            <Card>
              <Card.Body>
                <Form onSubmit={submitHandler}>
                  <Row className="mb-3">
                    <Col sm={3}>
                      <h6 class="mb-0">Nom de l'utilisateur</h6>
                    </Col>
                    <Col sm={9} className="text-secondary">
                      <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      ></Form.Control>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={3}>
                      <h6 class="mb-0">Email</h6>
                    </Col>
                    <Col sm={9} className="text-secondary">
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></Form.Control>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={3}>
                      <h6 class="mb-0">Numéro de téléphone</h6>
                    </Col>
                    <Col sm={9} className="text-secondary">
                      <Form.Control
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      ></Form.Control>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={3}>
                      <h6 class="mb-0">Institution</h6>
                    </Col>
                    <Col sm={9} className="text-secondary">
                      <Form.Control
                        type="text"
                        value={institution}
                        onChange={(e) => setInsitution(e.target.value)}
                      ></Form.Control>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={3}>
                      <h6 class="mb-0">Occupation</h6>
                    </Col>
                    <Col sm={9} className="text-secondary">
                      <Form.Control
                        type="text"
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                      ></Form.Control>
                    </Col>
                  </Row>
                  {/*<Row className="mb-3">
                  <Col sm={3}>
                    <h6 class="mb-0">Mobile</h6>
                  </Col>
                  <div class="col-sm-9 text-secondary">
                    <input
                      type="text"
                      class="form-control"
                      value="(320) 380-4539"
                    />
                  </div>
                </Row>
                <div class="row mb-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Address</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <input
                      type="text"
                      class="form-control"
                      value="Bay Area, San Francisco, CA"
                    />
                  </div>
                </div>
  */}
                  <Row>
                    <Col sm={3}></Col>
                    <Col sm={9} className="text-secondary">
                      <Button variant="primary" type="submit" className="px-3">
                        Enregister
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default EditProfile;
