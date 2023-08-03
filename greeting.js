export default function Greeting() {
	let name = '';
	let greeting = '';
	let greet = {
		'english': 'Hello, ',
		'afrikaans': 'Hallo, ',
		'xhosa': 'Molo, '
	};
	let message = '';

	function setName(input) {
		if (input === '') {
			
		}
		name = input.trim();
	}

	function getName() {
		return name;
	}

	function setGreeting(language) {
		greeting = greet[language] + getName();
	}

	function getGreeting() {
		return greeting;
	}

	function setMessage(text) {
		message = text;
	}

	function getMessage() {
		const msg = message;
		return msg;
	}

	return {
		setName,
		getName,
		setGreeting,
		getGreeting,
		setMessage,
		getMessage
	}
}