import { Conversation, CreateConversationParams, Message } from "../utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getConversations, postNewConversation } from "../utils/api";

export interface ConversationsState {
  conversations: Conversation[];
  loading: boolean,
}

const initialState: ConversationsState = {
  conversations: [],
  loading: true,
}

export const fetchConversationsThunk = createAsyncThunk("conversations/fetch", async () => {
  return await getConversations()
})
export const createConversationThunk = createAsyncThunk("conversations/create", async (data: CreateConversationParams) => {
  return await postNewConversation(data)
})
export const conversationsSlice = createSlice({
  name: "converations",
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations.unshift(action.payload);
    },
    updateConversation: (state, action: PayloadAction<{ conversationId: number, message: Message }>) => {
      const { conversationId, message } = action.payload;
      const conversationIdx = state.conversations.findIndex(c => c.id === conversationId);
      const conversation = state.conversations[conversationIdx];
      if (conversation) conversation.lastMessageSent = message;
      state.conversations.splice(conversationIdx, 1);
      state.conversations.unshift(conversation);
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchConversationsThunk.fulfilled, (state, action) => {
        state.conversations = action.payload.data;
        state.loading = false;
      }).addCase(fetchConversationsThunk.rejected, (state) => {
        state.loading = false;
      }).addCase(createConversationThunk.fulfilled, (state, action) => {
        state.conversations.unshift(action.payload.data);
      }),
});

export const { addConversation, updateConversation } = conversationsSlice.actions;
export default conversationsSlice.reducer;