import { createSlice } from "@reduxjs/toolkit"
import data from '../mentors.json'

const mentorsSlice = createSlice({
  name: 'mentors',
  initialState: data,
  reducers: {

  },
});

export default mentorsSlice.reducer;
export const {} = mentorsSlice.actions;