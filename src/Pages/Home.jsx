import React from "react";

import { useGetMoviesQuery } from "../services/TMDB";
import Spinner from "../components/Spinner";
import Main from "../components/Main";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const Home = () => {
  const { data, isFetching } = useGetMoviesQuery();

  if (isFetching) {
    return <Spinner />;
  }

  const movies = data?.results;
  const movie = movies[Math.floor(Math.random() * movies.length)];
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <div>
      <div className="relative">
        <div className="absolute  w-full h-[500px] bg-gradient-to-t from-black"></div>
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.3, x: -100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        ></motion.div> */}
        <motion.img
          initial={{ opacity: 0, scale: 0.3, y: -300 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: 0.6,
            y: { duration: 1 },
            default: { ease: "linear" },
          }}
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
          className="h-[500px] w-full object-cover"
        />
        <img
          src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
          alt={movie?.title}
          className="opacity-0 md:opacity-80 absolute top-16 rounded-lg right-24 h-[480px] w-[350px] object-cover overflow-x-hidden"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.3, x: -300 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{
          delay: 0.6,
          x: { duration: 1 },
          default: { ease: "linear" },
          type: "spring",
          stiffness: 120,
        }}
        className=" absolute bottom-[35%] px-6"
      >
        <div className="mt-5 mb-2 text-4xl font-extrabold">{movie?.title}</div>

        <p className="w-full mb-3 md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
          {truncateString(movie?.overview, 150)}
        </p>
        <p className="italic mb-3">
          Released: {movie?.release_date.split("-")[0]}
        </p>

        <div className="space-x-3">
          <Link
            to={`details/${movie?.id}`}
            className="bg-white rounded-md text-black px-5 py-2"
          >
            Play
          </Link>
          <Link
            to={`details/${movie?.id}`}
            className="bg-white rounded-md bg-opacity-30 text-white px-5 py-2"
          >
            More Info
          </Link>
        </div>
      </motion.div>
      <div className="mt-[150px]">
        <Main />
      </div>
    </div>
  );
};

export default Home;
