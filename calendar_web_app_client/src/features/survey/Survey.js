import React, { useState } from "react";
import Form from "react-bootstrap/Form";

export function Survey() {
  const [surveyAnswers, setSurveyAnswers] = useState({
    personalHistory: null,
    familyHistory: null,
    geneticMutation: null,
    radiationBefore30: null,
    below40: null,
    between40And44: null,
    between45And54: null,
    above55: null,
  });

  const [currentQuestion, setCurrentQuestion] = useState(1);

  const handleSurveyAnswerChange = (questionName) => (e) => {
    setSurveyAnswers({
      ...surveyAnswers,
      [questionName]: e.target.value,
    });
    // console.log("the surveyanswers state is now");
    // console.dir(surveyAnswers);
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>
          First question: do you have a history of breast cancer?
        </Form.Label>
        <Form.Check
          inline
          type="radio"
          label={"Yes"}
          value={true}
          checked={surveyAnswers.personalHistory === "true"}
          onChange={handleSurveyAnswerChange("personalHistory")}
        />
        <Form.Check
          inline
          type="radio"
          label={"No"}
          value={false}
          checked={surveyAnswers.personalHistory === "false"}
          onChange={handleSurveyAnswerChange("personalHistory")}
        />
        <Form.Text className="text-muted">
          If you have ever had breast cancer, or are currently in treatment,
          select "yes".
        </Form.Text>
      </Form.Group>
    </Form>
  );
}
