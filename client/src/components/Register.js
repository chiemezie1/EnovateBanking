import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import CarRide from "../contract/CarRide.json";
import Navbar from "./Navbar";

function Register() {
  const [userType, setUserType] = useState("rider");
  const [values, setValues] = useState({
    name: "",
    contact: "",
    email: "",
    carNumber: "",
    seats: "",
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

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

  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleUserType = (e) => {
    setUserType(userType === "driver" ? "rider" : "driver");
  };

  async function register() {
    if (!provider || !signer) {
      alert("Please connect to Ethereum network");
      return;
    }
    const contract = new ethers.Contract(CarRide.address, CarRide.abi, signer);
    try {
      if (userType === "rider") {
        const tx = await contract.registerRider(
          values.name,
          values.contact,
          values.email
        );
        await tx.wait();
        setIsRegistered(true);
      } else if (userType === "driver") {
        const tx = await contract.registerDriver(
          values.name,
          values.contact,
          values.email,
          values.carNumber,
          values.seats
        );
        await tx.wait();
        setIsRegistered(true);
      }
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className="font-sans w-3/5 mx-auto justify-center rounded-lg m-81 p-32 bg-gray-200">
        <div>
          <div>
            <h1 className="text-3xl items-center font-bold text-center">
              Sign Up !
            </h1>
            <button
              type="submit"
              onClick={handleUserType}
              className="font-bold mt-10 w-1/5 bg-red-700 hover:bg-red-900 text-white rounded p-2 shadow-lg"
            >
              Click if Driver
            </button>
          </div>
          <div className="block font-bold text-lg mb-2">
            <div>Name:</div>
            <input
              className="rounded-md py-2 px-3 w-full"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
            />
          </div>
          <div className="block font-bold text-lg mb-2">
            <div>Contact:</div>
            <input
              className="rounded-md py-2 px-3 w-full"
              name="contact"
              type="text"
              value={values.contact}
              onChange={handleChange}
            />
          </div>
          <div className="block font-bold text-lg mb-2">
            <div>Email:</div>
            <input
              className="rounded-md py-2 px-3 w-full"
              name="email"
              type="text"
              value={values.email}
              onChange={handleChange}
            />
          </div>
          {userType === "driver" ? (
            <div>
              <div className="block font-bold text-lg mb-2">
                <div>Car Number:</div>
                <input
                  className="rounded-md py-2 px-3 w-full"
                  name="carNumber"
                  type="text"
                  value={values.carNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="block font-bold text-lg mb-2">
                <div>Seats:</div>
                <input
                  className="rounded-md py-2 px-3 w-full"
                  name="seats"
                  type="text"
                  value={values.seats}
                  onChange={handleChange}
                />
              </div>
            </div>
          ) : null}
          <button
            type="submit"
            onClick={register}
            className="bg-blue-900 py-2 px-12 rounded-md text-white hover:bg-blue-700 hover:cursor-pointer" 
          >
            Register
          </button>
          {isRegistered ? (
            <div className="text-green-500">Successfully Registered!</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
export default Register;
