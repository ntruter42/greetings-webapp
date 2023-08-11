import assert from 'assert'
import Greeting from '../greeting.js';

describe('Greeting', function () {
	let greet;

	beforeEach(function () {
		greet = Greeting();
		greet.reset();
	});

	describe('setName', function () {
		it('should set the name to "Nicholas"', function () {
			greet.setName('Nicholas');

			assert.equal(greet.getName(), 'Nicholas');
		});

		it('should set the name to "Terri"', function () {
			greet.setName('Terri');

			assert.equal(greet.getName(), 'Terri');
		});

		it('should trim the name before setting it', function () {
			greet.setName('  Bob  ');

			assert.equal(greet.getName(), 'Bob');
		});
	});

	describe('addName', function () {
		it('should add the name "Nicholas" to the greeted names', function () {
			greet.setName('Nicholas');
			greet.addName();

			assert.equal(greet.hasBeenGreeted(), true);
		});

		it('should add the name "Terri" to the greeted names', function () {
			greet.setName('Terri');
			greet.addName();

			assert.equal(greet.hasBeenGreeted(), true);
		});

		it('should increment the count for the name "Nicholas" only once', function () {
			greet.setName('Nicholas');
			greet.addName();
			greet.addName();

			assert.equal(greet.getCount(), 1);

			assert.equal(greet.hasBeenGreeted(), true);
		});

		it('should add a name to the greeted names object', function () {
			greet.setName('Eve');
			greet.addName();

			assert.equal(greet.hasBeenGreeted(), true);
		});

		it('should not increment the count for a name that has already been greeted', function () {
			greet.setName('Eve');
			greet.addName();
			let countBefore = greet.getCount();
			greet.addName();

			assert.equal(greet.getCount(), countBefore);
		});
	});

	describe('setNames', function () {
		it('should set the greeted names to {Nicholas: 1, Terri: 2}', function () {
			const names = { Nicholas: 1, Terri: 2 };
			greet.setNames(names);

			assert.equal(greet.getCount(), 2);
		});

		it('should set the greeted names object to a new object', function () {
			greet.setName('Frank');
			greet.addName();
			let newNames = { 'Grace': 2, 'Hannah': 1 };
			greet.setNames(newNames);

			assert.deepEqual(greet.getCount(), Object.keys(newNames).length);
		});
	});

	describe('getAllNames', function () {
		it('should return an empty object if no names have been greeted', function () {
			const greet = Greet();
			const allNames = greet.getAllNames();

			assert.deepEqual(allNames, {});
		});

		it('should return an object with all greeted names and their count', function () {
			const greet = Greet();
			greet.setName("John");
			greet.addName();
			greet.setName("Jane");
			greet.addName();
			const allNames = greet.getAllNames();

			assert.deepEqual(allNames, { john: 1, jane: 1 });
		});
	});

	describe('resetNames', function () {
		it('should reset the greeted names to an empty object', function () {
			greet.setName('Nicholas');
			greet.addName();
			greet.resetNames();

			assert.equal(greet.getCount(), 0);
		});

		it('should clear the greeted names object and local storage', function () {
			greet.setName('Isaac');
			greet.addName();
			greet.resetNames();

			assert.equal(greet.getCount(), 0);
		});
	});

	describe('setMessage', function () {
		it('should set the message to "Hello, Nicholas" in English', function () {
			greet.setName('Nicholas');
			greet.setMessage('english');

			assert.equal(greet.getMessage(), 'Hello, Nicholas');
		});

		it('should set the message to "Hallo, Terri" in Afrikaans', function () {
			greet.setName('Terri');
			greet.setMessage('afrikaans');

			assert.equal(greet.getMessage(), 'Hallo, Terri');
		});

		it('should set the message to "Molo, Mthunzi" in Xhosa', function () {
			greet.setName('Mthunzi');
			greet.setMessage('xhosa');

			assert.equal(greet.getMessage(), 'Molo, Mthunzi');
		});
	});

	describe('getCount', function () {
		it('should return the number of unique names that have been greeted', function () {
			greet.setName('David');
			greet.addName();
			greet.setName('Emily');
			greet.addName();

			assert.equal(greet.getCount(), 2);
		});

		it('should return the number of unique names that have been greeted', function () {
			greet.setName('David Attenborough');
			greet.addName();
			greet.setName('Emily');
			greet.addName();

			assert.equal(greet.getCount(), 2);
		});
	});

	describe('hasBeenGreeted', function () {
		it('should return false when a name has not been greeted', function () {
			greet.setName('Charlie');

			assert.equal(greet.hasBeenGreeted(), false);
		});

		it('should return true when a name has been greeted', function () {
			greet.setName('Delta');
			greet.addName();

			assert.equal(greet.hasBeenGreeted(), true);
		});
	});

	describe('isName', function () {
		it('should return true for the name "Nicholas Truter"', function () {
			assert.equal(greet.isName('Nicholas Truter'), true);
		});

		it('should return false for the name "1234"', function () {
			assert.equal(greet.isName('1234'), false);
		});

		it('should return false for the name "malebo25"', function () {
			assert.equal(greet.isName('malebo25'), false);
		});

		it('should return true for the name "Leigh-Anne"', function () {
			assert.equal(greet.isName('Leigh-Anne'), true);
		});

		it("should return false for a name containing a symbol", function () {
			assert.equal(greet.isName("ma!ary"), false);
		});
	});
});