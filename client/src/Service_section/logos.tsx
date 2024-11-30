import { cn } from "../lib/utils";

interface LogoProps {
  className?: string;
}

export const HomeEstimateLogo = ({ className }: LogoProps) => {
  return (
    <div>
      <img
        src="../../../service_svgs/HomeEstimate.svg"
        alt="Home estimate serivce card logo"
        className={cn(`relative top-3 w-full h-full z-20`)}
      />
      <img
        src="../../../service_svgs/blob3.svg"
        alt=""
        className={cn(`absolute z-10 top-[-3px] right-3`, className)}
      />
    </div>
  );
};
export const MarketAnalysisLogo = ({ className }: LogoProps) => {
  return (
    <div>
      <img
        src="../../../service_svgs/MarketAnalysis.svg"
        alt="Market analysis service card logo"
        className={cn(`relative top-3 w-full h-full z-20`)}
      />
      <img
        src="../../../service_svgs/blob2.svg"
        alt=""
        className={cn(`absolute z-10 top-[-12px]`, className)}
      />
    </div>
  );
};
export const InvestmentLogo = ({ className }: LogoProps) => {
  return (
    <div>
      <img
        src="../../../service_svgs/InvestmentAnalysis.svg"
        alt="Investment analysis service card logo"
        className={cn(`relative top-3 w-full h-full z-20`)}
      />
      <img
        src="../../../service_svgs/blob1.svg"
        alt=""
        className={cn(`absolute z-10 top-[-12px]`, className)}
      />
    </div>
  );
};
