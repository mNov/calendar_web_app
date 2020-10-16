import React, { useState } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import ListGroup from "react-bootstrap/ListGroup";
import { selectAllAnswers } from "./surveySlice";

import { Calendar } from "../calendar/Calendar";

export const Answers = () => {
  const answers = useSelector(selectAllAnswers);
  return (
    <div>
      <ListGroup>
        {Object.entries(answers)
          // ignore any of the questions that were not asked:
          .filter(([question, answer]) => answer !== null)
          .map(([question, answer]) => (
            <ListGroup.Item key={question}>
              {_.startCase(question)}: {answer}
            </ListGroup.Item>
          ))}
      </ListGroup>
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
