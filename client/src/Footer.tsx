import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-3">
      <div className="grid justify-center text-center">
        <span className="font-nunito font-[600] text-xs lg:text-base text-gray-800/75">
          &copy; 2024 - Present Abode
        </span>
        <span className="font-nunito font-[600] text-xs lg:text-base text-gray-800/75">
          All Rights Reserved
        </span>
        <div className="flex text-center bg-gray-300/45 rounded-md justify-center gap-2 mt-5 text-blue-500 underline text-sm lg:text-base">
          <div className="p-2 flex gap-3">
            <Link to="/faq">
              <span>FAQ</span>
            </Link>
            <a href="mailto:rcalisaan7@gmail.com?subject=Hello!&body=Enter Message">
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
