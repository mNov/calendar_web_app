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
      below40: null,
      between40And44: null,
      between45And54: null,
      above55: null,
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
        state.currentQuestion = "below40";
      } else if (state.currentQuestion === "below40") {
        if (state.answers.below40 === "false") {
          state.currentQuestion = "between40And44";
        } else {
          state.currentQuestion = "end";
        }
      } else if (state.currentQuestion === "between40And44") {
        if (state.answers.between40And44 === "false") {
          state.currentQuestion = "between45And54";
        } else {
          state.currentQuestion = "end";
        }
      } else if (state.currentQuestion === "between45And54") {
        if (state.answers.between45And54 === "false") {
          state.currentQuestion = "above55"; // TODO - is this necessary?
        } else {
          state.currentQuestion = "end";
        }
      } else {
        state.currentQuestion = "end";
      }
    },
  },
});

export const { updateAnswer, updateCurrentQuestion } = surveySlice.actions;

export const selectCurrentQuestion = (state) => state.survey.currentQuestion;

export const selectAllAnswers = (state) => state.survey.answers;

export default surveySlice.reducer;
