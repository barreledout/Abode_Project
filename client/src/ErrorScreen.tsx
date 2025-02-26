import { forwardRef, useState } from "react";

import { Progress } from "./components/ui/progress";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";

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

            <div className="flex items-center gap-1">
              <Progress
                value={progressBar}
                aria-label="Progress bar of how many request have been sent to the API."
              />
              <Popover>
                <PopoverTrigger>
                  
                </PopoverTrigger>
                <PopoverContent about="What the progress bar is about" className="relative -left-4 top-0 ">
                  50 API request per month. Current: <b>{progressBar / 2}/50</b> request.
                </PopoverContent>
              </Popover>
            </div>

            <button
              type="button"
              className={`font-geistSans bg-blue-300/30 hover:bg-blue-300/30 py-1 my-6 px-4 rounded-md max-w-[170px] mx-auto shadow-md font-[500] text-black lg:text-lg`}
              onClick={handleRefresh}
            >
              
            </button>
          </div>
        </div>
      </section>
    );
  }
);

export default ErrorScreen;
