"use client"
import { useState } from "react";
import HomeForm from "./HomeForm";
import Comparables from "./Comparables";

const HomeEstimate = () => {
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
  }

  return (
    <section className="bg-gray-300/45 pt-10 pb-3">
      <div className="text-center">
        <h1 className={`font-nunito font-[700] pb-5 text-blue-600 text-2xl mq500w:text-[1.7rem] md:text-3xl lg:text-4xl`}>
          Home Value Estimator
        </h1>
      </div>
      <HomeForm onEstimateSubmit={handleFormSubmit}/>
      
    </section>
  );
};

export default HomeEstimate;
