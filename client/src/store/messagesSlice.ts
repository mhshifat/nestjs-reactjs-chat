import { Message } from "../utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getConversationMessages } from "../utils/api";

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
export const messagesSlice = createSlice({
  name: "converations",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
        const { conversationId, messages } = action.payload.data;
        state.messages.set(conversationId, messages);
        state.loading = false;
      }).addCase(fetchMessagesThunk.rejected, (state) => {
        state.loading = false;
      }),
});

export const { } = messagesSlice.actions;
export default messagesSlice.reducer;