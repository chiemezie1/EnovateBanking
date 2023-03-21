import React, { useState, useEffect } from "react";
import CarRide from "../contract/CarRide.json";

const { ethers } = require("ethers");

function RequestTile() {
  const [rides, setRides] = useState([]);
  const [accepted, setAccepted] = useState(false);
  const [signer, setSigner] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    async function loadProvider() {
      // load provider (example: using metamask)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setProvider(provider);
      setSigner(signer);
    }
    if (window.ethereum) {
      loadProvider();
    } else {
      console.error(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }, []);

  useEffect(() => {
    async function getAllRides() {
      const contract = new ethers.Contract(
        CarRide.address,
        CarRide.abi,
        signer
      );
      setContract(contract);
      try {
        const allRides = await contract.getAllRides();
        setRides(allRides);
      } catch (error) {
        console.error(error);
        alert("Error: " + error.message);
      }
    }
    if (signer) {
      getAllRides();
    }
  }, [provider, signer]);

  const acceptRide = async (rideId) => {
    try {
      await contract.acceptRide(rideId);
      setAccepted(true);
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
  };

  return (
    <div>
      {accepted ? (
        <div className="text-2xl text-green-900">
          <h3>Successfully Accepted ! </h3>
        </div>
      ) : null}

      {rides.map((ride) => {
        if (ride.amount.toString() <= 0 || ride.complete) {
          return null;
        }
        return (
          <div className="border-2 p-4 m-6 font-sans items-center rounded-lg w-full shadow-1xl border-black ">
            <div className="text-white md:text-2xl tracking-normal w-full flex p-2 bg-gradient-to-t from-[#070500] to-transparent rounded-lg ">
              <button
                class="m-2 rounded-sm border-1 px-2 py-2 text-lg bg-orange-600 hover:bg-green-500"
                onClick={() => acceptRide(ride.id.toString())}
              >
                Accept Ride
              </button>
              <div className="text-yellow-500 m-2 ">
                Address {ride.riderAddr} is going {ride.dropoff} from{" "}
                {ride.pickup} at{" "}
                {ethers.utils.formatUnits(ride.amount.toString(), "ether")} ETH
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RequestTile;
