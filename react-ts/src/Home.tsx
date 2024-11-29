import React from "react";
import HeroImg from "./Hero";
import ServiceCards from "./ServiceCards";

const Home = () => {
  return (
    <section>
      <HeroImg />
      <div className="bg-gray-300/20">
        <ServiceCards />
      </div>
    </section>
  );
};

export default Home;
