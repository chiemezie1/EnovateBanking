import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import CarRide from "../contract/CarRide.json";

function UpdateDriverRating() {
  const [rideId, setRideId] = useState("");
  const [rating, setRating] = useState("");
  const [updated, setUpdated] = useState(false);
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
      const tx = await contract.updateDriverRating(rideId, rating);
      await tx.wait();
      setUpdated(true);
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
  }

  return (
    <div className="mx-16">
      <p>Help us serve you bette</p>
      <p>Rate our driver today!</p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <input
            type="text"
            className="p-2 border-2 border-black rounded-lg"
            placeholder="Ride Id"
            value={rideId}
            onChange={(e) => setRideId(e.target.value)}
          />
          <input
            type="number"
            min="1"
            max="5"
            className="p-2 border-2 border-black rounded-lg mt-2"
            placeholder="Rating (1-5)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <button
            className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-lg mt-2"
            type="submit"
          >
            Update Driver Rating
          </button>
        </div>
      </form>
      {updated ? (
        <div className="text-2xl text-green-900">
          <h3>Driver rating successfully updated for ride {rideId}!</h3>
        </div>
      ) : null}
    </div>
  );
}

export default UpdateDriverRating;
