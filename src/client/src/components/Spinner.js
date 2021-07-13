import React from "react";

const Spinner = () => {
  return (
    <div className="mt-5 spinner-head">
      <div className="spinner-grow text-info spinner" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
export default Spinner;
