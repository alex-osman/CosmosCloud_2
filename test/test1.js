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

describe("add", function() {
	it("adds two numbers", function() {
		var ten = funcs.add(3, 7);
		expect(ten).to.equal(10);
	})
})

describe("subtract", function() {
	it("subtracts second from first number", function() {
		var ten = funcs.subtract(11, 1);
		expect(ten).to.equal(10);
	})
})

console.log("test1");