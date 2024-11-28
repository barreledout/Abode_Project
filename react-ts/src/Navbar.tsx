import { Link } from "react-router-dom";
import { House, AlignJustify } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";

const Navbar = () => {
  return (
    <header className="min-w-[200px] min-h-[20px]">
      <div className="flex justify-between items-center p-3 gap-9 mx-2 mq400w:mx-3 ">
        <div className="">
          <Link to="/" className="flex items-center gap-2">
            <House
              stroke={"#0047AB"}
              className="size-5 sm:size-7 relative top-[-2px] mq500w:top-[-2px]"
            />
            <h1 className="text-[1.2em] sm:text-[1.5em] md:text-[1.7em] 2xl:text-[2em] font-nunito font-[700] relative left-[-6px]">
              Abode
            </h1>
          </Link>
        </div>

        {/* Navbar */}
        <div>
          {/* Hamburger Menu for width less than 640px. */}
          <div className="sm:hidden relative top-1">
            <DropdownMenu>
              <DropdownMenuTrigger aria-label="Navigation Button">
                <AlignJustify />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-w-[200px]">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/home_value_estimator">
                    <span className="">Home Value Estimator</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/market_analysis">
                    <span className="">Market Analysis</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/real_estate_investment_tool">
                    <span className="">Real Estate Investment Tool</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Regular navbar for min width 640px. */}
          <div className="hidden sm:block">
            <nav className="flex justify-between items-center font-nunito text-sm gap-4 lg:text-base xl:text-lg truncate">
              <Link to="/home_value_estimator">
                <span className="">Home Value Estimator</span>
              </Link>
              <Link to="/market_analysis">
                <span className="">Market Analysis</span>
              </Link>
              <Link to="/real_estate_investment_tool">
                <span className="">Real Estate Investment Tool</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

{
  /* <nav className="flex justify-between items-center font-nunito text-[.8em] gap-4 gap-4 ">
          <Link to="/home_value_estimator">
            <h1 className="">Home Value Estimator</h1>
          </Link>
          <Link to="/market_analysis">
            <h1 className="">Market Analysis</h1>
          </Link>
          <Link to="/real_estate_investment_tool">
            <h1 className="">Real Estate Investment Tool</h1>
          </Link>
        </nav> */
}
