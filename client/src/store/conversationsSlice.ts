import { Conversation } from "../utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getConversations } from "../utils/api";

export interface ConversationsState {
  conversations: Map<number, Conversation>;
}

const initialState: ConversationsState = {
  conversations: new Map()
}

export const fetchConversationsThunk = createAsyncThunk("conversations/fetch", async () => {
  return await getConversations()
})
export const conversationsSlice = createSlice({
  name: "converations",
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations.set(action.payload.id, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConversationsThunk.fulfilled, (state, action) => {
      action.payload.data.forEach(conversation => state.conversations.set(conversation.id, conversation));
    })
  }
});

export const { addConversation } = conversationsSlice.actions;
export default conversationsSlice.reducer;