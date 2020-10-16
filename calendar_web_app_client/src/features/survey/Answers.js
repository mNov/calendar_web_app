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
      {answers.age === "0-39" ? (
        <Card>
          According to Cancer.org, annual mammograms have shown no benefit to
          women under the age of 40 with no personal history of breast cancer.
        </Card>
      ) : answers.age === "40-44" ? (
        <p>
          According to the American Cancer Society, women of age 40-44 should
          have the option to do annual mammograms.
        </p>
      ) : answers.age === "45-54" ? (
        <p>
          According to the American Cancer Society, women of age 45-54 should
          receive annual mammograms.
        </p>
      ) : answers.age === "55+" ? (
        <p>
          According to the American Cancer Society, women of age 55+ can
          consider receiving mammograms every other year, or continue receiving
          mammograms every year.
        </p>
      ) : null}
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
        <Card.Header>Here are some breast cancer communities:</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item
            action
            href="https://community.breastcancer.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://community.breastcancer.org/
          </ListGroup.Item>
          <ListGroup.Item
            action
            href="https://www.youngsurvival.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.youngsurvival.org/ (for patients diagnosed 40 and
            younger)
          </ListGroup.Item>
          <ListGroup.Item
            action
            href="https://www.lbbc.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.lbbc.org/ (Living Beyond Breast Cancer - for anyone
            dealing with breast cancer)
          </ListGroup.Item>
          <ListGroup.Item
            action
            href="https://www.metavivor.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.metavivor.org/ (for metastatic breast cancer patients)
          </ListGroup.Item>
          <ListGroup.Item
            action
            href="https://www.cancercare.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.cancercare.org/ (counseling, support groups, other
            resources for people with any type of cancer)
          </ListGroup.Item>
          <ListGroup.Item
            action
            href="https://imermanangels.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://imermanangels.org/ (free one-on-one cancer suppport)
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
