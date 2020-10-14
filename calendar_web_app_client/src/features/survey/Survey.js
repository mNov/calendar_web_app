import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  selectCurrentQuestion,
  updateCurrentQuestion,
  selectAllAnswers,
  updateAnswer,
} from "./surveySlice";
import { Calendar } from "../calendar/Calendar";

const Question = (props) => {
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState(null);
  const currentQuestion = useSelector(selectCurrentQuestion);
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
};

const Answers = () => {
  const answers = useSelector(selectAllAnswers);
  return (
    <div>
      <ul>
        {Object.entries(answers)
          // ignore any of the questions that were not asked:
          .filter(([question, answer]) => answer !== null)
          .map(([question, answer]) => (
            <li key={question}>
              {_.startCase(question)}: {answer}
            </li>
          ))}
      </ul>
      <p>
        Risk factors for breast cancer include being biologically female, having
        a family history, genetic mutation, and/or personal history of breast
        cancer, having had radiation to your chest at a young age, and being 55
        or older. However, anyone with any breast tissue has a chance of getting
        this disease, even if they are not female. See{" "}
        <a
          href="https://www.cancer.org/cancer/breast-cancer/risk-and-prevention/breast-cancer-risk-factors-you-cannot-change.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          this list of risk factors from the ACS
        </a>{" "}
        for more information. You should make an appointment to speak to your
        doctor if you have any concerns about your own risk. In any case, it is
        a great idea to give yourself a breast exam once a month, even if you do
        not have any of these risk factors. Click below to schedule reminders on
        Google Calendar.
      </p>
      <br />
      {/* TODO: pass other relevant props to Calendar? */}
      <Calendar eventName="Breast self-exam" frequency="MONTHLY" />
      <Calendar eventName="Reminder to schedule appt with doctor" />
      <p>
        DISCLAIMER: This app was developed by non-medical professionals, and is
        intended for informational purposes only. Please speak to a medical
        professional for expert advice.
      </p>
    </div>
  );
};

export const Survey = () => {
  const currentQuestion = useSelector(selectCurrentQuestion);
  return (
    <>
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
        questionString="Have you had radiation to your chest before age 30?"
        questionDesc="If you have been treated with radiation therapy to your chest for another type of cancer, such as lymphoma, select 'yes'."
        questionName="radiationBefore30"
      />
      <Question
        questionString="Are you below the age of 40?"
        questionDesc="Ages 0-39"
        questionName="below40"
      />
      <Question
        questionString="Are you between the ages of 40-44?"
        questionDesc="Ages 40-44"
        questionName="between40And44"
      />
      <Question
        questionString="Are you between the ages of 45-54?"
        questionDesc="Ages 45-54"
        questionName="between45And54"
      />
      <Question
        questionString="Are you 55 or older?"
        questionDesc="Ages 55+"
        questionName="above55"
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
