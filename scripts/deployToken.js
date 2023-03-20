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

  const data = {
    address: EnovateToken.address,
    abi: JSON.parse(EnovateToken.interface.format('json'))
  }

  //This writes the ABI and address to the EnovateToken.json
  fs.writeFileSync('./client/src/contract/EnovateToken.json', JSON.stringify(data))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })