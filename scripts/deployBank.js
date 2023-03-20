const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await deployer.getBalance();
  const enovateBank = await hre.ethers.getContractFactory("EnovateBank");
  const EnovateBank = await enovateBank.deploy();

  await EnovateBank.deployed();
  console.log("EnovateBank deployed to:", EnovateBank.address)

  const data = {
    address: EnovateBank.address,
    abi: JSON.parse(EnovateBank.interface.format('json'))
  }

  //This writes the ABI and address to the EnovateBank.json
  fs.writeFileSync('./client/src/contract/EnovateBank.json', JSON.stringify(data))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })