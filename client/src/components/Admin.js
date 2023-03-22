// import React, { useState, useEffect } from "react";
// import CarRide from "../contract/EnovateToken.json";
// import Navbar from "./Navbar";
// import Footer from "./footer";

// const { ethers } = require("ethers");

// function Profile() {
//   return (
//     <div>
//       <Navbar />
//       <div className="flex flex-col items-center justify-center h-screen">
//         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           Login
//         </button>
//         <div className="mt-4">
//           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//             Admin Login
//           </button>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }
// export default Profile;

import React, { useState, useEffect } from "react";
import EnovateToken from "../contract/EnovateToken.json";
import Navbar from "./Navbar";
import Footer from "./footer";

const { ethers } = require("ethers");

function Profile() {
  const [userAddress, setUserAddress] = useState("");
  const [contract, setContract] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mintValue, setMintValue] = useState("");
  const [burnValue, setBurnValue] = useState("");
  const [grantValue, setGrantValue] = useState("");
  const [revokeValue, setRevokeValue] = useState("");
  const [mintSuccess, setMintSuccess] = useState(false);
  const [burnSuccess, setBurnSuccess] = useState(false);
  const [grantSuccess, setGrantSuccess] = useState(false);
  const [revokeSuccess, setRevokeSuccess] = useState(false);

  useEffect(() => {
    async function connectToBlockchain() {
      // Connect to provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Request access to user's accounts
      await window.ethereum.enable();

      // Get user's address
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setUserAddress(address);

      // Load contract
      const enovateToken = new ethers.Contract(
        EnovateToken.contract,
        EnovateToken.abi,
        signer
      );
      setContract(enovateToken);

      // Check if user is admin
      const isAdmin = await enovateToken.hasRole(
        enovateToken.DEFAULT_ADMIN_ROLE,
        address
      );
      setIsAdmin(isAdmin);
    }

    connectToBlockchain();
  }, []);

  async function handleMint() {
    try {
      // Mint tokens to the user
      const mintAmount = ethers.utils.parseEther(mintValue);
      await contract.mint(userAddress, mintAmount);

      // Reset input value and show success message
      setMintValue("");
      setMintSuccess(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleBurn() {
    try {
      // Burn tokens from the user
      const burnAmount = ethers.utils.parseEther(burnValue);
      await contract.burn(userAddress, burnAmount);

      // Reset input value and show success message
      setBurnValue("");
      setBurnSuccess(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleGrantMinterRole() {
    try {
      // Grant minter role to an address
      await contract.grantRole(contract.MINTER_ROLE, grantValue);

      // Reset input value and show success message
      setGrantValue("");
      setGrantSuccess(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleRevokeMinterRole() {
    try {
      // Revoke minter role from an address
      await contract.revokeRole(contract.MINTER_ROLE, revokeValue);

      // Reset input value and show success message
      setRevokeValue("");
      setRevokeSuccess(true);
    } catch (error) {
      console.error(error);
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
                  Amount to mint (ENVT)
                </label>
                <input
                  id="mintAmount"
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
                  Amount to burn (ENVT)
                </label>
                <input
                  id="burnAmount"
                  type="number"
                  value={burnValue}
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
                  value={grantValue}
                  onChange={(e) => setGrantValue(e.target.value)}
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
                  value={revokeValue}
                  onChange={(e) => setRevokeValue(e.target.value)}
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