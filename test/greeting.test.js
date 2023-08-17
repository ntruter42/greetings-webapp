import assert from 'assert'
import Greeting from '../greeting.js';

describe('Greeting', function () {
	let greet;

	beforeEach(function () {
		greet = Greeting();
		greet.resetNames();
	});
});