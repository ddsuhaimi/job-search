import React from "react";
import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer
      style={{
        // position: "absolute",
        bottom: "0",
        backgroundColor: "#f5f5f5"
      }}
    >
      <Container className="py-3 text-center">
        <span className="text-muted text-centered">
          Created with <i className="fas fa-heart" /> by Dedi. You can find me on:
          <br />
              <i className="fab fa-github" /> github.com/dediacc
        </span>
      </Container>
    </footer>
  );
}
