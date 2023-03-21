import React from "react";
import Navbar from "./Navbar";
import CarImage from "../carImage.jpg";
import Footer from "./footer";

function About() {
  return (
    <div className="bg-white">
      <Navbar></Navbar>
      <div className="py-16">
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
            <div className="rounded-lg md:5/12 lg:w-5/12">
              <img
                src={CarImage}
                alt="image"
                loading="lazy"
                width=""
                height=""
              />
            </div>
            <div className="md:7/12 lg:w-6/12">
              <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                Welcome To Block<b className="text-red-900 ">Ride</b>
              </h2>
              <div className="p-4">
                <p className="text-2xl font-extrabold tracking-normal p-4 font-sans text-gray-900 my-8 ">
                  We have a team of transportation experts and blockchain
                  enthusiasts who came together to revolutionize the way people
                  move. Our service utilizes smart contracts on the blockchain
                  to provide a secure, transparent, and decentralized platform
                  for ride-sharing. By using cryptocurrency, we offer a seamless
                  and fast payment process without the need for intermediaries.
                </p>
                <p className="text-black text-2xl font-extrabold font-sans tracking-normal p-4 my-8">
                  We believe in the power of the blockchain to bring trust and
                  efficiency to the transportation industry. Our platform is
                  designed to empower drivers and riders with more control over
                  their ride-sharing experience.
                </p>
                <p className="text-yellow-500 font-sans bg-gray-900 border-red-600 rounded-lg text-2xl font-extrabold tracking-normal my-8 p-16">
                  Our mission is to provide a safe, reliable, and affordable
                  transportation option for everyone. We are constantly working
                  to improve our service and integrate new technologies to
                  enhance your experience.
                </p>
                <p className="text-white text-2xl font-sans tracking-normal my-32 p-4">
                  Thank you for choosing BlockRide. We look forward to serving
                  you and being a part of your journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default About;
