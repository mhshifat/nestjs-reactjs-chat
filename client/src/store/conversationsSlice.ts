import { Conversation, Message } from "../utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getConversationMessages, getConversations } from "../utils/api";

export interface ConversationsState {
  conversations: Map<number, Conversation>;
  loading: boolean,
}

const initialState: ConversationsState = {
  conversations: new Map(),
  loading: true,
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
    updateConversation: (state, action: PayloadAction<{ conversationId: number, message: Message }>) => {
      const { conversationId, message } = action.payload;
      const conversation = state.conversations.get(conversationId);
      if (conversation) conversation.lastMessageSent = message;
      state.conversations.delete(conversationId);
      const conversations = Array.from(state.conversations.values());
      const newConversationsMap = new Map();
      newConversationsMap.set(conversationId, conversation);
      conversations.forEach(con => newConversationsMap.set(con.id, con));
      state.conversations = newConversationsMap;
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchConversationsThunk.fulfilled, (state, action) => {
        action.payload.data.forEach(conversation => state.conversations.set(conversation.id, conversation));
        state.loading = false;
      }).addCase(fetchConversationsThunk.rejected, (state) => {
        state.loading = false;
      }),
});

export const { addConversation, updateConversation } = conversationsSlice.actions;
export default conversationsSlice.reducer;