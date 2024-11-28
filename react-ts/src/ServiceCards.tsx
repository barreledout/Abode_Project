import React from "react";
import { Link } from "react-router-dom";

const ServiceCards = () => {
  const services = [
    {
      //Home estimate service
      serviceName: "Home_estimate",
      serviceIntro: "View the Price of Your Home",
      desc: "Get an estimate on your home based on comparable properties similiar to yours.",
      imgHref: "/service_svgs/HomeEstimate.svg",
      linkHref: "/home_value_estimator",
      buttonText: "Get Home Estimate",
    },
    {
      // Market Analysis service
      serviceName: "Market_analysis",
      serviceIntro: "Get Insight on Market Trends",
      desc: "See current and historical home values and data in your location.",
      imgHref: "/service_svgs/InvestmentAnalysis.svg",
      linkHref: "/market_analysis",
      buttonText: "Get Market Analysis",
    },
    {
      // Investment Analysis service
      serviceName: "Investment_analyis",
      serviceIntro: "Real Estate Investment Analysis",
      desc: "Input data of properties to see the possible investment metrics.",
      imgHref: "/service_svgs/MarketAnalysis.svg",
      linkHref: "/real_estate_investment_tool",
      buttonText: "Get Investment Analysis",
    },
  ];

  return (
    <section className="flex flex-col mt-10 gap-4">
      {/* First Service Card */}
      {services.map((item, index) => (
        <div
          className="flex gap-2 relative max-h-[130px] items-center mx-2 rounded-md shadow"
          key={index}
        >
          <div className=" min-w-[90px] max-w-[120px] min-h-[90px] p-2">
            <img
              src={item.imgHref}
              alt="Home estimate image"
              className="relative top-3 w-full h-full"
            />
          </div>
          <div className="grid gap-2 text-xs py-2">
            <div className="grid gap-1">
              <h3 className="font-[700] font-nunito ">{item.serviceIntro}</h3>
              <p className="">{item.desc}</p>
            </div>
            <Link
              to={item.linkHref}
              className="bg-blue-300/30 max-w-[150px] text-center p-0.5 rounded-sm"
            >
              <span className="font-[700] font-nunito">{item.buttonText}</span>
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ServiceCards;
