import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
const page = 1;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  endpoints: (builder) => ({
    getSearch: builder.query({
      query: ({ searchQuery, page }) => {
        if (searchQuery) {
          return `/search/multi?api_key=${tmdbApiKey}&query=${searchQuery}&page=${page}`;
        }
      },
    }),
    // Get movies
    getMovies: builder.query({
      query: () => `/movie/popular?page=${page}&api_key=${tmdbApiKey}`,
    }),
    getPopular: builder.query({
      query: (page) => `/movie/popular?api_key=${tmdbApiKey}&page=${page}`,
    }),
    getTopRated: builder.query({
      query: () => `/movie/top_rated?api_key=${tmdbApiKey}`,
    }),
    getUpcoming: builder.query({
      query: () => `movie/upcoming?page=${page}&api_key=${tmdbApiKey}`,
    }),
    getHorror: builder.query({
      query: () =>
        `/search/movie?api_key=${tmdbApiKey}&query=horror&page=${page}`,
    }),
    getMovie: builder.query({
      query: (id) =>
        `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    }),
    getRecommended: builder.query({
      query: (id) =>
        `/movie/${id}/recommendations?api_key=${tmdbApiKey}&page=${page}`,
    }),
    getActor: builder.query({
      query: (id) => `/person/${id}?api_key=${tmdbApiKey}`,
    }),
    getMoviesByActorId: builder.query({
      query: ({ id, page }) =>
        `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`,
    }),
    getPopularTv: builder.query({
      query: (page) => `/tv/popular?api_key=${tmdbApiKey}&page=${page}`,
    }),
    getShowDetail: builder.query({
      query: (id) =>
        `/tv/${id}?api_key=${tmdbApiKey}&append_to_response=videos,credits`,
    }),
    getSimilarTvShow: builder.query({
      query: (id) => `/tv/${id}/similar?api_key=${tmdbApiKey}&page=${page}`,
    }),
    // search: builder.query({
    //   query: ({ query, p }) =>
    //     `/search/multi?api_key=${tmdbApiKey}&query=${query}&page=${p}`,
    // }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetPopularQuery,
  useGetTopRatedQuery,
  useGetHorrorQuery,
  useGetUpcomingQuery,
  useGetRecommendedQuery,
  useGetActorQuery,
  useGetMoviesByActorIdQuery,
  useGetPopularTvQuery,
  useGetShowDetailQuery,
  useGetSimilarTvShowQuery,
  useGetSearchQuery,
} = tmdbApi;
