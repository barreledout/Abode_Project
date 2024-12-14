import { forwardRef, useState } from "react";
import { IoReload } from "react-icons/io5";
import { Progress } from "./components/ui/progress";

type ErrorProps = {
  statusCode: number;
  errorMessage: string | null;
  progressBar: number;
};

const ErrorScreen = forwardRef<HTMLElement, ErrorProps>(
  ({ statusCode, errorMessage, progressBar }, ref) => {
    const handleRefresh = () => {
      window.location.reload();
    };

    return (
      <section ref={ref}>
        <div className="flex flex-col justify-center items-center mt-20 relative">
          <div
            className={`grid justify-center items-center text-center mx-2 gap-5 text-pretty`}
          >
            <h1
              className={`font-geistSans text-7xl text-slate-700/100`}
            >{`${statusCode}`}</h1>
            <p className={`font-geistSans text-slate-700/100`}>
              {`${errorMessage}`}
            </p>

            <Progress
              value={progressBar}
              aria-label="Progress bar of how many request have been sent to the API."
            />

            <button
              type="button"
              className={`font-geistSans bg-blue-300/30 hover:bg-blue-300/30 py-1 my-6 px-4 rounded-md max-w-[170px] mx-auto shadow-md font-[500] text-black lg:text-lg`}
              onClick={handleRefresh}
            >
              <IoReload className={``} />
            </button>
          </div>
        </div>
      </section>
    );
  }
);

export default ErrorScreen;
