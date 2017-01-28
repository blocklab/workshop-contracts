pragma solidity ^0.4.6;

contract Splitter {
  function Splitter() payable {
    address first = 0xdf700fd0413ca5772cbf5a588d3080469f2edda2;
    address second = 0x354990de9386772900c6b257ec0b8dcc5af8bfba;
    if (!first.send(msg.value / 2)) throw;
    if (!second.send(msg.value / 2)) throw;
  }
}
