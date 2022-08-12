import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
const SavedShows = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft -= 300;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft += 300;
  };
  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);
  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteShow = async (passedID) => {
    try {
      const result = movies.filter((item) => item.id !== passedID);
      await updateDoc(movieRef, {
        savedShows: result,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="relative flex items-center group">
        <FaChevronLeft
          onClick={slideLeft}
          size={40}
          className="bg-white top-[30%]  left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block text-black p-2"
        />
        <div
          id={"slider"}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies?.map((item) => (
            <Link
              to="/"
              // to={showID ? `/showdetails/${item.id}` : `/details/${item.id}`}
              className="w-[160px] h-full sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 mb-8"
            >
              <img
                className="w-full h-auto block"
                alt={item.title}
                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
              />

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
              <p
                onClick={() => deleteShow(item.id)}
                className="absolute top-4 right-4 text-red-500 text-2xl"
              >
                <AiOutlineClose />
              </p>
            </Link>
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

export default SavedShows;
