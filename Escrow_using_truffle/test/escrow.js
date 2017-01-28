const FUNDING_AMOUNT = 1;

let balanceInEther = (account) => {
  return +web3.fromWei(web3.eth.getBalance(account).toNumber());
};

let provideFunding = (contract, buyer) => {
  return contract.fund.sendTransaction({
    from: buyer,
    to: contract.address,
    value: web3.toWei(FUNDING_AMOUNT, 'ether')
  })
};

contract('Escrow - Buyer releases funds', (accounts) => {
  const buyer = accounts[0];
  const seller = accounts[1];

  it('can be finalized by the buyer', () => {
    let contract = Escrow.deployed();
    return provideFunding(contract, buyer)
      .then(() => {
        const sellerBalanceBeforeBeingPaid = balanceInEther(seller);
        return contract.paySeller({
          from: buyer,
        }).then(() => {
          assert.equal(balanceInEther(seller), sellerBalanceBeforeBeingPaid + FUNDING_AMOUNT);
        });
      })
  })
});

contract('Escrow - Seller attacks', (accounts) => {
  const buyer = accounts[0];
  const seller = accounts[1];

  it('does not allow seller to pay himself with the escrow money', () => {
    let contract = Escrow.deployed();
    return provideFunding(contract, buyer)
      .then(() => {
        const sellerBalanceBeforeAttemptingToStealFunds = balanceInEther(seller);
        return contract.paySeller({
          from: seller
        }).then(() => {
          assert.isAtMost(balanceInEther(seller), sellerBalanceBeforeAttemptingToStealFunds);
        });
      })
  });
});

contract('Escrow - Something with shipping went wrong', (accounts) => {
  const buyer = accounts[0];
  const seller = accounts[1];

  it('allows seller to release funds to buyer', () => {
    let contract = Escrow.deployed();
    return provideFunding(contract, buyer)
      .then(() => {
          const buyerBalanceAfterFunding = balanceInEther(buyer);
          return contract.refundBuyer({
            from: seller,
          }).then(() => {
            assert.equal(balanceInEther(buyer), buyerBalanceAfterFunding + FUNDING_AMOUNT);
          });
        }
      );
  });
});

contract('Escrow - Conflict case - Buyer is to blame', (accounts) => {
  const buyer = accounts[0];
  const seller = accounts[1];
  const moderator = accounts[2];

  it('allows moderator to release funds to seller', () => {
    let contract = Escrow.deployed();
    return provideFunding(contract, buyer)
      .then(() => {
          const buyerBalanceBeforeFunding = balanceInEther(seller);
          return contract.paySeller({
            from: moderator,
          }).then(() => {
            assert.equal(balanceInEther(seller), buyerBalanceBeforeFunding + FUNDING_AMOUNT);
          });
        }
      );
  });
});

contract('Escrow - Conflict case - Seller is to blame', (accounts) => {
  const buyer = accounts[0];
  const moderator = accounts[2];

  it('allows moderator to release funds back to buyer', () => {
    let contract = Escrow.deployed();
    return provideFunding(contract, buyer)
      .then(() => {
          const buyerBalanceAfterFunding = balanceInEther(buyer);
          return contract.refundBuyer({
            from: moderator,
          }).then(() => {
            assert.equal(balanceInEther(buyer), buyerBalanceAfterFunding + FUNDING_AMOUNT);
          });
        }
      );
  });
});
