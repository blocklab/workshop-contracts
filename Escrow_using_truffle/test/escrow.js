contract('Escrow', (accounts) => {
  const alice = accounts[0];
  let contract;

  beforeEach(() => {
    contract = Escrow.deployed();
  });

  it('accepts ether', (done) => {
    return web3.eth.sendTransaction({
      from: accounts[0],
      to: contract.address,
      value: web3.toWei(1, 'ether')
    }, () => {
      assert.equal(web3.fromWei(web3.eth.getBalance(contract.address).toNumber()), 1);
      done();
    })
  });
});
