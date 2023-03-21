import React from "react";
import fullLogo from "../full_logo.png";

const Footer = () => {
  return (
    <div className="bg-gray-800 h-48 text-white font-bold flex justify-between items-center">
      <footer className="font-sans mx-auto py-4  flex  ">
        <a href="/" className="logo">
          <img src={fullLogo} alt="" width={120} height={120} className="" />
          {+new Date().getFullYear()}
        </a>
        <div className="flex">
          <nav className="mx-64 px-64">
            <ul className="">
              <li className="">
                <div className="">
                  Home Page
                </div>
              </li>
              <li className="">
                <div className="">
                  Request
                </div>
              </li>
              <li className="">
                <div className="">
                  Aoubt us
                </div>
              </li>
            </ul>
          </nav>
          <nav className="">
            <ul className=" ">
              <li className="">
                <div className="">
                  Drivers
                </div>
              </li>
              <li className="">
                <div className="">
                  Riders
                </div>
              </li>
              <li className="">
                <a  className="">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
      <div className="font-sans mx-auto py-4 text-center">
        Copyright © Block-Ride <br />
        ....by CHIEMEZIE AGBO
      </div>
    </div>
  );
};

export default Footer;
