"use client";
import { forwardRef, useEffect, useState } from "react";
import { ApiResponse } from "./HomeTypes";
import Pagination from "../../components/ui/pagination";

type ComparableProps = {
  data: ApiResponse;
  propertyType: string | null;
  totalComparable: number | null;
};

const Comparables = forwardRef<HTMLElement, ComparableProps>(
  ({ data, propertyType, totalComparable }, ref) => {
    
    return (
      <section id="comparables" ref={ref}>
        <div>
          <div className="text-center font-nunito my-16">
            <h1 className="text-3xl font-[700] md:text-3xl lg:text-4xl ">
              Home Estimate:
            </h1>
            <div>
              <h2 className="pt-2 text-3xl text-blue-600 font-[600] font-geistSans md:text-4xl">
                {data.price
                  ? `$${data.price.toLocaleString()}`
                  : "Price Not Available"}
              </h2>
            </div>
          </div>

          {/* API Results */}
          <Pagination resultsArr={data} propertyType={propertyType} totalComparable={totalComparable}/>
        </div>
        
      </section>
    );
  }
);

export default Comparables;
