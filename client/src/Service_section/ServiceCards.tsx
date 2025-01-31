import React from "react";
import { Link } from "react-router-dom";
import { HomeEstimateLogo, MarketAnalysisLogo, InvestmentLogo } from "./logos";

interface Service {
  serviceName: string;
  serviceIntro: string;
  desc: string;
  serviceLogo: JSX.Element; // Ensures type safety for React elements
  linkHref: string;
  buttonText: string;
}

const ServiceCards = () => {
  const services: Service[] = [
    {
      //Home estimate service
      serviceName: "Home_estimate",
      serviceIntro: "View the Price of Your Home",
      desc: "Get an estimate on your home based on comparable properties similiar to yours.",
      serviceLogo: <HomeEstimateLogo />,
      linkHref: "/home_value_estimator",
      buttonText: "Get Home Estimate",
    },
    {
      // Market Analysis service
      serviceName: "Market_analysis",
      serviceIntro: "Get Insight on Market Trends",
      desc: "See current and historical home values and data in your location.",
      serviceLogo: <InvestmentLogo />,
      linkHref: "/market_analysis",
      buttonText: "Get Market Analysis",
    },
    {
      // Investment Analysis service
      serviceName: "Investment_analyis",
      serviceIntro: "RE Investment Analysis",
      desc: "Input data of properties to see the possible investment metrics.",
      serviceLogo: <MarketAnalysisLogo />,
      linkHref: "/real_estate_investment_tool",
      buttonText: "Get Investment Analysis",
    },
  ];

  return (
    <section className="grid gap-4 py-3 md:py-5 lg:grid-cols-3 lg:max-w-[900px] lg:mx-auto">
      {/* First Service Card */}
      {services.map((item, index) => (
        <article
          className="flex gap-2 bg-white relative max-h-[130px] items-center mx-2 rounded-md shadow-all_dark md:mx-5 md:min-h-[200px] md:gap-6 md:rounded-lg lg:flex-col lg:min-h-[400px] lg: lg:text-center lg:mx-1"
          key={index}
        >
          {/* Service logo */}
          <div className="relative min-w-[90px] max-w-[100px] min-h-[90px] p-2 sm:max-w-[110px] md:min-w-[190px] md:ml-3 lg:min-h-[150px]">
            {item.serviceLogo}
            <span className="sr-only">Service logos</span>
          </div>
          <div className="grid gap-2 text-xs py-2 basis-[170px] flex-grow ">
            <div className="grid gap-1 md:gap-0">
              <h1 className="font-[700] font-nunito sm:text-sm md:text-xl">
                {item.serviceIntro}
              </h1>
              <p className="font-nunito sm:text-sm md:text-lg lg:text-balance lg:h-[90px] ">
                {item.desc}
              </p>
            </div>
            <Link
              to={item.linkHref}
              className="bg-blue-300/30 hover:scale-105 hover:shadow-md transition-all max-w-[150px] flex items-center text-center p-0.5 rounded-sm md:min-w-[200px] md:min-h-[30px] lg:relative lg:left-1/2 lg:-translate-x-24 lg:max-h-[50px]"
            >
              <span className="font-[600] text-[.9em] font-nunito w-full sm:text-xs md:text-base ">
                {item.buttonText}
              </span>
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
};

export default ServiceCards;
