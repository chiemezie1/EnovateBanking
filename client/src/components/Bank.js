import { useState, useEffect } from "react";
import EnovateToken from "../contract/EnovateToken.json";


function Profile() {
  const [ethBalance, setETHBalance] = useState("");
  const [totalInterest, setTotalInterest] = useState("");
  const [enovateToken, setEnovateToken] = useState("");
  const [contractEtherBalance, setContractEtherBalance] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [borrowAmount, setBorrowAmount] = useState("");
  const [payoffAmount, setPayOffAmount] = useState("");

  // useEffect(() => {
  //   async function fetchData() {
  //     const ethBalance = await getETHBalanceOf();
  //     const totalInterest = await getTotalInterest();
  //     const enovateToken = await getEnovateToken();
  //     const contractEtherBalance = await getContractEtherBalance();
  //     setETHBalance(ethBalance);
  //     setTotalInterest(totalInterest);
  //     setEnovateToken(enovateToken);
  //     setContractEtherBalance(contractEtherBalance);
  //   }
  //   fetchData();
  // }, []);

  async function handleDeposit() {
    // handle deposit logic
  }

  async function handleWithdraw() {
    // handle withdraw logic
  }

  async function handleBorrow() {
    // handle borrow logic
  }

  async function handlePayoff() {
    // handle payoff logic
  }

  return (
    <div className="flex flex-col bg-gray-600 items-center justify-center h-screen">
      <div className="flex flex-wrap justify-center max-w-3xl">
        <div className="w-full sm:w-1/2 md:w-1/4 p-4">
          <div className="bg-white border shadow rounded-lg p-6">
            <div className="text-gray-500 mb-2">ETH Balance</div>
            <div className="font-bold text-xl">{ethBalance}</div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 p-4">
          <div className="bg-white border shadow rounded-lg p-6">
            <div className="text-gray-500 mb-2">Total Interest</div>
            <div className="font-bold text-xl">{totalInterest}</div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 p-4">
          <div className="bg-white border shadow rounded-lg p-6">
            <div className="text-gray-500 mb-2">Enovate Token</div>
            <div className="font-bold text-xl">{enovateToken}</div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 p-4">
          <div className="bg-white border shadow rounded-lg p-6">
            <div className="text-gray-500 mb-2">Contract Ether Balance</div>
            <div className="font-bold text-xl">{contractEtherBalance}</div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/2 p-4">
          <div className="bg-white border shadow rounded-lg p-6">
            <div className="text-gray-500 mb-2">Deposit ETH</div>
            <input
              className="border rounded-lg py-2 px-3 w-full mb-4"
              type="number"
              step="any"
              placeholder="0"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
              onClick={handleDeposit}
            >
              Deposit
            </button>
          </div>{" "}
          <div className="bg-white border shadow rounded-lg p-6">
            <div className="text-gray-500 mb-2">Withdraw ETH</div>
            <input
              className="border rounded-lg py-2 px-3 w-full mb-4"
              type="number"
              step="any"
              placeholder="0"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
              onClick={handleWithdraw}
            >
              Withdraw
            </button>
          </div>
          <div className="bg-white border shadow rounded-lg p-6">
            <div className="text-gray-500 mb-2">Borrow</div>
            <input
              className="border rounded-lg py-2 px-3 w-full mb-4"
              type="number"
              step="any"
              placeholder="0"
              value={borrowAmount}
              onChange={(e) => setBorrowAmount(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
              onClick={handleBorrow}
            >
              Borrow
            </button>
          </div>
          <div className="bg-white border shadow rounded-lg p-6">
            <div className="text-gray-500 mb-2">Pay off</div>
            <input
              className="border rounded-lg py-2 px-3 w-full mb-4"
              type="number"
              step="any"
              placeholder="0"
              value={payoffAmount}
              onChange={(e) => setPayOffAmount(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
              onClick={handlePayoff}
            >
              Pay off
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
