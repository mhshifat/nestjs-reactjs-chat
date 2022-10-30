import { configureStore } from "@reduxjs/toolkit"
import converationsReducer from "./conversationsSlice";
import messagesReducer from "./messagesSlice";
import selectedReducer from "./selectedSlice";
import groupsReducer from "./groupSlice";

export const store = configureStore({
  reducer: {
    conversationsState: converationsReducer,
    messagesState: messagesReducer,
    selectedState: selectedReducer,
    groupsState: groupsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: { serialize: { options: true } },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDisopatch = typeof store.dispatch;