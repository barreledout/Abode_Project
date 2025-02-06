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
        {/* API Results */}
        <Pagination
          resultsArr={data}
          propertyType={propertyType}
          totalComparable={totalComparable}
        />      
      </section>
    );
  }
);

export default Comparables;
