import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetSearchQuery } from "../services/TMDB";
import { searchMovie } from "../features/searchMovieOrShow";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { searchQuery } = useSelector((state) => state.searchMovieOrShow);
  const { data, isFetching } = useGetSearchQuery({ searchQuery, page });

  const handleSubmit = (event) => {
    if (event.key === "Enter") {
      dispatch(searchMovie(query));
    }
    if (data?.total_results === 0) {
      return (
        <div className="px-6 py-24 text-center">
          `No results for ${query}.`
          <div>
            <button
              className="border-2 border-white px-4 py-3"
              v
              onClick={() => navigate(-1)}
            >
              Go back
            </button>
          </div>
        </div>
      );
    }
  };

  if (isFetching) {
    return <Spinner />;
  }

  console.log(data);

  return (
    <>
      <div className="px-6 py-24 flex items-center justify-center">
        <div>
          <label className="input-group">
            <input
              type="text"
              onKeyPress={handleSubmit}
              placeholder="Search here.."
              className="input input-bordered"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-5 text-center px-6 gap-3 md:gap-6">
        {data?.results?.slice(0, 12)?.map((show, i) => (
          <Link
            key={i}
            to={
              show?.media_type === "tv"
                ? `/showdetails/${show.id}`
                : `/details/${show.id}`
            }
          >
            <div className="relative">
              <div className="absolute top-0 left-0 bg-gradient-to-t w-full h-full from-black"></div>

              {show.poster_path ? (
                <img
                  alt={show.title}
                  src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
                />
              ) : (
                <img
                  src="https://www.fillmurray.com/1000/1500"
                  alt={show.title}
                />
              )}
            </div>
          </Link>
        ))}
      </div>
      <div className="my-20">
        {data?.results?.length >= 1 && (
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={data?.total_pages}
          />
        )}
      </div>
    </>
  );
};

export default Search;
