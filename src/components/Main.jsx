import React from "react";

import {
  useGetPopularQuery,
  useGetTopRatedQuery,
  useGetHorrorQuery,
  useGetUpcomingQuery,
} from "../services/TMDB";
import MovieRow from "./MovieRow";
const Main = () => {
  const { data: Pmovies, isFetching: isPFetching } = useGetPopularQuery();
  const { data: Tmovies, isFetching: isTFetching } = useGetTopRatedQuery();
  const { data: Hmovies, isFetching: isHFetching } = useGetHorrorQuery();
  const { data: Umovies, isFetching: isUFetching } = useGetUpcomingQuery();

  return (
    <div className="px-6 mt-8 md:mt-16 mb-8">
      <MovieRow movies={Pmovies} isFetching={isPFetching} title="Popular" />
      <MovieRow movies={Tmovies} isFetching={isTFetching} title="Top Rated" />
      <MovieRow movies={Hmovies} isFetching={isHFetching} title="Horror" />
      <MovieRow movies={Umovies} isFetching={isUFetching} title="Upcoming" />
    </div>
  );
};

export default Main;
