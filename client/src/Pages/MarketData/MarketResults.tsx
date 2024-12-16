"use client";
import { forwardRef } from "react";
import { Market } from "./MarketType";

type MarketProps = {
  data: Market;
};

const MarketResults = forwardRef<HTMLElement, MarketProps>(({ data }, ref) => {
  return <section ref={ref}>
    
  </section>;
});

export default MarketResults;
