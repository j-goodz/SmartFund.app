var SmartFundFactory = artifacts.require("./SmartFundFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(SmartFundFactory);
};

