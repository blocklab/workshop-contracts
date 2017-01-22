contract('Escrow', (accounts) => {
  const alice = accounts[0];
  const bob = accounts[1];
  let contract;

  let balanceInEther = (account) => {
    return +web3.fromWei(web3.eth.getBalance(account).toNumber());
  };

  beforeEach(() => {
    contract = Escrow.deployed();
  });

  it('accepts ether', (done) => {
    return web3.eth.sendTransaction({
      from: alice,
      to: contract.address,
      value: web3.toWei(1, 'ether')
    }, () => {
      assert.equal(balanceInEther(contract.address), 1);
      done();
    })
  });

  it('can be finalized by the buyer', () => {
    const bobsInitialBalance = balanceInEther(bob);
    return contract.paySeller({
      from: alice,
    }).then(() => {
      assert.equal(balanceInEther(bob), bobsInitialBalance + 1)
    });
  });
});
