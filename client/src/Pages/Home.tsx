import React from "react";
import HeroImg from "../Hero";
import ServiceCards from "../Service_section/ServiceCards";

const Home = () => {
  return (
    <section>
      <HeroImg />
      <div className="bg-gray-300/45 ">
        <ServiceCards />
      </div>
    </section>
  );
};

export default Home;
