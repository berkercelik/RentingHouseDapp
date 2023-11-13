import { ethers } from "ethers";
import { useEffect, useState } from "react";
const {API_URL} = process.env;

const provider = new ethers.providers.JsonRpcProvider(API_URL);

const contractABI = [ {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "agreementId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_tenantAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "propId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "leaseStart",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "leaseEnd",
        "type": "uint256"
      }
    ],
    "name": "AgreementApproved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "agreementId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "propId",
        "type": "uint256"
      }
    ],
    "name": "AgreementTerminated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "propOwnerWallet",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "OwnerAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "propId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "_locAddress",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "comments",
        "type": "string"
      }
    ],
    "name": "PropertyAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "propId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "_locAddress",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "enum RentingHouseContract.Type",
        "name": "_type",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "comments",
        "type": "string"
      }
    ],
    "name": "PropertyMetaDataEdited",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "propId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "enum RentingHouseContract.Status",
        "name": "_status",
        "type": "uint8"
      }
    ],
    "name": "PropertyStatusEdited",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "rentedPropId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_tenantAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "TenantAdded",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "addOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_locAddress",
        "type": "string"
      },
      {
        "internalType": "enum RentingHouseContract.Type",
        "name": "_type",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "comments",
        "type": "string"
      }
    ],
    "name": "addProperty",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "addTenant",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "leaseStart",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "leaseEnd",
        "type": "uint256"
      }
    ],
    "name": "agreementApproval",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "propId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_locAddress",
        "type": "string"
      },
      {
        "internalType": "enum RentingHouseContract.Type",
        "name": "_type",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "comments",
        "type": "string"
      }
    ],
    "name": "editPropertyMetaData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "propId",
        "type": "uint256"
      },
      {
        "internalType": "enum RentingHouseContract.Status",
        "name": "_status",
        "type": "uint8"
      }
    ],
    "name": "editPropertyStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCurrentCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getOwner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "propOwnerWallet",
        "type": "address"
      }
    ],
    "name": "getPropOwner",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "propOwnerWallet",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          }
        ],
        "internalType": "struct RentingHouseContract.PropOwner",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "propId",
        "type": "uint256"
      }
    ],
    "name": "getProperties",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "propId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_locAddress",
            "type": "string"
          },
          {
            "internalType": "enum RentingHouseContract.Type",
            "name": "_type",
            "type": "uint8"
          },
          {
            "internalType": "enum RentingHouseContract.Status",
            "name": "_status",
            "type": "uint8"
          },
          {
            "internalType": "string",
            "name": "comments",
            "type": "string"
          }
        ],
        "internalType": "struct RentingHouseContract.Property",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum RentingHouseContract.Status",
        "name": "_status",
        "type": "uint8"
      }
    ],
    "name": "getPropertyByStatus",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "propId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_locAddress",
            "type": "string"
          },
          {
            "internalType": "enum RentingHouseContract.Type",
            "name": "_type",
            "type": "uint8"
          },
          {
            "internalType": "enum RentingHouseContract.Status",
            "name": "_status",
            "type": "uint8"
          },
          {
            "internalType": "string",
            "name": "comments",
            "type": "string"
          }
        ],
        "internalType": "struct RentingHouseContract.Property[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "setOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "propId",
        "type": "uint256"
      }
    ],
    "name": "terminateAgreement",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contractAddress = "0x45c7B4aA6D639b1451AcB633FE12DbCB20d1D492";

const contract = new ethers.Contract(contractAddress, contractABI, provider);

export const checkWalletConnection = async (setIsConnected) => {
  const { ethereum } = window;
  if (ethereum && ethereum.isMetaMask) {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.providers.Web3Provider(ethereum);

      const signer = provider.getSigner();

      setIsConnected(true);
      console.log('Connected to wallet');
      
      return accounts[0];
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      setIsConnected(false);
    }
  } else {
    console.error('Metamask is not installed or not accessible.');
    setIsConnected(false);
  }
};

export const addOwner = async (name) => {
    const {ethereum} = window;    

    if(ethereum && ethereum.isMetaMask) {
        try {
            await ethereum.request({ method: 'eth_requestAccounts' });

            const provider = new ethers.providers.Web3Provider(ethereum);

            const signer = provider.getSigner();

            const transaction = await contract.connect(signer).addOwner(name);

            await transaction.wait();

            console.log('Owner added successfully!');
        } catch (error) {
          console.error('Error adding owner:', error);
        }
    }else {
      console.error('Metamask is not installed or not accessible.');
    }
};

export const getPropOwner = async (propOwnerWallet) => {
  try {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const owner = await contract.connect(signer).getPropOwner(propOwnerWallet);
    return owner;
  } catch (error) {
    console.error('Error getting owner:', error);
    return null;
  }
};

export const addProperty = async (locAddress, type, comments) => {
  try {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transaction = await contract.connect(signer).addProperty(locAddress, type, comments);
    await transaction.wait();
    console.log('Property added successfully!');
  } catch (error) {
    console.error('Error adding property:', error);
  }
};

export const getProperty = async (propertyId) => {
  try {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const property = await contract.connect(signer).getProperties(propertyId); 
    console.log(property)
    return property;
  } catch (error) {
    console.error('Error getting property:', error);
    return null;
  }
};

export const addTenant = async (name) => {
  try {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transaction = await contract.connect(signer).addTenant(name);
    await transaction.wait();
    console.log('Tenant added successfully!');
  } catch (error) {
    console.error('Error adding tenant:', error);
  }
};

export const editPropertyMetaData = async (propId, locAddress, type, comments) => {
  try {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transaction = await contract.connect(signer).editPropertyMetaData(propId, locAddress, type, comments);
    await transaction.wait();
    console.log('Property metadata edited successfully!');
  } catch (error) {
    console.error('Error editing property metadata:', error);
  }
};

export const editPropertyStatus = async (propId, status) => {
  try {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transaction = await contract.connect(signer).editPropertyStatus(propId, status);
    await transaction.wait();
    console.log('Property status edited successfully!');
  } catch (error) {
    console.error('Error editing property status:', error);
  }
};

export const approveAgreement = async (id, leaseStart, leaseEnd) => {
  try {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transaction = await contract.connect(signer).agreementApproval(id, leaseStart, leaseEnd);
    await transaction.wait();
    console.log('Agreement approved successfully!');
  } catch (error) {
    console.error('Error approving agreement:', error);
  }
};

export const terminateAgreement = async (id, propId) => {
  try {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transaction = await contract.connect(signer).terminateAgreement(id, propId);
    await transaction.wait();
    console.log('Agreement terminated successfully!');
  } catch (error) {
    console.error('Error terminating agreement:', error);
  }
};