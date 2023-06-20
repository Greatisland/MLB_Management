import { configureStore } from "@reduxjs/toolkit";
import membersDataSlice from "./slice";

const store = configureStore({
  reducer: {
    membersData: membersDataSlice
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch