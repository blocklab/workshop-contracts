pragma solidity ^0.4.2;

contract Escrow {
  address seller;
  address buyer;
  address moderator;

  function Escrow(address _seller, address _buyer, address _moderator) {
    seller = _seller;
    buyer = _buyer;
    moderator = _moderator;
  }

  function fund() payable {
  }

  function paySeller() {
    if (msg.sender == buyer || msg.sender == moderator)
      if (!seller.send(this.balance)) throw;
  }

  function refundBuyer() {
    if (msg.sender == seller || msg.sender == moderator)
      if (!buyer.send(this.balance)) throw;
  }
}
