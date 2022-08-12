import React from "react";

const Pagination = ({ page, setPage, totalPages }) => {
  const currentPage = page;
  const handlePrev = () => {
    if (currentPage !== 1) {
      setPage((prev) => prev - 1);
    }
  };
  const handleNext = () => {
    if (currentPage !== totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  if (totalPages === 0) return null;

  return (
    <div className="flex gap-3 justify-center items-center mt-5 mb-14">
      <button
        onClick={handlePrev}
        className="border-2 border-white rounded-md   px-5 py-2"
      >
        Prev
      </button>
      <div className="text-orange-400">{currentPage}</div>
      <button
        onClick={handleNext}
        className="border-2 border-white rounded-md   px-5 py-2"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
