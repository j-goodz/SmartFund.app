const chai = require('chai').should();
const smartFundFactory = artifacts.require("SmartFundFactory");

// https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
contract("SmartFundFactory", async accounts => {

	it("Should deploy smartFundFactory", async () => {
		let instance = await smartFundFactory.deployed();
		const sfCount = await instance.smartFundCount.call();
		assert.equal(sfCount, 0, 'Public uint smartFundCount should be 0')
	});
	  
	it("Should create a new SmartFund", async () => {
		let instance = await smartFundFactory.deployed();
		const sfCount = await instance.smartFundCount.call();
		assert.equal(sfCount, 1, 'Public uint smartFundCount should be 1')
		// assert.equal(sfCount, 5, 'Public uint smartFundCount should NOT be 5')
  	});


	it("Should have 3 assets in the SmartFund", async () => {
		let instance = await smartFundFactory.deployed();
		const initReturn = await instance.initNewSmartFund("New SmartFundName", [[1,33],[2,33],[3,34]]);
		const sfDetails = await instance.getSmartFundDetails(1) 
		// const sfDetails = await instance.getSmartFundDetails(5) 
		assert.equal(sfDetails[4], 3, 'Uint assetCount should be 3')
  	});
	
	it("Should have a FundState of Pending (0)", async () => {
		let instance = await smartFundFactory.deployed();
		const initReturn = await instance.initNewSmartFund("New SmartFundName", [[1,33],[2,33],[3,34]]);
		const sfDetails = await instance.getSmartFundDetails(1) 
		// const sfDetails = await instance.getSmartFundDetails(5) 
		assert.equal(sfDetails[5], 0, 'Uint FundState should be Pending (0)')
  	});


	  it("Should have a SmartFund name", async () => {
		let instance = await smartFundFactory.deployed();
		const initReturn = await instance.initNewSmartFund("New SmartFundName", [[1,33],[2,33],[3,34]]);
		const sfDetails = await instance.getSmartFundDetails(1) 
		// const sfDetails = await instance.getSmartFundDetails(5) 
		assert.equal(sfDetails[1], "New SmartFundName", "SmartFund name should be New SmartFundName")
  	});


	//   it("Should have 3 assets in the test SmartFund", async () => {
	// 	let instance = await smartFundFactory.deployed();
	// 	const initReturn = await instance.initNewSmartFund("New SmartFundName", [[1,33],[2,33],[3,34]]);
	// 	const sfCount = await instance.smartFundCount.call();
	// 	// const assetCount = await instance.smartFundContracts(1).assetCount.call();

	// 	const sfDetails = await instance.getSmartFundDetails(5) 
	// 	// console.log("sfDetails = ", sfDetails)
	// 	// console.log("sfDetails asset count = ", sfDetails[4]) // 4 = asset count

	// 	// console.log("initReturn = ", initReturn)
	// 	console.log("sfCount = ", sfCount)
	// 	// assert.equal(sfCount, 1, 'Public uint smartFundCount should be 1')
  	// });



});


