export const eldenNftFactoryABI = [{
  inputs: [{
    internalType: "contract IGgtoroMaster",
    name: "master_",
    type: "address"
  }, {
    internalType: "contract IERC20",
    name: "ggtoroToken_",
    type: "address"
  }, {
    internalType: "contract ISGgtoroToken",
    name: "sGgtoroToken_",
    type: "address"
  }],
  stateMutability: "nonpayable",
  type: "constructor"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: "address",
    name: "lpToken",
    type: "address"
  }, {
    indexed: false,
    internalType: "address",
    name: "pool",
    type: "address"
  }],
  name: "PoolCreated",
  type: "event"
}, {
  inputs: [{
    internalType: "address",
    name: "lpToken",
    type: "address"
  }],
  name: "createPool",
  outputs: [{
    internalType: "address",
    name: "pool",
    type: "address"
  }],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [],
  name: "ggtoroToken",
  outputs: [{
    internalType: "contract IERC20",
    name: "",
    type: "address"
  }],
  stateMutability: "view",
  type: "function"
}, {
  inputs: [{
    internalType: "address",
    name: "",
    type: "address"
  }],
  name: "getPool",
  outputs: [{
    internalType: "address",
    name: "",
    type: "address"
  }],
  stateMutability: "view",
  type: "function"
}, {
  inputs: [],
  name: "master",
  outputs: [{
    internalType: "contract IGgtoroMaster",
    name: "",
    type: "address"
  }],
  stateMutability: "view",
  type: "function"
}, {
  inputs: [{
    internalType: "uint256",
    name: "",
    type: "uint256"
  }],
  name: "pools",
  outputs: [{
    internalType: "address",
    name: "",
    type: "address"
  }],
  stateMutability: "view",
  type: "function"
}, {
  inputs: [],
  name: "poolsLength",
  outputs: [{
    internalType: "uint256",
    name: "",
    type: "uint256"
  }],
  stateMutability: "view",
  type: "function"
}, {
  inputs: [],
  name: "sGgtoroToken",
  outputs: [{
    internalType: "contract ISGgtoroToken",
    name: "",
    type: "address"
  }],
  stateMutability: "view",
  type: "function"
}] as const
