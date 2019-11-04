const chai = require('chai').should();
const smartFundFactory = artifacts.require("SmartFundFactory");

contract("SmartFundFactory", async accounts => {

	it("Should deploy smartFundFactory", async () => {

		// https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
		// console.log(smartFundFactory)
		// const initlized = await smartFundFactory.initNewSmartFund("New SmartFundName", [[1,33],[2,33],[3,34]]);
		let instance = await smartFundFactory.deployed();
		
		const sfCount = await instance.smartFundCount.call();
		
		console.log("Should deploy smartFundFactory: sfCount = ", sfCount)
		assert.equal(sfCount, 0, 'Public uint smartFundCount should be 0')

	  });
	  
	it("Should create a new SmartFund", async () => {

		let instance = await smartFundFactory.deployed();
		
		const sfCount = await instance.smartFundCount.call();
		const initReturn = await instance.initNewSmartFund("New SmartFundName", [[1,33],[2,33],[3,34]]);
		

		console.log("initReturn = ", initReturn)
		console.log("sfCount = ", sfCount)
		assert.equal(sfCount, 5, 'Public uint smartFundCount should be 1')

  	});
});


