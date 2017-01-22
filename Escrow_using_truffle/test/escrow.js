contract('Escrow', (accounts) => {
  it('accepts ether', (done) => {
    return web3.eth.sendTransaction({
      from: accounts[0],
      to: Escrow.deployed().address,
      value: web3.toWei(1, 'ether')
    }, () => {
      assert.equal(web3.fromWei(web3.eth.getBalance(Escrow.deployed().address).toNumber()), 1);
      done();
    })
  });
});
