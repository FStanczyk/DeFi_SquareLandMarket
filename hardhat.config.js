require('@nomiclabs/hardhat-waffle')
require("hardhat-gas-reporter");
require('dotenv').config();
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: process.env.INFURA_KEY,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
