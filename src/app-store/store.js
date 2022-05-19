import { configureStore } from "@reduxjs/toolkit";
import repositories from "./reposSlice";
import details from "./detailsSlice";
import user from "./userSlice";

export default configureStore({
  reducer: {
    repos: repositories,
    user: user,
    details: details
  },
});
