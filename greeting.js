export default function Greeting() {
	let username = '';
	let language = '';
	let greeting = '';
	let message = '';
	let greet = {
		'english': 'Hello, ',
		'afrikaans': 'Hallo, ',
		'xhosa': 'Molo, '
	};
	let counter = 0;

	function setName(name) {
		if (!name) {
			setMessage("Enter a name");
		} else {
			username = name.trim();
			return true;
		}
		return false;
	}

	function getName() {
		return username;
	}

	function setLanguage(lang) {
		if (!lang) {
			setMessage("Choose a language");
		} else {
			language = lang.trim();
			return true;
		}
		return false;
	}

	function getLanguage() {
		return language;
	}

	function setGreeting() {
		greeting = greet[language] + getName();
	}

	function getGreeting() {
		const msg = greeting;
		greeting = '';
		return msg;
	}

	function setMessage(msg, type) {
		message = msg;
	}

	function getMessage() {
		const msg = message;
		message = '';
		return msg;
	}
	
	function setCounter() {
		counter++;
	}

	function getCounter() {
		return counter;
	}

	return {
		setName,
		getName,
		setLanguage,
		getLanguage,
		setGreeting,
		getGreeting,
		setMessage,
		getMessage,
		setCounter,
		getCounter
	}
}