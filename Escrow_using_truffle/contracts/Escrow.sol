pragma solidity ^0.4.2;

contract Escrow {
  address seller;
  address buyer;
  address moderator;

  function Escrow(address _seller, address _moderator) {
    seller = _seller;
    buyer = msg.sender;
    moderator = _moderator;
  }

  function() payable {
  }

  function paySeller() {
    if (msg.sender != buyer) throw;
    if (!seller.send(this.balance)) throw;
  }

  function refundBuyer() {
    if (msg.sender == seller || msg.sender == moderator)
      if (!buyer.send(this.balance)) throw;
  }
}
