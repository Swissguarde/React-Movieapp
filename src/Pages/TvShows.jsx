import React, { useState } from "react";
import { useGetPopularTvQuery } from "../services/TMDB";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import { motion } from "framer-motion";

const TvShows = () => {
  const [page, setPage] = useState(1);

  const { data: shows, isFetching } = useGetPopularTvQuery(page);

  if (isFetching) {
    return <Spinner />;
  }
  const container = {
    hidden: { rotate: 90 },
    show: {
      rotate: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };
  return (
    <div className="pt-24 px-6">
      <div className="text-4xl mb-6">Tv Shows</div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 md:grid-cols-5 text-center gap-3 md:gap-6"
      >
        {shows?.results?.map((show) => (
          <Link key={show.id} to={`/showdetails/${show.id}`}>
            <motion.div variants={item} size={50} className="relative">
              <div className="absolute top-0 left-0 bg-gradient-to-t w-full h-full from-black"></div>
              <img
                className="rounded-lg"
                src={`https://image.tmdb.org/t/p/w500/${show?.poster_path}`}
                alt=""
              />
            </motion.div>
          </Link>
        ))}
      </motion.div>
      <div className="mt-10 mb-28 md:mb-20">
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={shows.results.total_pages}
        />
      </div>
    </div>
  );
};

export default TvShows;
