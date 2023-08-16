export default function Greeting(db) {
	let username = '';
	let language = '';
	let error = '';
	let greeting = {
		'english': 'Hello, ',
		'afrikaans': 'Hallo, ',
		'xhosa': 'Molo, '
	};
	let greetedUsers = [];
	let last = ['/'];
	let curr = 0;

	function setName(name) {
		username = '';
		name = name.trim();
		if (!name) {
			error = "Enter a name";
		} else if (!isName(name)) {
			error = "Name is invalid";
		} else {
			username = name.charAt(0).toUpperCase() + name.slice(1);
		}
	}

	function getName() {
		return username;
	}

	function setLanguage(lang) {
		language = '';
		if (!username && !lang) {
			error = "Enter name and Select language";
		} else if (!lang) {
			error = "Select a language";
		} else {
			language = lang;
		}
	}

	function getLanguage() {
		return language;
	}

	function getGreeting() {
		if (username && language) {
			return greeting[language] + username;
		}
		return '';
	}

	function getErrorMessage() {
		const message = error;
		error = '';
		return message;
	}

	function getUsers() {
		return greetedUsers;
	}

	function getUserCount() {
		return greetedUsers.length;
	}

	function getGreetCount(name) {
		const user = greetedUsers.find(user => user.username === name);
		return user ? user.count : 0;
	}

	function resetNames() {
		username = '';
		language = '';
		error = '';
		greetedUsers = [];
	}

	function isName(name) {
		return /^[a-zA-Z]+((-| )[a-zA-Z]+)?$/.test(name);
	}

	function hasBeenGreeted(name) {
		if (greetedUsers.some(user => user.username === name)) {
			return true;
		}
		return false;
	}

	function addName() {
		if (!greetedUsers.some(user => user.username === username)) {
			greetedUsers.push({
				username: username,
				count: 1
			});
		} else {
			greetedUsers[greetedUsers.findIndex(user => user.username === username)].count++;
		}
	}

	return {
		setName,
		setLanguage,
		getGreeting,
		getErrorMessage,
		getUsers,
		getUserCount,
		getGreetCount,
		resetNames,
		getName,
		getLanguage,
		addName,
		hasBeenGreeted,
		isName
	}
}