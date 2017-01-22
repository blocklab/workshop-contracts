module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.autolink();
  deployer.deploy(Escrow, '0xdf700fd0413ca5772cbf5a588d3080469f2edda2');
};
