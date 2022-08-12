import React, { useState } from "react";
import { useGetPopularQuery } from "../services/TMDB";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";

const Movies = () => {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useGetPopularQuery(page);

  if (isFetching) {
    return <Spinner />;
  }
  return (
    <div className="pt-24 px-6">
      <div className="text-4xl mb-6">Movies</div>
      <div className="grid grid-cols-3 md:grid-cols-5 text-center gap-3 md:gap-6">
        {data?.results?.map((show) => (
          <Link key={show.id} to={`/details/${show.id}`}>
            <div className="relative">
              <div className="absolute top-0 left-0 bg-gradient-to-t w-full h-full from-black"></div>
              <img
                className="rounded-lg"
                src={`https://image.tmdb.org/t/p/w500/${show?.poster_path}`}
                alt=""
              />
              {/* <h2 className="py-6 text-xl">{show.title}</h2> */}
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-10 mb-28 md:mb-20">
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={data.total_pages}
        />
      </div>
    </div>
  );
};

export default Movies;
