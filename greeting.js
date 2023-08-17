export default function Greeting(db) {
	let username = '';
	let language = '';
	let error = '';
	let last = '';
	let greeting = {
		'english': 'Hello, ',
		'afrikaans': 'Hallo, ',
		'xhosa': 'Molo, '
	};

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

	function isName(name) {
		return /^[a-zA-Z]+((-| )[a-zA-Z]+)?$/.test(name);
	}

	function setLast() {
		last = getName();
	}

	function getLast() {
		return last;
	}

	async function getUsers() {
		return await db.manyOrNone('SELECT username FROM greeting.greetedusers');
	}

	async function getUserCount() {
		return (await db.one('SELECT count(*) FROM greeting.greetedusers')).count;
	}

	async function getGreetCount(name, lang) {
		const userData = await db.oneOrNone('SELECT * FROM greeting.greetedusers WHERE username = $1', [name]);

		let count = 0;
		if (lang) {
			count = userData[lang];
		} else {
			count = userData.english + userData.afrikaans + userData.xhosa;
		}
		return count;
	}

	async function resetNames() {
		username = '';
		language = '';
		error = '';
		await db.none('TRUNCATE TABLE greeting.greetedusers');
	}

	async function hasBeenGreeted() {
		if (await db.oneOrNone('SELECT id FROM greeting.greetedusers WHERE username = $1', [getName()])) {
			return true;
		}
		return false;
	}

	async function addName() {
		if (await hasBeenGreeted()) {
			const query = `UPDATE greeting.greetedusers SET ${getLanguage()} = ${getLanguage()} + 1 WHERE username = '${getName()}'`;
			await db.none(query);
		} else {
			const eng = getLanguage() === 'english' ? 1 : 0;
			const afr = getLanguage() === 'afrikaans' ? 1 : 0;
			const xho = getLanguage() === 'xhosa' ? 1 : 0;
			const query = `INSERT INTO greeting.greetedusers(username, english, afrikaans, xhosa) VALUES ('${getName()}', ${eng}, ${afr}, ${xho})`;
			await db.none(query);
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
		isName,
		setLast,
		getLast
	}
}