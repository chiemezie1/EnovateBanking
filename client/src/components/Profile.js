import React, { useState, useEffect } from "react";
import CarRide from "../contract/CarRide.json";
import Navbar from "./Navbar";
import Footer from "./footer";
import RequestRide from "./RequestRide";
import CancelRide from "./CancelRide";
import PayDriver from "./PayDriver";
import RequestTile from "./RequestTile";
import UpdateDriverRating from "./UpdateDriverRating";

const { ethers } = require("ethers");

function Profile() {
  const [userType, setUserType] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    contact: "",
    email: "",
    carNumber: "",
    seats: "",
    rating: "",
    status: "",
  });
  const [address, setAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    async function loadProvider() {
      if (window.ethereum) {
        // load provider (example: using metamask)
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setProvider(provider);
        setSigner(signer);
        const addr = await signer.getAddress();
        setAddress(addr.toString());
      } else {
        console.error(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    }
    loadProvider();
  }, []);

  const handleUserType = (e) => {
    setUserType(e.target.value);
  };

  useEffect(() => {
    async function getUserInfo() {
      if (!provider || !signer) {
        alert("Please connect to Ethereum network");
        return;
      }
      const contract = new ethers.Contract(
        CarRide.address,
        CarRide.abi,
        signer
      );
      try {
        if (userType === "rider") {
          const rider = await contract.getRiderInfo(address);
          setUserInfo({
            name: rider[0],
            contact: rider[1],
            email: rider[2],
          });
        } else if (userType === "driver") {
          const driver = await contract.getDriverInfo(address);
          setUserInfo({
            name: driver[0],
            contact: driver[1],
            email: driver[2],
            carNumber: driver[3],
            seats: driver[4].toString(),
            rating: driver[5].toString(),
            status: driver[6],
          });
        }
      } catch (error) {
        console.error(error);
        alert("Error: " + error.message);
      }
    }
    if (userType !== "" && address) {
      getUserInfo();
    }
  }, [userType, provider, signer, address]);

  return (
    <div>
      <div className="bg-gray-300 min-h-screen">
        <Navbar></Navbar>
        <div className="antialiased max-w-8xl mx-auto my-12 bg-gray-300 px-8">
          {userType === "" ? (
            <div>
              <h2 className="font-bold text-4xl text-center p-8">
                Please Select User
              </h2>
              <div className="flex text-center justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-3xl text-white font-bold m-4 py-4 px-8 rounded-lg mr-10"
                  value="rider"
                  onClick={handleUserType}
                >
                  Rider
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-3xl text-white font-bold m-4 py-4 px-8 rounded-lg"
                  value="driver"
                  onClick={handleUserType}
                >
                  Driver
                </button>
              </div>
            </div>
          ) : (
            <div className="flex p-4">
              <div className="w-full h-auto md:w-1/2 bg-blue-300 rounded-lg shadow-lg">
                <div className="text-4xl font-extrabold  text-gray-900 p-8 text-center border-b border-gray-200 tracking-wide">
                  Welcome Back {userInfo.name}!
                  <span className="block text-lg text-gray-600 mt-2">
                    You are registered as{" "}
                    {userType === "driver" ? <p>Driver</p> : <p>Rider</p>}
                  </span>
                </div>
                <div className="block sm:flex md:block lg:flex items-center justify-center">
                  <div className="mt-8 sm:m-8 md:m-0 md:mt-8 lg:m-8 text-center">
                    <div className="inline-flex items-center">
                      <span className="text-3xl font-medium">Contact:</span>
                      <span className="text-3xl ml-2">{userInfo.contact}</span>
                    </div>
                  </div>
                  <div className="mt-4 mb-8 sm:m-8 md:m-0 md:mt-4 md:mb-8 lg:m-8 text-center">
                    <div className="inline-flex items-center">
                      <span className="text-3xl font-medium">Email:</span>
                      <span className="text-xl ml-2">{userInfo.email}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-3">
                  <ul>
                    <li className="flex items-center">
                      <div className="bg-green-200 rounded-full p-2 fill-current text-green-700">
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          className=""
                        ></svg>
                      </div>
                      <span className="text-gray-700 text-lg ml-3">
                        No hidden fees
                      </span>
                    </li>
                    <li className="flex items-center mt-3">
                      <div className="bg-green-200 rounded-full p-2 fill-current text-green-700">
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          className=""
                        ></svg>
                      </div>
                      <span className="text-gray-700 text-lg ml-3">
                        Pay only for what you use
                      </span>
                    </li>
                    <li className="flex items-center mt-3">
                      <div className="bg-green-200 rounded-full p-2 fill-current text-green-700">
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          className=""
                        ></svg>
                      </div>
                      <span className="text-gray-700 text-lg ml-3">
                        Real-time fee reporting
                      </span>
                    </li>
                  </ul>
                </div>
                <span className="block text-lg text-gray-600 mt-2 p-16">
                  BlockRide car Ride service
                </span>
                {userType === "driver" ? (<UpdateDriverRating></UpdateDriverRating>) : (null
              )}
              </div>

              {userType === "rider" ? (
                <div className="md:w-1/2 px-8 md:px-0 md:py-8">
                  <RequestRide></RequestRide>
                  <div className="flex m-16 p-16 rounded-lg bg-blue-400">
                    <CancelRide></CancelRide>
                    <PayDriver></PayDriver>
                    <UpdateDriverRating></UpdateDriverRating>
                  </div>
                </div>
              ) : (
                <RequestTile></RequestTile>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
export default Profile;
