import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    // sepolia: {
    //   url: process.env.API_URL || "",
    //   accounts: process.env.SEPOLIA_PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    // },
    sepolia: {
      url: process.env.API_URL || "",
      accounts:
        process.env.SEPOLIA_PRIVATE_KEY !== undefined ? [`0x${process.env.SEPOLIA_PRIVATE_KEY}`] : [],
    },
  },
};



export default config;
