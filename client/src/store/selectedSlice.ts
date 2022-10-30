import { Conversation, CreateConversationParams, Message } from "../utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getConversations, postNewConversation } from "../utils/api";

export interface SelectedState {
  type: "group" | "private";
}

const initialState: SelectedState = {
  type: "private"
}

export const selectedSlice = createSlice({
  name: "selectedState",
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<SelectedState["type"]>) => {
      state.type = action.payload;
    }
  }
});

export const { setType } = selectedSlice.actions;
export default selectedSlice.reducer;