import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="flex p-32 ml-20 mt-20 justify-center items-center flex-col">
      <h1 className="text-9xl font-extrabold tracking-tight p-2 text-center font-serif leading-none text-white uppercase">
        Block
        <span className="text-red-800">Ride</span>
      </h1>
      <p className="font-bold font-serif text-2xl text-black text-center p-4 mb-4">
        <i>Less Cost..... More Trust</i>
        <br />
        Transparency of transactions, possible to trace back to the information
        if something goes wrong.
        <br />
        Safety, all the data are cryptographically protected. No fraudulent
        data.
        <br />
        Directly payment to the drivers using smart contracts.
      </p>
      <div className="flex justify-center m-32">
        <Link
          to="/profile"
          className="px-8 py-4 ml-32 font-mono text-3xl items-center rounded-full inline text-white bg-green-800 text-main-500 hover:bg-green-300 transition-all duration-300"
        >
          Take Ride
        </Link>

        <Link
          to="/register"
          className="px-8 py-4 ml-32 font-mono text-3xl items-center rounded-full text-red-800 bg-white text-main-500 hover:bg-gray-300 transition-all duration-300"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Banner;
