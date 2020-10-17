import React, { useState } from "react";
import ApiCalendar from "react-google-calendar-api";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Moment from "react-moment";

export const CalendarEvent = ({ eventName, frequency }) => {
  const [newEvent, setNewEvent] = useState(undefined);

  const handleItemClick = (e) => {
    if (!ApiCalendar.sign) {
      ApiCalendar.handleAuthClick();
    }
    // TODO - do not hardcode start time/end time
    // TODO - maybe include "UNTIL" time in recurrence
    var startTime = new Date();
    startTime.setHours(startTime.getHours() + 2);
    var endTime = new Date(startTime.getTime());
    endTime.setMinutes(endTime.getMinutes() + 15);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    ApiCalendar.createEvent(
      {
        start: { dateTime: startTime, timeZone },
        end: { dateTime: endTime, timeZone },
        summary: eventName,
        recurrence: frequency ? [`RRULE:FREQ=${frequency}`] : [],
      },
      "primary" // TODO - use a different calendar name
    )
      .then((result) => {
        setNewEvent(result.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log("calendar event is ");
  console.dir(newEvent);

  return (
    <>
      <button onClick={handleItemClick}>{eventName}</button>
      {newEvent && (
        <Card>
          <Card.Header>Event created on Google Calendar!</Card.Header>
          <ListGroup>
            <ListGroup.Item>Calendar ID: {newEvent.calendarId}</ListGroup.Item>
            <ListGroup.Item>Summary: {newEvent.summary}</ListGroup.Item>
            <ListGroup.Item>
              Frequency: {newEvent.recurrence || "One time"}{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              Start time: <Moment>{newEvent.start.dateTime}</Moment>
            </ListGroup.Item>
            <ListGroup.Item>
              End time: <Moment>{newEvent.end.dateTime}</Moment>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      )}
    </>
  );
};
