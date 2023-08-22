export default function () {
	let username = '';
	let language = '';
	let error = '';
	let greeting = {
		'english': 'Hello, ',
		'afrikaans': 'Hallo, ',
		'xhosa': 'Molo, '
	};

	function setName(name) {
		username = '';
		name = name.trim();
		if (!name) {
			setErrorMessage("Enter a name");
		} else if (!isName(name)) {
			setErrorMessage("Name is invalid");
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
			setErrorMessage("Enter name and Select language");
		} else if (!lang) {
			setErrorMessage("Select a language");
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

	function setErrorMessage(message) {
		error = message;
	}

	function getErrorMessage() {
		const message = error;
		setErrorMessage('');
		return message;
	}

	function isName(name) {
		return /^[a-zA-Z]+((-| )[a-zA-Z]+)?$/.test(name);
	}

	return {
		setName,
		getName,
		setLanguage,
		getLanguage,
		getGreeting,
		setErrorMessage,
		getErrorMessage,
		isName
	}
}