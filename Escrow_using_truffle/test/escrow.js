contract('Escrow', (accounts) => {
  const aliceTheBuyer = accounts[0];
  const bobTheSeller = accounts[1];
  let contract;

  let balanceInEther = (account) => {
    return +web3.fromWei(web3.eth.getBalance(account).toNumber());
  };

  beforeEach(() => {
    contract = Escrow.deployed();
  });

  it('accepts ether', (done) => {
    return web3.eth.sendTransaction({
      from: aliceTheBuyer,
      to: contract.address,
      value: web3.toWei(1, 'ether')
    }, () => {
      assert.equal(balanceInEther(contract.address), 1);
      done();
    })
  });

  it('can be finalized by the buyer', () => {
    const bobsInitialBalance = balanceInEther(bobTheSeller);
    return contract.paySeller({
      from: aliceTheBuyer,
    }).then(() => {
      assert.equal(balanceInEther(bobTheSeller), bobsInitialBalance + 1)
    });
  });

  it('cant be finalized by the seller', (done) => {
    contract.paySeller({
      from: bobTheSeller
    }).catch(() => {
      assert.ok(true);
      done();
    }).then(() => {
      assert.fail();
      done();
    })
  });
});
