import React from "react";
import { Survey } from "./features/survey/Survey";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h4>Welcome to the Prevention Calendar!</h4>
      <p>
        Please take the survey below and we will let you update your calendar
        with reminder appointments related to breast cancer prevention.
      </p>
      <br />
      <Survey />
    </div>
  );
}

export default App;
