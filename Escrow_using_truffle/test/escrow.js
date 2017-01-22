contract('Escrow', (accounts) => {
  const alice = accounts[0];
  const bob = accounts[1];
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

  it('can be finalized by the buyer', () => {
    const bobsInitialBalance = web3.fromWei(web3.eth.getBalance(bob).toNumber());
    return contract.paySeller({
      from: accounts[0]
    }).then(() => {
      assert.equal(+web3.fromWei(web3.eth.getBalance(accounts[1]).toNumber()), +bobsInitialBalance + 1)
    });
  });
});
