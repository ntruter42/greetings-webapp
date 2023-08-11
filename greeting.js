export default function Greeting(db) {
	let username = '';
	let language = '';
	let message = '';
	let greeting = {
		'english': 'Hello, ',
		'afrikaans': 'Hallo, ',
		'xhosa': 'Molo, '
	};
	let greetedUsers = [];

	function setName(name) {
		message = '';
		username = name.trim();
		if (username) {
			return true;
		}
		return false;
	}

	function getName() {
		return username;
	}

	function setLanguage(lang) {
		language = lang;
		if (language) {
			return true;
		}
		return false;
	}

	function getLanguage() {
		return language;
	}

	function setGreeting() {
		if (!greetedUsers.some(user => user.username === username)) {
			greetedUsers.push({
				username: username,
				count: 1
			});
		} else {
			greetedUsers[greetedUsers.findIndex(user => user.username === username)].count++;
		}
		message = greeting[language] + username;
	}

	function getGreeting() {
		return message;
	}

	function getUsers() {
		return greetedUsers;
	}

	function getCount() {
		return greetedUsers.length;
	}

	function getUserCount(name) {
		const user = greetedUsers.find(user => user.username === name);
		return user ? user.count : 0;
	}

	function reset() {
		username = '';
		language = '';
		message = '';
		greetedUsers = [];
	}

	function isName(name) {
		return /^[a-zA-Z]+((-| )[a-zA-Z]+)?$/.test(name);
	}

	function addName() {
		return;
	}

	function hasBeenGreeted() {
		if (greetedUsers.some(user => user.username === username)) {
			return true;
		}
		return false;
	}

	return {
		setName,
		setLanguage,
		setGreeting,
		getGreeting,
		getUsers,
		getCount,
		getUserCount,
		reset,
		getName,
		getLanguage,
		addName,
		hasBeenGreeted,
		isName
	}
}