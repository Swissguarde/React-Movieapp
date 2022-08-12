import React from "react";
import spinner from "../assets/spinner.gif";
const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <img className="w-[200px] md:w-[400px]" src={spinner} alt="Spinner gif" />
    </div>
  );
};

export default Spinner;
