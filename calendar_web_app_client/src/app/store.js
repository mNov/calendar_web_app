import { configureStore } from "@reduxjs/toolkit";
import surveyReducer from "../features/survey/surveySlice";

export default configureStore({
  reducer: {
    survey: surveyReducer,
  },
});
