import { createSlice } from "@reduxjs/toolkit";

export const reposSlice = createSlice({
  name: "repositories",
  initialState: {
    repositories: [],
  },
  reducers: {
    setRepos: (state, action) => {
      state.repositories = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRepos } = reposSlice.actions;

export default reposSlice.reducer;
