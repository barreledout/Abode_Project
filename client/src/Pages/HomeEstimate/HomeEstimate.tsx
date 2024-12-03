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
    <section className="bg-gray-300/45 py-3">
      <div className=" text-center">
        <h1 className="font-nunito font-[700] text-blue-600 text-xl md:text-2xl lg:text-3xl">
          Home Value Estimator
        </h1>
      </div>
      <HomeForm onEstimateSubmit={handleFormSubmit}/>
      
    </section>
  );
};

export default HomeEstimate;
