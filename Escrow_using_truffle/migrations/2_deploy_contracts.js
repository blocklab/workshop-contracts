module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.autolink();
  deployer.deploy(Escrow, '0xe484b9a8721141f8f70ca5cc36fd506a11b631e2');
};
