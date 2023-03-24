import React, { useState, useEffect } from "react";
import EnovateToken from "../contract/EnovateToken.json";
import Navbar from "./Navbar";
import Footer from "./footer";

const { ethers } = require("ethers");

function Profile() {
  const [mintValue, setMintValue] = useState("");
  const [mintAdress, setMintAdress] = useState("");
  const [burnValue, setBurnValue] = useState("");
  const [burnAdress, setBurnAdress] = useState("");
  const [grantAddress, setGrantAddress] = useState("");
  const [revokeAddress, setRevokeAddress] = useState("");
  const [mintSuccess, setMintSuccess] = useState(false);
  const [burnSuccess, setBurnSuccess] = useState(false);
  const [grantSuccess, setGrantSuccess] = useState(false);
  const [revokeSuccess, setRevokeSuccess] = useState(false);

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

  async function handleMint() {
    if (!provider || !signer) {
      alert("Please connect to Ethereum network");
      return;
    }
    const contract = new ethers.Contract(
      EnovateToken.address,
      EnovateToken.abi,
      signer
    );
    try {
      const tx = await contract.mint(mintAdress, mintValue);
      await tx.wait();
      setMintSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
  }

  async function handleBurn() {
    if (!provider || !signer) {
      alert("Please connect to Ethereum network");
      return;
    }
    const contract = new ethers.Contract(
      EnovateToken.address,
      EnovateToken.abi,
      signer
    );
    try {
      const tx = await contract.burnFrom(burnAdress, burnValue);
      await tx.wait();
      setBurnSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
  }

  async function handleGrantMinterRole() {
    if (!provider || !signer) {
      alert("Please connect to Ethereum network");
      return;
    }
    const contract = new ethers.Contract(
      EnovateToken.address,
      EnovateToken.abi,
      signer
    );
    try {
      const tx = await contract.grantMinterRole(grantAddress);
      await tx.wait();
      setGrantSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
  }

  async function handleRevokeMinterRole() {
    if (!provider || !signer) {
      alert("Please connect to Ethereum network");
      return;
    }
    const contract = new ethers.Contract(
      EnovateToken.address,
      EnovateToken.abi,
      signer
    );
    try {
      const tx = await contract.revokeMinterRole(revokeAddress);
      await tx.wait();
      setRevokeSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow bg-gray-100">
        <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Profile</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Mint Tokens
              </h2>
              <div className="mb-4">
                <label
                  htmlFor="mintAmount"
                  className="block text-gray-700 font-bold mb-2"
                >
                   Address to mint (ENVT)
                </label>
                <input
                  id="mintAdress"
                  type="text" 
                  value={mintAdress} 
                  onChange={(e) => setMintAdress(e.target.value)}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <label
                  htmlFor="mintAmount"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Amount to mint (ENVT)
                </label>
                <input
                  id="mintValue"
                  type="number"
                  value={mintValue} 
                  onChange={(e) => setMintValue(e.target.value)}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <button
                onClick={handleMint}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Mint
              </button>
              {mintSuccess && (
                <p className="text-green-500 mt-2">
                  Tokens successfully minted!
                </p>
              )}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Burn Tokens
              </h2>
              <div className="mb-4">
                <label
                  htmlFor="burnAmount"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Address to burn (ENVT)
                </label>
                <input
                  id="burnAmount"
                  type="text" 
                  value={burnAdress}
                  onChange={(e) => setBurnAdress(e.target.value)}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <label
                  htmlFor="mintAmount"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Amount to burn (ENVT)
                </label>
                <input
                  id="burnAdress"
                  type="number"
                  value={burnAdress} burnValue
                  onChange={(e) => setBurnValue(e.target.value)}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <button
                onClick={handleBurn}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Burn
              </button>
              {burnSuccess && (
                <p className="text-green-500 mt-2">
                  Tokens successfully burned!
                </p>
              )}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Grant Minter Role
              </h2>
              <div className="mb-4">
                <label
                  htmlFor="grantAddress"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Address to grant role to
                </label>
                <input
                  id="grantAddress"
                  type="text"
                  value={grantAddress}
                  onChange={(e) => setGrantAddress(e.target.value)}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <button
                onClick={handleGrantMinterRole}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Grant
              </button>
              {grantSuccess && (
                <p className="text-green-500 mt-2">
                  Minter role successfully granted!
                </p>
              )}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Revoke Minter Role
              </h2>
              <div className="mb-4">
                <label
                  htmlFor="revokeAddress"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Address to revoke role from
                </label>
                <input
                  id="revokeAddress"
                  type="text"
                  value={revokeAddress}
                  onChange={(e) => setRevokeAddress(e.target.value)}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <button
                onClick={handleRevokeMinterRole}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Revoke
              </button>
              {revokeSuccess && (
                <p className="text-green-500 mt-2">
                  Minter role successfully revoked!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Profile;
