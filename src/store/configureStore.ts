import { configureStore } from "@reduxjs/toolkit";
import membersDataSlice from "./slice.ts";

const store = configureStore({
  reducer: {
    membersData: membersDataSlice
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch