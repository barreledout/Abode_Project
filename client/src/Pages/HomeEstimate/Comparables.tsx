"use client";
import { forwardRef, useEffect, useState } from "react";
import { ApiResponse } from "./HomeTypes";

type ComparableProps = {
  data: ApiResponse;
  propertyType: string | null;
  totalComparable: number | null;
};

const Comparables = forwardRef<HTMLElement, ComparableProps>(
  ({ data, propertyType, totalComparable }, ref) => {
    const [equalAmountComps, setEqualAmountComps] = useState<boolean>(true);

    // filters result to property type input
    const filteredResults = data.comparables.filter(
      (property) => property.propertyType === propertyType
    );

    // If filtered result length is less than comp count input, notify user
    useEffect(() => {
      if (filteredResults.length !== totalComparable) {
        setEqualAmountComps(false);
      } else {
        setEqualAmountComps(true);
      }
    }, [filteredResults.length, totalComparable]);

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
          <div className="max-w-[950px] mx-auto">
            <div className="text-center grid gap-1">
              <h1 className="text-2xl font-[700] pb-3 text-center font-nunito md:text-3xl lg:text-4xl">
                Comparable Properties
              </h1>
              <h2
                className={`${
                  !equalAmountComps ? "block" : "hidden"
                } font-nunito text-lg fpn pb-2`}
              >
                Only found{" "}
                <span className="font-[700]">{filteredResults.length}</span> out
                of <span className="font-[700]">{totalComparable}</span>{" "}
                {propertyType} properties to compare.
              </h2>
            </div>

            {/* Comparable Property Results */}
            <div className="">
              <ul className="flex flex-col gap-2 mx-2 pt-2 mq400w:grid mq400w:grid-cols-2 md:grid md:grid-cols-3 md:px-3">
                {filteredResults.map((comparable) => (
                  <li
                    key={comparable.id}
                    className="grid bg-blue-300/30 shadow p-2 rounded-sm font-nunito"
                  >
                    <span className="">
                      <span className="font-[600] font-geistSans lg:text-lg ">
                        Address:
                      </span>{" "}
                      {comparable.formattedAddress}
                    </span>
                    <span className="">
                      <span className="font-[600] font-geistSans lg:text-lg ">
                        Price:
                      </span>{" "}
                      {`$${comparable.price.toLocaleString()}`}
                    </span>
                    <span className="hidden md:block">
                      <span className="font-[600] font-geistSans lg:text-lg ">
                        Property Type:
                      </span>{" "}
                      {comparable.propertyType}
                    </span>
                    <span className="hidden md:block">
                      <span className="font-[600] font-geistSans lg:text-lg ">
                        Bedrooms:
                      </span>{" "}
                      {comparable.bedrooms}
                    </span>
                    <span className="hidden md:block">
                      <span className="font-[600] font-geistSans lg:text-lg ">
                        Bathrooms:
                      </span>{" "}
                      {comparable.bathrooms}
                    </span>
                    <span className="hidden md:block">
                      <span className="font-[600] font-geistSans lg:text-lg ">
                        Square Footage:
                      </span>{" "}
                      {comparable.squareFootage}
                    </span>
                    <span className="">
                      <span className="font-[600] font-geistSans lg:text-lg ">
                        Correlation:
                      </span>{" "}
                      {(comparable.correlation * 100).toFixed(2) + "%"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

export default Comparables;
