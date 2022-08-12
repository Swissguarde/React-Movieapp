import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/TMDB";
import movieOrShowReducer from "../features/searchMovieOrShow";
export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    searchMovieOrShow: movieOrShowReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});
