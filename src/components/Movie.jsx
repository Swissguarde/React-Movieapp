import React from "react";
import { Link } from "react-router-dom";

const Movie = ({ item, showID }) => {
  return (
    <Link
      to={showID ? `/showdetails/${item.id}` : `/details/${item.id}`}
      className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 mb-8"
    >
      {item.poster_path ? (
        <img
          alt={item.title}
          src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
        />
      ) : (
        <img src="https://www.fillmurray.com/1000/1500" alt={item.title} />
      )}
      <div
        className=" 
      absolute top-0 left-0 h-full w-full hover:bg-black/80 opacity-0 hover:opacity-100 hover:transition duration-200 delay-50 text-white"
      >
        <p className="relative white-space-normal  text-xs md:text-sm font-bold flex justify-center h-full items-center">
          <button className="bg-red-500 text-sm px-4 py-1 md:px-8 md:py-2 md:text-2xl rounded-2xl">
            Play
          </button>
        </p>
      </div>
      <div className="text-[11px] md:text-[15px] font-bold md:text-lg text-center py-4">
        {item?.title}
      </div>
    </Link>
  );
};

export default Movie;
