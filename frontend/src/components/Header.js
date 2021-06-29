import React from "react";
import { useStoreState } from "easy-peasy";
import {
  Navbar,
  Form,
  FormControl,
  Button,
  Container,
  Nav,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  const token = useStoreState((state) => state.userToken);

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

                <Form inline className="ml-auto">
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                  />
                  <Button variant="outline-primary">Search</Button>
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
