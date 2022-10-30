import { Conversation, CreateConversationParams, Group, Message } from "../utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getConversations, getGroups, postNewConversation } from "../utils/api";

export interface GroupState {
  groups: Group[];
  loading: boolean,
}

const initialState: GroupState = {
  groups: [],
  loading: true,
}

export const fetchGroupsThunk = createAsyncThunk("groups/fetch", async () => {
  return await getGroups()
})
// export const createConversationThunk = createAsyncThunk("conversations/create", async (data: CreateConversationParams) => {
//   return await postNewConversation(data)
// })
export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(fetchGroupsThunk.fulfilled, (state, action) => {
      state.groups = action.payload.data;
      state.loading = false;
    }).addCase(fetchGroupsThunk.rejected, (state) => {
      state.loading = false;
    }),
});

export const {} = groupsSlice.actions;
export default groupsSlice.reducer;