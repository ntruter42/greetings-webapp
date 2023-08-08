export default function Greeting() {
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
		if (!name) {
			username = '';
		} else {
			username = name.trim();
			return true;
		}
		return false;
	}

	function setLanguage(lang) {
		if (!lang) {
			language = ''
		} else {
			language = lang.trim();
			return true;
		}
		return false;
	}

	function getGreeting() {
		if (!greetedUsers.includes(username)) {
			greetedUsers.push(username);
		}

		if (language && username) {	
			return greeting[language] + username;
		}
	}

	function getCount() {
		return greetedUsers.length;
	}

	return {
		setName,
		setLanguage,
		getGreeting,
		getCount
	}
}