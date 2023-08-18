export default function Greeting(db, schema) {
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
		const query = `SELECT username FROM ${schema}.greetedusers`;
		return await db.manyOrNone(query);
	}

	async function getUserData(name) {
		const query = `SELECT * FROM ${schema}.greetedusers WHERE username = '${name}'`;
		return await db.oneOrNone(query)
	}

	async function getUserCount() {
		const query = `SELECT count(*) FROM ${schema}.greetedusers`;
		return (await db.one(query)).count;
	}

	async function getGreetCount(name, lang) {
		const query = `SELECT * FROM ${schema}.greetedusers WHERE username = '${name}'`;
		const userData = await db.oneOrNone(query);

		let count = 0;
		if (userData) {
			if (lang) {
				count = userData[lang];
			} else {
				count = userData.english + userData.afrikaans + userData.xhosa;
			}
		}
		return count;
	}

	async function resetNames() {
		username = '';
		language = '';
		error = '';
		const query = `TRUNCATE TABLE ${schema}.greetedusers`;
		await db.none(query);
	}

	async function hasBeenGreeted() {
		const query = `SELECT id FROM ${schema}.greetedusers WHERE username = '${getName()}'`;
		if (await db.oneOrNone(query)) {
			return true;
		}
		return false;
	}

	async function addName() {
		if (await hasBeenGreeted()) {
			const query = `UPDATE ${schema}.greetedusers SET ${getLanguage()} = ${getLanguage()} + 1 WHERE username = '${getName()}'`;
			await db.none(query);
		} else {
			const eng = getLanguage() === 'english' ? 1 : 0;
			const afr = getLanguage() === 'afrikaans' ? 1 : 0;
			const xho = getLanguage() === 'xhosa' ? 1 : 0;
			const query = `INSERT INTO ${schema}.greetedusers(username, english, afrikaans, xhosa) VALUES ('${getName()}', ${eng}, ${afr}, ${xho})`;
			await db.none(query);
		}
	}

	return {
		setName,
		setLanguage,
		getGreeting,
		getErrorMessage,
		getUsers,
		getUserData,
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