import { useState } from "react";
import { Link } from "react-router-dom";

type ErrorProps = {
  statusCode: number;
};

const ErrorScreen = (statusCode: ErrorProps) => {
  return (
    <div className="flex flex-col justify-center items-center mt-20 relative">
      <div className={`grid justify-center items-center`}>
        <h1
          className={`font-geistSans text-7xl text-slate-700/100`}
        >{`${statusCode.statusCode}`}</h1>
        <p className={`font-geistSans text-slate-700/100`}>
          There was an error!
        </p>
        <button
          type="button"
          className="font-geistSans bg-blue-300/30 hover:bg-blue-300/30 py-1 my-6 px-4 rounded-md max-w-[170px] mx-auto shadow-md font-[500] text-black lg:min-w-[300px] lg:text-lg"
        >
          <Link to="/">Go Back</Link>
        </button>
      </div>
    </div>
  );
};

export default ErrorScreen;
