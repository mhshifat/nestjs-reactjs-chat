import { configureStore } from "@reduxjs/toolkit"
import converationsReducer from "./conversationsSlice";

export const store = configureStore({
  reducer: {
    conversationsState: converationsReducer
  },
  devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDisopatch = typeof store.dispatch;