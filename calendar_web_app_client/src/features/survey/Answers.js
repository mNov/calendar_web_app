import React from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { selectAllAnswers } from "./surveySlice";
import { CalendarEvent } from "../calendar/CalendarEvent";

export const Answers = () => {
  const answers = useSelector(selectAllAnswers);
  return (
    <>
      <Card>
        <Card.Header>ANSWERS</Card.Header>
        <ListGroup variant="flush">
          {Object.entries(answers)
            // ignore any of the questions that were not asked:
            .filter(([question, answer]) => answer !== null)
            .map(([question, answer]) => (
              <ListGroup.Item key={question}>
                {_.startCase(question)}: {answer}
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Card>
      <Card>
        <h3> Recommendations for mammograms</h3>
        {answers.familyHistory === "false" &&
        answers.geneticMutation == "false" &&
        answers.personalHistory === "false" &&
        answers.radiationBefore30 === "false" ? (
          <p>
            According to the answers you submitted, you might be at average risk
            for breast cancer.
            {answers.age === "0-39" ? (
              <p>
                According to Cancer.org, annual mammograms have shown no benefit
                to women under the age of 40 with no personal history of breast
                cancer.
              </p>
            ) : answers.age === "40-44" ? (
              <p>
                The American Cancer Society recommends women of age 40-44 at
                average risk to have the option to do annual mammograms.
              </p>
            ) : answers.age === "45-54" ? (
              <p>
                The American Cancer Society recommends women of age 45-54 at
                average risk to receive annual mammograms.
              </p>
            ) : answers.age === "55+" ? (
              <p>
                The American Cancer Society recommends women of age 55+ at
                average risk to consider receiving mammograms every other year,
                or continue receiving mammograms every year.
              </p>
            ) : null}
          </p>
        ) : (
          <p>
            According to the answers you submitted, you might be at high risk
            for breast cancer. Please consult a health professional for more
            information.
          </p>
        )}
      </Card>
      <Card>
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
      </Card>
      <br />
      <CalendarEvent eventName="Breast self-exam" frequency="MONTHLY" />
      <CalendarEvent eventName="Reminder to schedule appt with doctor" />
      {answers.female === true &&
        (["40-44", "45-54", "55+"].includes(answers.age) ||
          (answers.personalHistory === "true" &&
            answers.doubleMastectomy === "false")) && (
          <CalendarEvent eventName="Reminder to schedule a mammogram" />
        )}
      <Card>
        <Card.Header>
          Here are some general resources about breast cancer:
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item
            action
            href="https://www.breastcancer.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.breastcancer.org
          </ListGroup.Item>
          <ListGroup.Item
            action
            href="https://www.cancer.gov/types/breast"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.cancer.gov/types/breast
          </ListGroup.Item>
          <ListGroup.Item
            action
            href="https://www.nationalbreastcancer.org/about-breast-cancer"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.nationalbreastcancer.org/about-breast-cancer
          </ListGroup.Item>
          <ListGroup.Item
            action
            href="https://www.cdc.gov/cancer/breast/index.htm"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.cdc.gov/cancer/breast/index.htm
          </ListGroup.Item>
          <ListGroup.Item
            action
            href="https://www.knowyourlemons.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Signs of breast cancer illustrated with lemons
          </ListGroup.Item>
        </ListGroup>
      </Card>
      <Card>
        DISCLAIMER: This app was developed by non-medical professionals, and is
        intended for informational purposes only. Please speak to a medical
        professional for expert advice.
      </Card>
    </>
  );
};
