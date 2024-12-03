import React from "react";

interface ResultProps {
  data: any;
}

const Comparables = ({ data }: ResultProps) => {
  return (
    <div>
      <h1>Home Estimate</h1>
      <div>{data}</div>
    </div>
  );
};

export default Comparables;
