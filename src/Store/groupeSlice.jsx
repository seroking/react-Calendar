import { createSlice } from "@reduxjs/toolkit"
import data from '../groups.json'
const groupSlice = createSlice({
  name: 'groups',
  initialState : data,
  reducers: {
    assignMentor: (state, action) => {
      const {groupId, mentorId, day} = action.payload;
      const group = state.find((group) => group.id === groupId);
        if (!group.mentors) {
          group.mentors = {};
        }
        group.mentors[day] = Number(mentorId);
    }
  }
});

export default groupSlice.reducer;
export const {assignMentor} = groupSlice.actions;
