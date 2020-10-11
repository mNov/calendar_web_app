import { configureStore } from "@reduxjs/toolkit";
import surveyReducer from "../features/survey/surveySlice";
//import calendarReducer from "../features/calendar/calendarSlice";

export default configureStore({
  reducer: {
    survey: surveyReducer,
    // calendar: calendarReducer,
  },
});
