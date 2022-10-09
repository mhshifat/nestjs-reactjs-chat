import { Conversation, DeleteMessageParams, Message } from "../utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteMessage, getConversationMessages } from "../utils/api";

export interface MessagesState {
  messages: Map<number, Message[]>;
  loading: boolean,
}

const initialState: MessagesState = {
  messages: new Map(),
  loading: true,
}

export const fetchMessagesThunk = createAsyncThunk("messages/fetch", async (id: number) => {
  return await getConversationMessages(id)
})
export const deleteMessageThunk = createAsyncThunk("messages/delete", async (data: DeleteMessageParams) => {
  return await deleteMessage(data)
})
export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<{ conversationId: number, message: Message }>) => {
      const { conversationId, message } = action.payload;
      state.messages.get(conversationId)?.unshift(message);
    },
    removeMessage: (state, action: PayloadAction<{ conversation: Conversation, message: Message }>) => {
      const conversation = action.payload.conversation;
      if (!conversation) return;
      state.messages.set(conversation.id, state.messages.get(conversation.id)?.filter(msg => msg.id !== action.payload.message.id) || []);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
        const { conversationId, messages } = action.payload.data;
        state.messages.set(conversationId, messages);
        state.loading = false;
      }).addCase(fetchMessagesThunk.rejected, (state) => {
        state.loading = false;
      })
});

export const { addMessage, removeMessage } = messagesSlice.actions;
export default messagesSlice.reducer;