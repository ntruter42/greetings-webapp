import assert from 'assert'
import Database from '../services/database.js';
import Greeting from '../services/greeting.js';

describe('Greeting', function () {
	let greeting;
	let database = Database();

	beforeEach(function () {
		greeting = Greeting(db);
		greeting.resetNames();
	});
});