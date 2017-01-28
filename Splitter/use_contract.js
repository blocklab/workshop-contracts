const Web3 = require('web3')
const fs = require('fs')

let balanceOf = (accountIndex) => {
  return web3.fromWei(web3.eth.getBalance(web3.eth.accounts[accountIndex]).toNumber())
}

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

console.log("Contract creator balance (before): \t", balanceOf(0))
console.log("Balance first recipient (before): \t", balanceOf(1))
console.log("Balance second recipient (before): \t", balanceOf(2))

// Read contract
const contractCode = fs.readFileSync('Splitter.sol').toString()

// Compile contract
const compiledContract = web3.eth.compile.solidity(contractCode)

// Deploy contract onto blockchain
const Splitter = web3.eth.contract(compiledContract.info.abiDefinition)
const deployedSplitter = Splitter.new({
  data: compiledContract.code,
  from: web3.eth.accounts[0],
  value: web3.toWei(10, 'ether')
})

console.log("Contract creator balance (after): \t", balanceOf(0))
console.log("Balance first recipient (after): \t", balanceOf(1))
console.log("Balance second recipient (after): \t", balanceOf(2))
