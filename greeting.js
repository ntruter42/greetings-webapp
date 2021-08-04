export default function Greeting() {
	let name = '';
	let greeting = '';
	let greet = {
		'english': 'Hello, ',
		'afrikaans': 'Hallo, ',
		'xhosa': 'Molo, '
	};
	let message = {
		'text': '',
		'type': 'hidden'
	};

	function setName(input) {
		if (input === '') {
			setMessage("Enter a name", "error");
		} else {
			name = input.trim();
			return true;
		}
		return false;
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

	function setMessage(msg, type) {
		message.text = msg;
		message.type = type;
	}

	function getMessage() {
		const msg = JSON.parse(JSON.stringify(message));
		message.text = '';
		message.type = 'hidden';
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