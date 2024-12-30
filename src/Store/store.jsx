import { configureStore } from "@reduxjs/toolkit";
import mentorReducer from './mentorSlice';
import groupReducer from './groupeSlice' ;
import eventsReducer from './eventsSlice';

const store = configureStore({
  reducer:{
 groups: groupReducer,
 mentors: mentorReducer,
 events: eventsReducer,
}})

export default store;