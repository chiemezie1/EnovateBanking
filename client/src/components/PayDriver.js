import React, { useState, useEffect } from "react";
import CarRide from "../contract/EnovateBank.json";

const { ethers } = require("ethers");

function PayDriver() {
  const [rideId, setRideId] = useState("");
  const [amount, setAmount] = useState("");
  const [signer, setSigner] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [success, setSuccess] = useState(false);

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
    async function initContract() {
      const contract = new ethers.Contract(
        CarRide.address,
        CarRide.abi,
        signer
      );
      setContract(contract);
    }
    if (provider && signer) {
      initContract();
    }
  }, [provider, signer]);

  const handleRideIdChange = (e) => {
    setRideId(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePayDriver = async () => {
    try {
      const rideIdNumber = parseInt(rideId);
      await contract.payDriver(rideIdNumber, {
        value: ethers.utils.parseEther(amount),
      });
      setSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {success ? (
        <div className="text-green-500">Payment Successful!</div>
      ) : (
        <div className="flex flex-col">
          <input
            type="text"
            className="p-2 border-2 border-black rounded-lg"
            placeholder="Ride Id"
            value={rideId}
            onChange={handleRideIdChange}
          />
          <input
            type="text"
            className="p-2 border-2 border-black rounded-lg"
            placeholder="Amount"
            value={amount}
            onChange={handleAmountChange}
          />
          <button
            className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-lg mt-2"
            onClick={handlePayDriver}
          >
            Pay Driver
          </button>
        </div>
      )}
    </div>
  );
}

export default PayDriver;
