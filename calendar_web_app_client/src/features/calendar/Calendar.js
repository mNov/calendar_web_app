import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ApiCalendar from "react-google-calendar-api";

export const Calendar = ({ props }) => {
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
        console.log("authentication status is ", ApiCalendar.sign);
        break;
      case "sign out":
        ApiCalendar.handleSignoutClick();
        break;
      case "list upcoming events":
        console.log("authentication status is ", ApiCalendar.sign);
        console.log("listing events");
        ApiCalendar.listUpcomingEvents(10).then((result) => {
          setEvents(result.items)}
        );

        break;
      case "create event from now":
        console.log("authentication status is ", ApiCalendar.sign);
        console.log("creating an event");
        ApiCalendar.createEventFromNow({time: 120, summary:"test event"}).then((result) => {
          setNewEvent(JSON.stringify(result.result))}
        ).catch((error) => {console.log(error);});
        break;
      default:
        console.log("invalid option");
    }
  };

  return (
    <>
      <button onClick={handleItemClick("sign in")}>Sign in</button>
      <button onClick={handleItemClick("sign out")}>Sign out</button>
      <button onClick={handleItemClick("list upcoming events")}>
        List Next 10 Upcoming Events
      </button>
      <button onClick={handleItemClick("create event from now")}>
        Create Event From Now
      </button>
      <p>Here are the upcoming events</p>
      <ul>
        {events.map((e) => (
          <li>e</li>
        ))}
      </ul>
      <p>Here is the event that was created</p>
      <p>{newEvent}</p>
    </>
  );
};
