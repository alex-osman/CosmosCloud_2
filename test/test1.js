var expect = require('chai').expect;
var funcs = require("../funcs")

describe("Squares", function() {
	describe("Positive squares", function() {
		it("squares a number", function() {
			var five = funcs.square(5);

			expect(five).to.equal(25);
		})
	})
	describe("Negative squares", function() {
		it("squares a number", function() {
			var negfive = funcs.square(-5);
			
			expect(negfive).to.equal(25);
		})
	})
})


console.log("test1");