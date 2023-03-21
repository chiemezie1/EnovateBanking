const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await deployer.getBalance();
  const enovateToken = await hre.ethers.getContractFactory("EnovateToken");
  const EnovateToken = await enovateToken.deploy();

  await EnovateToken.deployed();
  console.log("EnovateToken deployed to:", EnovateToken.address)

  const TokenData = {
    address: EnovateToken.address,
    abi: JSON.parse(EnovateToken.interface.format('json'))
  }
  //This writes the ABI and address to the EnovateToken.json
  fs.writeFileSync('./client/src/contract/EnovateToken.json', JSON.stringify(TokenData))


  // second contract
  
  const enovateBank = await hre.ethers.getContractFactory("EnovateBank");
  const EnovateBank = await enovateBank.deploy(EnovateToken.address);

  await EnovateBank.deployed();
  console.log("EnovateBank deployed to:", EnovateBank.address)

  const BankData = {
    address: EnovateBank.address,
    abi: JSON.parse(EnovateBank.interface.format('json'))
  }

  //This writes the ABI and address to the EnovateBank.json
  fs.writeFileSync('./client/src/contract/EnovateBank.json', JSON.stringify(BankData))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })