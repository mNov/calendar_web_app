import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  selectCurrentQuestion,
  updateCurrentQuestion,
  updateAnswer,
} from "./surveySlice";
import { Answers } from "./Answers";

const Question = (props) => {
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState(null);
  const currentQuestion = useSelector(selectCurrentQuestion);
  if (props.questionName === "start" && currentQuestion === "start") {
    return (
      <>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(updateCurrentQuestion());
          }}
        >
          <Form.Group>
            <Form.Label>{props.questionString}</Form.Label>
          </Form.Group>
          <Button variant="primary" type="submit">
            Start!
          </Button>
        </Form>
      </>
    );
  } else if (props.questionName === "age" && currentQuestion === "age") {
    return (
      <>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(updateAnswer({ question: props.questionName, answer }));
            dispatch(updateCurrentQuestion());
          }}
        >
          <Form.Group>
            <Form.Label>{props.questionString}</Form.Label>
            <br />
            <Form.Check
              inline
              type="checkbox"
              label={"0-39"}
              value={"0-39"}
              checked={answer === "0-39"}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <Form.Check
              inline
              type="checkbox"
              label={"40-44"}
              value={"40-44"}
              checked={answer === "40-44"}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <Form.Check
              inline
              type="checkbox"
              label={"45-54"}
              value={"45-54"}
              checked={answer === "45-54"}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <Form.Check
              inline
              type="checkbox"
              label={"55+"}
              value={"55+"}
              checked={answer === "55+"}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <Form.Text className="text-muted">{props.questionDesc}</Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={answer === null}>
            Click here for your results!
          </Button>
        </Form>
      </>
    );
  } else {
    return currentQuestion === props.questionName ? (
      <>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(updateAnswer({ question: props.questionName, answer }));
            dispatch(updateCurrentQuestion());
          }}
        >
          <Form.Group>
            <Form.Label>{props.questionString}</Form.Label>
            <br />
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
            <Form.Text className="text-muted">{props.questionDesc}</Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={answer === null}>
            Next question
          </Button>
        </Form>
      </>
    ) : null;
  }
};

export const Survey = () => {
  const currentQuestion = useSelector(selectCurrentQuestion);
  return (
    <>
      <Question
        questionString="Click 'Start' to start the survey!"
        questionDesc=""
        questionName="start"
      />
      <Question
        questionString="Are you biologically female?"
        questionDesc="If you were born female, select 'yes'."
        questionName="female"
      />
      <Question
        questionString="Do you have a family history of breast cancer?"
        questionDesc="If anyone in your family has ever had breast cancer, select 'yes'."
        questionName="familyHistory"
      />
      <Question
        questionString="Do you have a genetic mutation related to breast cancer?"
        questionDesc="For example, BRCA1 or BRCA2."
        questionName="geneticMutation"
      />
      <Question
        questionString="Do you have a personal history of breast cancer?"
        questionDesc="If you have ever had breast cancer, or are currently in treatment, select 'yes'."
        questionName="personalHistory"
      />
      <Question
        questionString="Have you had a double mastectomy?"
        questionDesc="If you have had breast-conserving surgery (lumpectomy) or a single mastectomy, select 'no'."
        questionName="doubleMastectomy"
      />
      <Question
        questionString="Have you had radiation to your chest before age 30?"
        questionDesc="If you have been treated with radiation therapy to your chest for another type of cancer, such as lymphoma, select 'yes'."
        questionName="radiationBefore30"
      />

      <Question
        questionString="What's your age?"
        questionDesc="Select your age range."
        questionName="age"
      />
      {currentQuestion === "end" ? (
        <div>
          <p>
            You've reached the end of the survey! Here are your answers and
            recommendations:
          </p>

          <Answers />
        </div>
      ) : null}
    </>
  );
};
