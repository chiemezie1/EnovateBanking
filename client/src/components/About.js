import React, { useState, useEffect } from "react";
import EnovateBank from "../contract/EnovateBank.json";
const { ethers } = require("ethers");

function About() {
  const [ethBalance, setEthBalance] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [enovateToken, setEnovateToken] = useState(0);
  const [contractEtherBalance, setContractEtherBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [borrowAmount, setBorrowAmount] = useState(0);
  const [payoffAmount, setPayoffAmount] = useState(0);

  const [address, setAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);


  useEffect(() => {
    async function loadProvider() {
      if (window.ethereum) {
        // load provider (example: using metamask)
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setProvider(provider);
        setSigner(signer);
        const addr = await signer.getAddress();
        setAddress(addr.toString());
      } else {
        console.error(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    }
    loadProvider();
  }, []);

  useEffect(() => {
    async function getUserInfo() {
      if (!provider || !signer) {
        alert("Please connect to Ethereum network");
        return;
      }
      const contract = new ethers.Contract(
        EnovateBank.address,
        EnovateBank.abi,
        signer
      );
      try {
        const ETHBalance = await contract.getETHBalanceOf(address);
        await ETHBalance.wait();
        setEthBalance(ETHBalance).toNumber();

        const TotalInterest = await contract.getTotalInterest(address);
        await TotalInterest.wait();
        setTotalInterest(TotalInterest).toNumber();

        const EnovateToken = await contract.getEnovateToken(address);
        await EnovateToken.wait();
        setEnovateToken(EnovateToken).toNumber();

        const ContractEtherBalance = await contract.getContractEtherBalance(address);
        await ContractEtherBalance.wait();
        setContractEtherBalance(ContractEtherBalance).toNumber();
        
      } catch (error) {
        console.error(error);
        alert("Error: " + error.message);
      }
    }
   
  }, [provider, signer, address]);



  async function handleDeposit() {
    await contract.depositETH(depositAmount);
    setDepositAmount(0);
  }

  async function handleWithdraw() {
    await contract.withdrawETH(withdrawAmount);
    setWithdrawAmount(0);
  }

  async function handleBorrow() {
    await contract.borrow(borrowAmount);
    setBorrowAmount(0);
  }

  async function handlePayoff() {
    await contract.payOff(payoffAmount);
    setPayoffAmount(0);
  }

  return (
    <div className="bg-gray-300 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl p-4">
        <div className="flex justify-center mb-4">
          <div className="bg-white border shadow rounded-lg p-6 mr-4">
            <div className="text-gray-500 mb-2">ETH Balance</div>
            <div className="text-xl font-bold">{ethBalance}</div>
          </div>
          <div className="bg-white border shadow rounded-lg p-6 mr-4">
            <div className="text-gray-500 mb-2">Total Interest</div>
            <div className="text-xl font-bold">{totalInterest}</div>
          </div>
          <div className="bg-white border shadow rounded-lg p-6 mr-4">
            <div className="text-gray-500 mb-2">Enovate Token</div>
            <div className="text-xl font-bold">{enovateToken}</div>
          </div>
          <div className="bg-white border shadow rounded-lg p-6">
            <div className="text-gray-500 mb-2">Contract ETH Balance</div>
            <div className="text-xl font-bold">{contractEtherBalance}</div>
          </div>
        </div>
        <div className="flex justify-center mb-4">
          <div className="bg-white border shadow rounded-lg p-6 mr-4">
            <div className="text-gray-500 mb-2">Deposit ETH</div>
            <div className="flex items-center mb-2">
              <input
                className="border rounded-lg py-2 px-3 w-full"
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.targetvalue)}
              />
            </div>
            <button
              className="bg-green-500 text-white rounded-lg py-2 px-3"
              onClick={handleDeposit}
            >
              Deposit
            </button>
          </div>
          <div className="bg-white border shadow rounded-lg p-6 mr-4">
            <div className="text-gray-500 mb-2">Withdraw ETH</div>
            <div className="flex items-center mb-2">
              <input
                className="border rounded-lg py-2 px-3 w-full"
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
            </div>
            <button
              className="bg-red-500 text-white rounded-lg py-2 px-3"
              onClick={handleWithdraw}
            >
              Withdraw
            </button>
          </div>
          <div className="bg-white border shadow rounded-lg p-6 mr-4">
            <div className="text-gray-500 mb-2">Borrow</div>
            <div className="flex items-center mb-2">
              <input
                className="border rounded-lg py-2 px-3 w-full"
                type="number"
                value={borrowAmount}
                onChange={(e) => setBorrowAmount(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-500 text-white rounded-lg py-2 px-3"
              onClick={handleBorrow}
            >
              Borrow
            </button>
          </div>
          <div className="bg-white border shadow rounded-lg p-6">
            <div className="text-gray-500 mb-2">Payoff</div>
            <div className="flex items-center mb-2">
              <input
                className="border rounded-lg py-2 px-3 w-full"
                type="number"
                value={payoffAmount}
                onChange={(e) => setPayoffAmount(e.target.value)}
              />
            </div>
            <button
              className="bg-yellow-500 text-white rounded-lg py-2 px-3"
              onClick={handlePayoff}
            >
              Payoff
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
