import React from "react";
import { useGetMovieQuery, useGetRecommendedQuery } from "../services/TMDB";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import MovieRow from "../components/MovieRow";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";
import { db } from "../firebase.config";

const Details = () => {
  const { id } = useParams();
  const { data, isFetching } = useGetMovieQuery(id);
  const { data: recommended, isFetching: isRFetching } =
    useGetRecommendedQuery(id);

  const movie = data;
  console.log(movie);
  let average = `${movie?.vote_average}`;
  average = (Math.round(average) * 10) / 10;

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  const auth = getAuth();

  if (isFetching) {
    return <Spinner />;
  }
  return (
    <>
      <div>
        <div className="relative">
          <div className="absolute w-full h-[500px] bg-gradient-to-t from-black"></div>
          <motion.img
            initial={{ opacity: 0, scale: 0.3, y: -300 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: 0.6,
              y: { duration: 1 },
              default: { ease: "linear" },
            }}
            src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
            alt=""
            className="h-[500px] w-full object-cover"
          />
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
            alt=""
            className="hidden md:block absolute top-16 rounded-lg left-24 h-[480px] w-[350px] object-cover"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.3, x: -300 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{
            delay: 0.6,
            x: { duration: 1 },
            default: { ease: "linear" },
          }}
          className=" absolute top-16 md:left-[55%] lg:left-[40%] px-6"
        >
          <div className="my-5 text-4xl font-extrabold">{movie?.title}</div>

          {movie?.tagline && (
            <div className="italic bg-white text-black p-1 w-fit">
              {movie?.tagline}
            </div>
          )}

          <div className=" mt-3 flex  flex-wrap gap-2">
            {data?.genres.map((genre, i) => (
              <button key={i} className="border-white border-2 px-3 py-1">
                {genre.name}
              </button>
            ))}
          </div>
          <div className="w-[100%] md:w-[70%] my-4">
            {truncateString(movie?.overview, 300)}
          </div>
          <div>Runtime: {movie?.runtime} mins</div>
          <div className="mb-2">
            Released: {movie?.release_date.split("-")[0]}
          </div>
          <div
            className={
              movie?.vote_average >= 7
                ? "bg-green-600 p-2 w-fit"
                : "bg-orange-500 p-2 w-fit"
            }
          >
            {average}/10
          </div>

          <div className="flex space-x-4 my-4">
            <button className="bg-white rounded-md text-black px-5 py-2">
              Play
            </button>
            <button className="bg-white rounded-md bg-opacity-30 text-white px-5 py-2">
              More Info
            </button>
          </div>

          <div className="flex my-5 space-x-2">
            <a
              className="border-2 border-white rounded px-5 py-2"
              href={data?.homepage}
              target="_blank"
              rel="noopener noreferrer"
            >
              WEBSITE
            </a>
            <a
              className="border-2 border-white rounded px-5 py-2"
              href={`https://www.imdb.com/title/${data?.imdb_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              IMDB
            </a>
            {data?.videos?.results?.length > 0 && (
              <a
                href={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
                target="_blank"
                className="border-2 border-white rounded px-5 py-2"
                rel="noopener noreferrer"
              >
                Trailer
              </a>
            )}
          </div>

          <div className="mt-4 mb-16">
            <h2 className="text-2xl mb-4">Top Casts</h2>
            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-7 md:gap-4">
              {data?.credits?.cast.slice(0, 6).map((cast, i) => (
                <Link
                  to={`/actordetails/${cast.id}`}
                  className="relative"
                  key={i}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original/${cast?.profile_path}`}
                    alt=""
                    className="w-[100px] h-[150px] object-cover rounded"
                  />
                  <div className="absolute bottom-[-20px] bg-gray-700 w-[100px] h-[50px] text-center">
                    {cast?.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <div className="mt-[640px] md:mt-[400px] mb-10 px-6">
        <div className="text-2xl">
          Recommended after watching{" "}
          <span className="text-green-500">{movie?.title}</span>
        </div>
        <MovieRow movies={recommended} isFetching={isRFetching} />
      </div>
    </>
  );
};

export default Details;
