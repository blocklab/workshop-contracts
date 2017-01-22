pragma solidity ^0.4.2;

contract Escrow {
  address seller;
  address buyer;

  function Escrow(address _seller) {
    seller = _seller;
    buyer = msg.sender;
  }

  function() payable {
  }

  function paySeller() {
    if (msg.sender != buyer) throw;
    if (!seller.send(this.balance)) throw;
  }
}
