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
  const [isAdmin, setIsAdmin] = useState(true);
  const [mintAmount, setMintAmount] = useState("");
  const [burnAmount, setBurnAmount] = useState("");
  const [minterAddress, setMinterAddress] = useState("");

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

  async function handleMint(event) {
    event.preventDefault();
    // Mint tokens to the user
    await contract.mint(userAddress, mintAmount);
    setMintAmount("");
  }

  async function handleBurn(event) {
    event.preventDefault();
    // Burn tokens from the user
    await contract.burn(userAddress, burnAmount);
    setBurnAmount("");
  }

  async function grantMinterRole(event) {
    event.preventDefault();
    // Grant minter role to the specified address
    await contract.grantRole(contract.MINTER_ROLE, minterAddress);
    setMinterAddress("");
  }

  async function revokeMinterRole(event) {
    event.preventDefault();
    // Revoke minter role from the specified address
    await contract.revokeRole(contract.MINTER_ROLE, minterAddress);
    setMinterAddress("");
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        {isAdmin ? (
          <div>
            <form onSubmit={handleMint}>
              <label>
                Mint Amount:
                <input
                  type="number"
                  value={mintAmount}
                  onChange={(e) => setMintAmount(e.target.value)}
                />
              </label>
              <button type="submit">Mint</button>
            </form>
            <form onSubmit={handleBurn}>
              <label>
                Burn Amount:
                <input
                  type="number"
                  value={burnAmount}
                  onChange={(e) => setBurnAmount(e.target.value)}
                />
              </label>
              <button type="submit">Burn</button>
            </form>
            <form onSubmit={grantMinterRole}>
              <label>
                Grant Minter Role:
                <input
                  type="text"
                  value={minterAddress}
                  onChange={(e) => setMinterAddress(e.target.value)}
                />
              </label>
              <button type="submit">Grant</button>
            </form>
            <form onSubmit={revokeMinterRole}>
              <label>
                Revoke Minter Role:
                <input
                  type="text"
                  value={minterAddress}
                  onChange={(e) => setMinterAddress(e.target.value)}
                />
              </label>
              <button type="submit">Revoke</button>
            </form>
          </div>
        ) : (
          <div>
            <p>You are not an admin.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Profile;

