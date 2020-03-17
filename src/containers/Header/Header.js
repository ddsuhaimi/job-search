import React from "react";
import { Container, Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

export default function Header() {
  return (
    
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">Jobify</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">About</Nav.Link>
          <Nav.Link href="#pricing">Contact</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
        </Container>
      </Navbar>

  );
}
