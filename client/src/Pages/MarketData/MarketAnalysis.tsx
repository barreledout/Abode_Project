import React from "react";
import MarketForm from "./MarketForm";

const MarketAnalysis = () => {
  return (
    <section className="bg-gray-300/45 pt-10 pb-3">
      <div className="text-center">
        <h1
          className={`font-nunito font-[700] pb-5 text-blue-600 text-2xl mq500w:text-[1.7rem] md:text-3xl lg:text-4xl`}
        >
          Market Analysis
        </h1>
        <MarketForm />
      </div>
    </section>
  );
};

export default MarketAnalysis;
