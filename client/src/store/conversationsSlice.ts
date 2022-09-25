import { Conversation } from "../utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ConversationsState {
  conversations: Conversation[];
}

const initialState: ConversationsState = {
  conversations: []
}

export const conversationsSlice = createSlice({
  name: "converations",
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations.push(action.payload);
    }
  }
});

export const { addConversation } = conversationsSlice.actions;
export default conversationsSlice.reducer;