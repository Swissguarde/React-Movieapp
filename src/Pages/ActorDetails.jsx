import React from "react";
import { useGetActorQuery, useGetMoviesByActorIdQuery } from "../services/TMDB";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import MovieRow from "../components/MovieRow";
const ActorDetails = () => {
  const page = 1;
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isFetching } = useGetActorQuery(id);
  const { data: movies } = useGetMoviesByActorIdQuery({ id, page });

  if (isFetching) {
    return <Spinner />;
  }
  return (
    <div className="px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2  gap-5 container mx-auto">
        <img
          className=" object-cover rounded-md max-w-[90%] h-[80%]"
          src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
          alt=""
        />
        <div>
          <div className="text-6xl mb-10">{data?.name}</div>
          <div className="text-2xl mb-4">
            Born: {new Date(data?.birthday).toDateString()}
          </div>
          {data?.biography || "Sorry, no biography yet..."}

          <div className="my-8 flex flex-1 gap-3">
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
              className="border-2 border-white px-4 py-3"
            >
              IMDB
            </a>
            <button
              className="border-2 border-white px-4 py-3"
              v
              onClick={() => navigate(-1)}
            >
              Go back
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="text-2xl">
          Other movies by <span className="text-green-500">{data?.name}</span>{" "}
        </div>
        <MovieRow movies={movies} isFetching={isFetching} />
      </div>
    </div>
  );
};

export default ActorDetails;
