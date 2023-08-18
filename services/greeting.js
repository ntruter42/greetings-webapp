export default function Greeting(db, schema, greet) {
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
		greet.setName('');
		greet.setLanguage('');
		greet.setErrorMessage('');
		const query = `TRUNCATE TABLE ${schema}.greetedusers`;
		await db.none(query);
	}

	async function hasBeenGreeted() {
		const query = `SELECT id FROM ${schema}.greetedusers WHERE username = '${greet.getName()}'`;
		if (await db.oneOrNone(query)) {
			return true;
		}
		return false;
	}

	async function addName() {
		if (await hasBeenGreeted()) {
			const query = `UPDATE ${schema}.greetedusers SET ${greet.getLanguage()} = ${greet.getLanguage()} + 1 WHERE username = '${greet.getName()}'`;
			await db.none(query);
		} else {
			const eng = greet.getLanguage() === 'english' ? 1 : 0;
			const afr = greet.getLanguage() === 'afrikaans' ? 1 : 0;
			const xho = greet.getLanguage() === 'xhosa' ? 1 : 0;
			const query = `INSERT INTO ${schema}.greetedusers(username, english, afrikaans, xhosa) VALUES ('${greet.getName()}', ${eng}, ${afr}, ${xho})`;
			await db.none(query);
		}
	}

	return {
		getUsers,
		getUserData,
		getUserCount,
		getGreetCount,
		resetNames,
		addName,
		hasBeenGreeted
	}
}