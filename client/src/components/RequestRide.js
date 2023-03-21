import React, { useState, useEffect } from "react";
import CarRide from "../contract/EnovateBank.json";

const { utils, ethers } = require("ethers");

function RequestRide() {
  const [dropoff, setDropoff] = useState("");
  const [pickup, setPickup] = useState("");
  const [amount, setAmount] = useState("");
  const [rideId, setRideId] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [requested, setRequested] = useState(false);

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

  async function handleSubmit(e) {
    e.preventDefault();
    if (!provider || !signer) {
      alert("Please connect to Ethereum network");
      return;
    }
    const contract = new ethers.Contract(CarRide.address, CarRide.abi, signer);
    try {
      contract.on("RequestDriverEvent", (rideId) => {
      setRideId(rideId.toString());
    });
      
      const weiAmount = utils.parseEther(amount).toString();
      const tx = await contract.requestRide(pickup, dropoff, weiAmount);
      await tx.wait();
      setRequested(true)
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
}


  return (
    <div>
      <form
        className=" font-sans  justify-center rounded-lg m-32 p-4 bg-red-300"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl items-center font-bold text-center">
          Request a Ride
        </h1>

        <div className="flex justify-between p-2 my-4">
          <div className="m-8 w-2/3">
            <label className="block font-bold text-lg mb-2">
              Pickup Location
            </label>
            <input
              type="text"
              required
              autocomplete="off"
              className="rounded-md p-2 w-full"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
            />
          </div>
          <div className="m-8 w-2/3">
            <label className="block font-bold text-lg mb-2">
              Dropoff Location
            </label>
            <input
              type="text"
              required
              autocomplete="off"
              className=" rounded-md p-2 w-full"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-between my-4">
          <div className="m-8 w-1/3">
            <label className="block font-bold text-lg mb-2">Amount In ETH</label>
            <input
              type="number"
              required
              autocomplete="off"
              className=" rounded-md p-2 w-full"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className=" p-6 m-4 rounded-md bg-orange-500 hover:bg-orange-700 text-white font-bold"
          >
            Send Request
          </button>
        </div>
        {rideId ? <h1>Your ride ID is: {rideId}</h1> : null}
        {requested ? (
           <div className="text-2xl text-green-900">
            <h3>Successfully Requested Ride! Ride ID: {rideId} </h3>
          </div>
        ) : null}
      </form>
    </div>
  );
}
export default RequestRide;
