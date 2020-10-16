import { createSlice } from "@reduxjs/toolkit";

export const surveySlice = createSlice({
  name: "survey",
  initialState: {
    answers: {
      female: null,
      familyHistory: null,
      geneticMutation: null,
      personalHistory: null,
      radiationBefore30: null,
      // TODO - maybe don't ask yes/no q's for all 4 of these
  
      age:null
    },
    currentQuestion: "female",
  },
  reducers: {
    updateAnswer: (state, action) => {
      state.answers[action.payload.question] = action.payload.answer;
    },
    updateCurrentQuestion: (state) => {
      // tree logic goes here - TODO - this could be improved
      if (state.currentQuestion === "female") {
        state.currentQuestion = "familyHistory";
      } else if (state.currentQuestion === "familyHistory") {
        state.currentQuestion = "geneticMutation";
      } else if (state.currentQuestion === "geneticMutation") {
        state.currentQuestion = "personalHistory";
      } else if (state.currentQuestion === "personalHistory") {
        state.currentQuestion = "radiationBefore30";
      } else if (state.currentQuestion === "radiationBefore30") {
        state.currentQuestion = "age";
      } else if (state.currentQuestion === "age") {
        state.currentQuestion = "end";
      }
    },
  },
});

export const { updateAnswer, updateCurrentQuestion } = surveySlice.actions;

export const selectCurrentQuestion = (state) => state.survey.currentQuestion;

export const selectAllAnswers = (state) => state.survey.answers;

export default surveySlice.reducer;
