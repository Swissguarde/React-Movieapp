import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  useGetShowDetailQuery,
  useGetSimilarTvShowQuery,
} from "../services/TMDB";
import Spinner from "../components/Spinner";
import MovieRow from "../components/MovieRow";
import { motion } from "framer-motion";

const ShowDetails = () => {
  const { id } = useParams();
  const { data, isFetching } = useGetShowDetailQuery(id);
  const { data: similar, isFetching: isSFetching } =
    useGetSimilarTvShowQuery(id);

  if (isFetching) {
    return <Spinner />;
  }
  let average = `${data?.vote_average}`;
  average = (Math.round(average) * 10) / 10;

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <div>
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
            src={`https://image.tmdb.org/t/p/original/${data?.backdrop_path}`}
            alt=""
            className="h-[500px] w-full object-cover"
          />
          <img
            src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
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
          <div className="my-5 text-4xl font-extrabold">{data?.name}</div>
          {data?.tagline && (
            <div className="italic bg-white text-black p-1 w-fit">
              {data?.tagline}
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
            {truncateString(data?.overview, 300)}
          </div>
          <div>Season(s): {data?.number_of_seasons}</div>
          <div>Avg Runtime: {data?.episode_run_time}/mins</div>
          <div className="my-2">Released: {data?.first_air_date}</div>
          <div
            className={
              data?.vote_average >= 7
                ? "bg-green-600 p-2 w-fit"
                : "bg-orange-500 p-2 w-fit"
            }
          >
            {average}/10
          </div>
          <div className="space-x-3 mt-2">
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
            {data?.credits?.cast && (
              <h2 className="text-2xl mb-4">Top Casts</h2>
            )}
            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-7 md:gap-4">
              {data?.credits?.cast.slice(0, 3).map((cast, i) => (
                <Link
                  key={i}
                  to={`/actordetails/${cast.id}`}
                  className="relative"
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
          <span className="text-green-500">{data?.name}</span>
        </div>
        <MovieRow movies={similar} isFetching={isSFetching} showID={id} />
      </div>
    </div>
  );
};

export default ShowDetails;
