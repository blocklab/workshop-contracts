pragma solidity ^0.4.6;

contract Splitter {
  function Splitter() payable {
    address first = 0x1a819ba4fcc8fbf6bd0504e5cf93493086e7ad4c;
    address second = 0x58fdefd49b2a20e6ef3deed12efd01c6cacb7972;
    if (!first.send(msg.value / 2)) throw;
    if (!second.send(msg.value / 2)) throw;
  }
}
