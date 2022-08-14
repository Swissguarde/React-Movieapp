import React, { useState } from "react";
import { useGetPopularQuery } from "../services/TMDB";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import { motion } from "framer-motion";

const Movies = () => {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useGetPopularQuery(page);

  if (isFetching) {
    return <Spinner />;
  }

  // const container = {
  //   hidden: { opacity: 0 },
  //   show: {
  //     opacity: 1,
  //     transition: {
  //       delayChildren: 0.8,
  //       staggerDirection: -1,
  //     },
  //   },
  // };
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
      <div className="text-4xl mb-6">Movies</div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 md:grid-cols-5 text-center gap-3 md:gap-6"
      >
        {data?.results &&
          data?.results?.map((show) => (
            <Link key={show.id} to={`/details/${show.id}`}>
              <motion.div variants={item} size={50} className="relative">
                <div className="absolute top-0 left-0 bg-gradient-to-t w-full h-full from-black"></div>
                <img
                  className="rounded-lg"
                  src={`https://image.tmdb.org/t/p/w500/${show?.poster_path}`}
                  alt=""
                />
                {/* <h2 className="py-6 text-xl">{show.title}</h2> */}
              </motion.div>
            </Link>
          ))}
      </motion.div>
      <div className="mt-10 mb-28 md:mb-20">
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={data?.total_pages}
        />
      </div>
    </div>
  );
};

export default Movies;
