import { configureStore } from "@reduxjs/toolkit"
import converationsReducer from "./conversationsSlice";

export const store = configureStore({
  reducer: {
    conversationsState: converationsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDisopatch = typeof store.dispatch;