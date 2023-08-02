export default function Greeting() {
	let name = '';
	let message = '';
	let greet = {
		'english': 'Hello, ',
		'afrikaans': 'Hallo, ',
		'xhosa': 'Molo, '
	};

	function setName(input) {
		name = input.trim();
	}

	function getName() {
		return name;
	}

	function setMessage(language) {
		message = greet[language] + getName();
	}

	function getMessage() {
		return message;
	}

	return {
		setName,
		getName,
		setMessage,
		getMessage
	}
}