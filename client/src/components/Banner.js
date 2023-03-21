import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="flex p-32 ml-20 mt-20 justify-center items-center flex-col">
      <h1 className="text-9xl font-extrabold tracking-tight p-2 text-center font-serif leading-none text-red-800 uppercase">
        Enovate
      </h1>
      <p className="font-bold font-serif text-2xl text-black text-center p-4 mb-4">
        <br />
        "Welcome to our smart contract! 
        <br />
        Safety, all the data are cryptographically protected. No fraudulent
        data.
        <br />
         With our smart contract, you can have peace of mind knowing that all parties will abide by the agreed-upon terms."
      </p>
      <div className="flex justify-center m-32">
        <Link
          to="/profile"
          className="px-8 py-4 ml-32 font-mono text-3xl items-center rounded-full inline text-white bg-green-800 text-main-500 hover:bg-green-300 transition-all duration-300"
        >
         GO TO BANKING SECTION
        </Link>
      </div>
    </div>
  );
};

export default Banner;
