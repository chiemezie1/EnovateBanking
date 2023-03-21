import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import CarRide from "../contract/CarRide.json";

function CancelRide() {
  const [rideId, setRideId] = useState("");
  const [cancelled, setCancelled] = useState(false);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    async function loadProvider() {
      if (window.ethereum) {
        // load provider (example: using metamask)
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setSigner(signer);
      } else {
        console.error(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    }
    loadProvider();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const contract = new ethers.Contract(
        CarRide.address,
        CarRide.abi,
        signer
      );
      const tx = await contract.cancelRide(rideId);
      await tx.wait();
      setCancelled(true);
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
  }

  return (
    <div className="mx-16">
      <form onSubmit={handleSubmit}>
       <div className="flex flex-col">
          <input
            type="text"
            className="p-2 border-2 border-black rounded-lg"
            placeholder="Ride Id"
            value={rideId}
            onChange={(e) => setRideId(e.target.value)}
          />
      
        <button
          className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-lg mt-2"
          type="submit"
        >
          Cancel A Ride
        </button>
         </div>
      </form>
      {cancelled ? (
        <div className="text-2xl text-green-900">
          <h3>Ride {rideId} Successfully Cancelled!</h3>
        </div>
      ) : null}
    </div>
  );
}

export default CancelRide;
