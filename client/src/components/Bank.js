import React, { useState } from "react";
import { ethers } from "ethers";
import EnovateToken from "../artifacts/contracts/EnovateToken.sol/EnovateToken.json";

const EnovateTokenContractAddress = "<your contract address here>";
const EnovateTokenAbi = EnovateToken.abi;

function EnovateTokenForm() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState(0);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      setProvider(provider);
      setAccount(accounts[0]);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EnovateTokenContractAddress,
        EnovateTokenAbi,
        signer
      );
      setContract(contract);
    } else {
      alert("Please install Metamask to use this feature");
    }
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleMint = async () => {
    try {
      const tx = await contract.mint(account, amount);
      await tx.wait();
      alert(`Minted ${amount} EnovateToken successfully!`);
    } catch (error) {
      console.log(error);
      alert("Failed to mint EnovateToken");
    }
  };

  const handleBurn = async () => {
    try {
      const tx = await contract.burn(account, amount);
      await tx.wait();
      alert(`Burned ${amount} EnovateToken successfully!`);
    } catch (error) {
      console.log(error);
      alert("Failed to burn EnovateToken");
    }
  };

  return (
    <div>
      {account ? (
        <div>
          <p>Connected account: {account}</p>
          <input type="number" value={amount} onChange={handleAmountChange} />
          <button onClick={handleMint}>Mint EnovateToken</button>
          <button onClick={handleBurn}>Burn EnovateToken</button>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}

export default EnovateTokenForm;
