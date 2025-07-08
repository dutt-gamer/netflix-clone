import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import themeReducer from "./themeSlice";
import moviesReducer from "./moviesSlice";
import gptReducer from "./gptSlice";
import configReducer from "./configSlice"

const appStore = configureStore({
  reducer: {
    user: userReducer,
    theme : themeReducer,
    movies : moviesReducer,
    gpt : gptReducer,
    config : configReducer,
  },
});

export default appStore;