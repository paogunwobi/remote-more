import { createSlice } from "@reduxjs/toolkit";

export const detailsSlice = createSlice({
  name: "details",
  initialState: {
    details: '',
  },
  reducers: {
    setDetails: (state, action) => {
      state.details = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDetails } = detailsSlice.actions;

export default detailsSlice.reducer;
