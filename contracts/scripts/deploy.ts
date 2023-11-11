import { ethers } from "hardhat";

async function main() {
  const RentingHouse = await ethers.getContractFactory("RentingHouseContract");
  const rentingHouse = await RentingHouse.deploy();
  await rentingHouse.waitForDeployment();
  console.log("Renting House Contract deployed to: ", rentingHouse.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
