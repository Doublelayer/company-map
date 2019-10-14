import React from "react";
import { Card, CardText } from "reactstrap";
import "./footer.css";

export default function Footer() {
  return (
    <Card className="footer">
      <CardText>
        {" "}
        Made with{" "}
        <span role="img" aria-label="love">
          💚
        </span>{" "}
        by{" "}
        <a href="https://github.com/Doublelayer" target="_blank" rel="noopener noreferrer">
          Doublelayer
        </a>
      </CardText>
    </Card>
  );
}
