"use client";
import { useState, useEffect, useMemo } from "react";
import { ApiResponse, Comparable } from "@/Pages/HomeEstimate/HomeTypes";

interface PaginationProps {
  resultsArr: ApiResponse;
  propertyType: String | null;
  totalComparable: number | null;
}

const Pagination = ({
  resultsArr,
  propertyType,
  totalComparable,
}: PaginationProps) => {

  // Total amount of results to show per page.
  const POSTPERPAGE = 6
  const [postPerPage, setPostPerPage] = useState<number>(POSTPERPAGE);

  // Checks if the return data size is less than the user's
  // inputted comparable amount
  const [equalAmountComps, setEqualAmountComps] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const paginationNumbers: number[] = [];
  
  // filters result to property type input
  const filteredResults = resultsArr.comparables.filter(
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

  // Total amount of pages
  for (
    let i: number = 1;
    i <= Math.ceil(filteredResults.length / postPerPage);
    i++
  ) {
    paginationNumbers.push(i);
  }

  // Paginated results array.
  const paginatedResults = useMemo(() => {
    return postPerPageFn(filteredResults, currentPage, postPerPage);
  }, [filteredResults, currentPage, postPerPage]);

  return (
    <>
      {/* Comparable Property Results */}
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
            <span className="font-[700]">{filteredResults.length}</span> out of{" "}
            <span className="font-[700]">{totalComparable}</span> {propertyType}{" "}
            properties to compare.
          </h2>
        </div>

        {/* Property Feature Results */}
        <div className="">
          <ul className="flex flex-col gap-2 mx-2 pt-2 mq400w:grid mq400w:grid-cols-2 md:grid md:grid-cols-3 md:px-3">
            {paginatedResults.map((comparable) => (
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

      {/* Pagination Button Bar  */}
      <div className="flex justify-center mt-4 gap-2 font-nunito">
        {paginationNumbers.map((pageNumber) => (
          <button 
            key={pageNumber} 
            onClick={() => setCurrentPage(pageNumber)}
            className={`${pageNumber === currentPage ? "bg-blue-300/30 font-[700] rounded-sm shadow" : "bg-none"} px-2 py-0.5`}
          
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </>
  );
};

export default Pagination;

// Paginates the array and slices the results to its respective page.
const postPerPageFn = (
  properties: Comparable[],
  currentPage: number,
  postPerPage: number
) => {
  const startIndex = (currentPage - 1) * postPerPage;
  const endIndex = startIndex + postPerPage;
  return properties.slice(startIndex, endIndex);
};
