import React from "react";
import { Link } from "react-router-dom";

const ServiceCards = () => {
  return (
    <section className="flex flex-col mt-10">
      {/* First Service Card */}
      <div className="flex gap-4 relative max-h-[130px] mx-1 bg-red-400">
        <div className="w-[200px]">
          <img
            src="/service_svgs/undraw_analysis_dq08.svg"
            alt="Home estimate image"
            className="w-full h-full"
          />
        </div>
        <div className="grid gap-2 text-xs ">
          <div>
            <h3>View the Price of Your Home</h3>
            <p>
              Get an estimate on your home based on comparable properties
              similar to yours.
            </p>
          </div>
          <Link to="/home_value_estimator">
            <span>Get Home Estimate</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
