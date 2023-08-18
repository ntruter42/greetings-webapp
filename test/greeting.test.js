import assert from 'assert'
import Database from '../services/database.js';
import Greeting from '../services/greeting.js';
import Greet from '../applications/greet.js';

describe('Greeting', async function () {
	let greeting, greet;
	let database = Database();
	this.timeout(6000);

	beforeEach(async function () {
		greet = Greet();
		greeting = Greeting(database, 'test', greet);
		await greeting.resetNames();
	});

	describe('addName, getUserData', function () {
		it('should be able to set a name in database and return data for given username', async function () {
			try {
				greet.setName("Nicholas");
				greet.setLanguage("english");
				await greeting.addName();

				const expected = {
					username: "Nicholas",
					english: 1,
					afrikaans: 0,
					xhosa: 0
				}
				const userData = await greeting.getUserData("Nicholas");
				assert.equal(expected.username, userData.username);
				assert.equal(expected.english, userData.english);
				assert.equal(expected.afrikaans, userData.afrikaans);
				assert.equal(expected.xhosa, userData.xhosa);
			} catch (error) {
				throw error;
			}
		});

		it('should be able to set multiple names in database and return data for each given username', async function () {
			try {
				greet.setName("Nicholas");
				greet.setLanguage("english");
				await greeting.addName();

				const expected1 = {
					username: "Nicholas",
					english: 1,
					afrikaans: 0,
					xhosa: 0
				}
				const userData1 = await greeting.getUserData("Nicholas");
				assert.equal(expected1.username, userData1.username);
				assert.equal(expected1.english, userData1.english);
				assert.equal(expected1.afrikaans, userData1.afrikaans);
				assert.equal(expected1.xhosa, userData1.xhosa);

				greet.setName("Keziah");
				greet.setLanguage("afrikaans");
				await greeting.addName();

				const expected2 = {
					username: "Keziah",
					english: 0,
					afrikaans: 1,
					xhosa: 0
				}
				const userData2 = await greeting.getUserData("Keziah");
				assert.equal(expected2.username, userData2.username);
				assert.equal(expected2.english, userData2.english);
				assert.equal(expected2.afrikaans, userData2.afrikaans);
				assert.equal(expected2.xhosa, userData2.xhosa);
			} catch (error) {
				throw error;
			}
		});
	});

	describe('getUsers', function () {
		it('should be get a list of usernames as objects', async function () {
			try {
				greet.setName("Nicholas");
				greet.setLanguage("xhosa");
				await greeting.addName();

				greet.setName("Keziah");
				greet.setLanguage("afrikaans");
				await greeting.addName();

				assert.deepEqual([{ username: "Nicholas" }, { username: "Keziah" }], await greeting.getUsers());
			} catch (error) {
				throw error;
			}
		});

		it('should return an empty array if there are no users', async function () {
			try {
				assert.deepEqual([], await greeting.getUsers());
			} catch (error) {
				throw error;
			}
		});
	});

	describe('getUserCount', function () {
		it('should be able to count the number of users in the database for a single user', async function () {
			try {
				greet.setName("Nicholas");
				greet.setLanguage("english");
				await greeting.addName();

				assert.equal(1, await greeting.getUserCount());
			} catch (error) {
				throw error;
			}
		});

		it('should be able to count the number of users in the database for multiple users', async function () {
			try {
				greet.setName("Nicholas");
				greet.setLanguage("english");
				await greeting.addName();

				greet.setName("Keziah");
				greet.setLanguage("afrikaans");
				await greeting.addName();

				assert.equal(2, await greeting.getUserCount());
			} catch (error) {
				throw error;
			}
		});

		it('should be able to count the number of users in the database for no users', async function () {
			try {
				assert.equal(0, await greeting.getUserCount());
			} catch (error) {
				throw error;
			}
		});
	});

	describe('hasBeenGreeted', function () {
		it('should be able to check if a user has been greeted', async function () {
			try {
				greet.setName("Nicholas");
				greet.setLanguage("english");
				await greeting.addName();

				assert.equal(true, await greeting.hasBeenGreeted());
			} catch (error) {
				throw error;
			}
		});

		it('should be able to check if a user has not been greeted', async function () {
			try {
				greet.setName("Nicholas");

				assert.equal(false, await greeting.hasBeenGreeted());
			} catch (error) {
				throw error;
			}
		});
	});

	describe('getGreetCount', function () {
		it('should be able to count the number of times a user has been greeted', async function () {
			try {
				greet.setName("Nicholas");
				greet.setLanguage("english");
				await greeting.addName();

				assert.equal(1, await greeting.getGreetCount("Nicholas"));
			} catch (error) {
				throw error;
			}
		});

		it('should be able to count more than 1 greeting for a user', async function () {
			try {
				greet.setName("Nicholas");
				greet.setLanguage("english");
				await greeting.addName();
				await greeting.addName();
				await greeting.addName();

				assert.equal(3, await greeting.getGreetCount("Nicholas"));
			} catch (error) {
				throw error;
			}
		});

		it('should be able to count the number of times a user has been greeted in a specific language', async function () {
			try {
				greet.setName("Nicholas");
				greet.setLanguage("afrikaans");
				await greeting.addName();
				await greeting.addName();

				assert.equal(2, await greeting.getGreetCount("Nicholas", "afrikaans"));
			} catch (error) {
				throw error;
			}
		});

		it('should be able to count the number of times a user has been greeted in different languages', async function () {
			try {
				greet.setName("Nicholas");
				greet.setLanguage("afrikaans");
				await greeting.addName();

				greet.setLanguage("english");
				await greeting.addName();
				await greeting.addName();
				await greeting.addName();

				assert.equal(1, await greeting.getGreetCount("Nicholas", "afrikaans"));
				assert.equal(3, await greeting.getGreetCount("Nicholas", "english"));
			} catch (error) {
				throw error;
			}
		});

		it('should return 0 if a user does not exist', async function () {
			try {
				assert.equal(0, await greeting.getGreetCount("Keziah"));
			} catch (error) {
				throw error;
			}
		});
	});

	describe('getGreetCount', function () {
		it('should be able to count if a single user has been greeted', async function () {
			try {
				greet.setName("Nicholas");
				greet.setLanguage("english");
				await greeting.addName();

				assert.equal(1, await greeting.getUserCount());
			} catch (error) {
				throw error;
			}
		});

		it('should be able to count the number of users that have been greeted', async function () {
			try {
				greet.setName("Nicholas");
				greet.setLanguage("english");
				await greeting.addName();

				greet.setName("Keziah");
				greet.setLanguage("english");
				await greeting.addName();

				assert.equal(2, await greeting.getUserCount());
			} catch (error) {
				throw error;
			}
		});

		it('should not count a single user more than once if greeted multiple times', async function () {
			try {
				greet.setName("Nicholas");
				greet.setLanguage("english");
				await greeting.addName();
				await greeting.addName();
				await greeting.addName();

				assert.equal(1, await greeting.getUserCount());
			} catch (error) {
				throw error;
			}
		});
	});

	describe('resetNames', function () {
		it('should reset greeted users', async function () {
			try {
				greet.setName("Nicholas");
				greet.setLanguage("xhosa");
				await greeting.addName();

				assert.equal(1, await greeting.getUserCount());

				await greeting.resetNames();

				assert.equal(0, await greeting.getUserCount());
			} catch (error) {
				throw error;
			}
		});
	});
});