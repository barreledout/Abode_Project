import { Link } from "react-router-dom";
import { House } from "lucide-react";

const Navbar = () => {
  return (
    <header className="w-min-[900px]">
      <div className="flex justify-between items-center p-4 gap-9 ">
        <div className="relative top-[-2px]">
          <Link to="/" className="flex items-center gap-2">
            <House stroke={"#0047AB"} className="size-5 sm:size-7" />
            <h1 className="text-[1.2em] sm:text-[1.9em] font-parkinsans relative top-[1.5px] left-[-6px]">
              Abode
            </h1>
          </Link>
        </div>
        
      </div>
    </header>
  );
};

export default Navbar;

{/* <nav className="flex justify-between items-center font-nunito text-[.8em] gap-4 gap-4 ">
          <Link to="/home_value_estimator">
            <h1 className="">Home Value Estimator</h1>
          </Link>
          <Link to="/market_analysis">
            <h1 className="">Market Analysis</h1>
          </Link>
          <Link to="/real_estate_investment_tool">
            <h1 className="">Real Estate Investment Tool</h1>
          </Link>
        </nav> */}