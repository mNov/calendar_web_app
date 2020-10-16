import { createSlice } from "@reduxjs/toolkit";

export const surveySlice = createSlice({
  name: "survey",
  initialState: {
    answers: {
      female: null,
      familyHistory: null,
      geneticMutation: null,
      personalHistory: null,
      doubleMastectomy: null,
      radiationBefore30: null,
      age: null,
    },
    currentQuestion: "female",
  },
  reducers: {
    updateAnswer: (state, action) => {
      state.answers[action.payload.question] = action.payload.answer;
    },
    updateCurrentQuestion: (state) => {
      // decision tree logic
      if (state.currentQuestion === "female") {
        state.currentQuestion = "familyHistory";
      } else if (state.currentQuestion === "familyHistory") {
        state.currentQuestion = "geneticMutation";
      } else if (state.currentQuestion === "geneticMutation") {
        state.currentQuestion = "personalHistory";
      } else if (state.currentQuestion === "personalHistory") {
        if (state.answers.personalHistory === "true") {
          state.currentQuestion = "doubleMastectomy";
        } else {
          state.currentQuestion = "radiationBefore30";
        }
      } else if (state.currentQuestion === "doubleMastectomy") {
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
