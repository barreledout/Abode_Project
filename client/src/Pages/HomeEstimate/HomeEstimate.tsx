"use client"
import HomeForm from "./HomeForm";

const HomeEstimate = () => {
  
  return (
    <section className="bg-gray-300/45 pt-10 pb-3">
      <div className="text-center">
        <h1 className={`font-nunito font-[700] pb-5 text-blue-600 text-2xl mq500w:text-[1.7rem] md:text-3xl lg:text-4xl`}>
          Home Value Estimator
        </h1>
      </div>
      <HomeForm />
      
    </section>
  );
};

export default HomeEstimate;
