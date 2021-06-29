import React, { useState } from "react";
import { useStoreState } from "easy-peasy";
import {
  Navbar,
  Form,
  FormControl,
  Button,
  Container,
  Nav,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

function Header() {
  const token = useStoreState((state) => state.userToken);
  const [keyword, setKeyword] = useState("");
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Link to="/">
            <Navbar.Brand>ePartnership</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {!token ? (
              <Nav className="ml-auto">
                <Nav.Link href="/login">Se connecter</Nav.Link>
                <Nav.Link href="/signup">S'inscrire</Nav.Link>
              </Nav>
            ) : (
              <>
                <Nav>
                  <Nav.Link href="/membres">Membres</Nav.Link>
                </Nav>

                <Form inline className="ml-auto" onSubmit={submitHandler}>
                  <FormControl
                    type="text"
                    name="keyword"
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Rechercher des conventions..."
                    className="mr-sm-2 ml-sm-5"
                    style={{ width: 250 }}
                  />
                  <Button type="submit" variant="outline-primary">
                    Rechercher
                  </Button>
                </Form>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
