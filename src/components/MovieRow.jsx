import React from "react";
import { nanoid } from "nanoid";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Spinner from "../components/Spinner";

import Movie from "./Movie";
const MovieRow = ({ movies, isFetching, title, showID }) => {
  const rowID = nanoid();
  const slideLeft = () => {
    var slider = document.getElementById("slider" + rowID);
    slider.scrollLeft -= 300;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider" + rowID);
    slider.scrollLeft += 300;
  };

  if (isFetching) {
    return <Spinner />;
  }
  return (
    <div>
      {title && (
        <h2 className="text-white text-xl font-bold md:text-2xl p-4">
          {title} on <span className="text-red-500">MovieFlix</span>
        </h2>
      )}
      <div className="relative flex items-center group">
        <FaChevronLeft
          onClick={slideLeft}
          size={40}
          className="bg-white top-[30%]  left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block text-black p-2"
        />
        <div
          id={"slider" + rowID}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies?.results?.map((item) => (
            <Movie item={item} key={item.id} showID={showID} />
          ))}
        </div>
        <FaChevronRight
          onClick={slideRight}
          size={40}
          className="bg-white right-0 top-[30%] rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block text-black p-2"
        />
      </div>
    </div>
  );
};

export default MovieRow;
