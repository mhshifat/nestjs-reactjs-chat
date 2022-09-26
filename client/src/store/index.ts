import { configureStore } from "@reduxjs/toolkit"
import converationsReducer from "./conversationsSlice";
import messagesReducer from "./messagesSlice";

export const store = configureStore({
  reducer: {
    conversationsState: converationsReducer,
    messagesState: messagesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: { serialize: { options: true } },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDisopatch = typeof store.dispatch;