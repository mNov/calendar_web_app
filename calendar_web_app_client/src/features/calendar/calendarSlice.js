import { createSlice } from "@reduxjs/toolkit";

// see features/counter/counterSlice.js for more examples

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {},
  reducers: {},
});

export const { insert, actions, here } = calendarSlice.actions;

export default calendarSlice.reducer;
