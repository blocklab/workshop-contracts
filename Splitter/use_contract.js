const Web3 = require('web3')
const fs = require('fs')

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
const contractCode = fs.readFileSync('Splitter.sol').toString()
const compiledContract = web3.eth.compile.solidity(contractCode)
const Splitter = web3.eth.contract(compiledContract.info.abiDefinition)
const deployedSplitter = Splitter.new({
  data: compiledContract.code,
  from: web3.eth.accounts[0],
  value: web3.toWei(10, 'ether')
})

console.log(web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]).toNumber()))
console.log(web3.fromWei(web3.eth.getBalance(web3.eth.accounts[1]).toNumber()))
console.log(web3.fromWei(web3.eth.getBalance(web3.eth.accounts[2]).toNumber()))
