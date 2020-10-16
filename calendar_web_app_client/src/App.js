import React from "react";
import { Survey } from "./features/survey/Survey";
import "./App.css";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Container className="App">
      <h4>Welcome to the Prevention Calendar!</h4>
      <Card>
        Please take the survey below and we will let you update your calendar
        with reminder appointments related to breast cancer prevention.
      </Card>
      <br />
      <Survey />
    </Container>
  );
}

export default App;
