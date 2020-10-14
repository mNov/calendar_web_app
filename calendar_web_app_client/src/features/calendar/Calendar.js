import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ApiCalendar from "react-google-calendar-api";

export const Calendar = ({ eventName, frequency }) => {
  const [sign, setSign] = useState(ApiCalendar.sign);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    // TODO - some kind of initialization needed?
  });

  const handleItemClick = (name) => (e) => {
    switch (name) {
      case "sign in":
        ApiCalendar.handleAuthClick();
        break;
      case "sign out":
        ApiCalendar.handleSignoutClick();
        break;
      case "list upcoming events":
        ApiCalendar.listUpcomingEvents(10)
          .then((result) => {
            setEvents(result.result.items);
          })
          .catch((error) => {
            console.log(error);
          });

        break;
      case "create event":
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
        break;
      default:
        console.log("invalid option");
    }
  };

  return (
    <>
      {/* <button onClick={handleItemClick("sign in")}>Sign in</button> */}
      {/* <button onClick={handleItemClick("sign out")}>Sign out</button> */}
      {/* <button onClick={handleItemClick("list upcoming events")}>
        List Next 10 Upcoming Events
      </button> */}
      <button onClick={handleItemClick("create event")}>{eventName}</button>
      {/* <p>Here are the upcoming events</p>
      <ul>
        {events.map((e, i) => (
          <li key={i}>{JSON.stringify(e)}</li>
        ))}
      </ul> */}
      {newEvent ? (
        <div>
          <h6>Created an event!</h6>
          <p>Calendar: {newEvent.calendarId}</p>
          <p>Summary: {newEvent.summary}</p>
          <p>Frequency: {newEvent.recurrence} </p>
          <p>Start time: {newEvent.start.dateTime}</p>
          <p>End time: {newEvent.end.dateTime}</p>
        </div>
      ) : null}
    </>
  );
};
