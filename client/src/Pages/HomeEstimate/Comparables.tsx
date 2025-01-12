"use client";
import { forwardRef } from "react";
import { ApiResponse } from "./HomeTypes";
import { Skeleton } from "@nextui-org/skeleton";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

type ComparableProps = {
  data: ApiResponse;

};

const Comparables = forwardRef<HTMLElement, ComparableProps>(
  ({ data }, ref) => {
    let comparable = data.comparables;

    let dataSize = comparable.slice(0, comparable.length);

    return (
      <section id="comparables" ref={ref}>
        <div>
          <div className="text-center font-nunito my-16">
            <h1 className="text-2xl font-[700] md:text-3xl lg:text-4xl ">
              Home Estimate:
            </h1>
            <div>
              <h2 className="pt-2 text-2xl text-blue-600 font-[600] font-geistSans md:text-4xl">
                {data.price
                  ? `${data.price.toLocaleString()}`
                  : "Price Not Available"}
              </h2>
            </div>
          </div>

          

          <div>
            <h1 className="text-2xl font-[700] pb-3 text-center font-nunito md:text-3xl lg:text-4xl">
              Comparable Properties
            </h1>
            <div className="">
              <ul className="flex flex-col gap-2 mx-2 pt-2 mq400w:grid mq400w:grid-cols-2 md:grid md:grid-cols-3 md:px-3">
                {data.comparables.map((comparable) => (
                  <li
                    key={comparable.id}
                    className="grid bg-slate-300 p-2 rounded-sm font-nunito"
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
                      {`${comparable.price.toLocaleString()}`}
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

export default Comparables