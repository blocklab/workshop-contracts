pragma solidity ^0.4.2;

contract Escrow {
  address seller;

  function Escrow(address _seller) {
    seller = _seller;
  }

  function() payable {
  }

  function paySeller() {
    if (!seller.send(this.balance)) throw;
  }
}
