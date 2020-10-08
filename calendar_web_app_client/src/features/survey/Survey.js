import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentQuestion,
  updateAnswer,
  updateCurrentQuestion,
} from "./surveySlice";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Question(props) {
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState(null);
  const currentQuestion = useSelector(selectCurrentQuestion);
  return currentQuestion == props.questionName ? (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(updateAnswer(props.questionName, answer));
          dispatch(updateCurrentQuestion());
        }}
      >
        <Form.Group>
          <Form.Label>{props.questionString}</Form.Label>
          <Form.Check
            inline
            type="radio"
            label={"Yes"}
            value={true}
            checked={answer === "true"}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <Form.Check
            inline
            type="radio"
            label={"No"}
            value={false}
            checked={answer === "false"}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <Form.Text className="text-muted">{props.questionText}</Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Next question
        </Button>
      </Form>
    </>
  ) : null;
}

export function Survey() {
  const currentQuestion = useSelector(selectCurrentQuestion);
  return (
    <>
      <Question
        questionString="First question: do you have a history of breast cancer?"
        questionDesc="If you have ever had breast cancer, or are currently in treatment, select 'yes'."
        questionName="personalHistory"
      />
      <Question
        questionString="Next question: do you have a family history of breast cancer?"
        questionDesc="If anyone in your family has had breast cancer, select 'yes'."
        questionName="familyHistory"
      />
      <Question
        questionString="Next question: do you have a genetic mutation related to breast cancer?"
        questionDesc="For example, BRCA1 or BRCA2"
        questionName="geneticMutation"
      />
      <Question
        questionString="Next question: have you had radiation to your chest before age 30?"
        questionDesc="This would most likely be from cancer treatment, but could also be from certain types of scans (???)"
        questionName="radiationBefore30"
      />
      <Question
        questionString="Next question: are you below the age of 40?"
        questionDesc="Ages 0-39"
        questionName="below40"
      />
      <Question
        questionString="Next question: are you between the ages of 40-44?"
        questionDesc="Ages 40-44"
        questionName="between40And44"
      />
      <Question
        questionString="Next question: are you between the ages of 45-54?"
        questionDesc="Ages 45-54"
        questionName="between45And54"
      />
      <Question
        questionString="Next question: are you 55 or older?"
        questionDesc="Ages 55+"
        questionName="above55"
      />
      {currentQuestion == "end" ? (
        <div>
          You've reached the end of the survey! Here are your recommendations,
          which you can add to your Google calendar here. (Insert link to Google
          calendar)
        </div>
      ) : null}
    </>
  );
}
