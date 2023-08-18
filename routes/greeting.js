export default function (greeting, app) {

	async function home(req, res) {
		const message = app.getGreeting();
		const error = req.flash('error')[0];
		const count = await greeting.getUserCount();
		const last = app.getLast();

		res.render('index', {
			message: message,
			error: error,
			count: count,
			last: last
		});
	};

	async function greeted(req, res) {
		const users = await greeting.getUsers();
		const count = await greeting.getUserCount();
		const empty = await greeting.getUserCount() == 0 ? true : false;
		const last = app.getLast();

		res.render('greeted', {
			users: users,
			count: count,
			empty: empty,
			last: last
		});
	};

	async function counter(req, res) {
		const username = req.params.username;
		const count = await greeting.getGreetCount(req.params.username);
		const plural = await greeting.getGreetCount(req.params.username) === 1 ? '' : 's';
		const last = app.getLast();

		const engCount = await greeting.getGreetCount(req.params.username, 'english');
		const engPlural = await greeting.getGreetCount(req.params.username, 'english') === 1 ? '' : 's';
		const afrCount = await greeting.getGreetCount(req.params.username, 'afrikaans');
		const afrPlural = await greeting.getGreetCount(req.params.username, 'afrikaans') === 1 ? '' : 's';
		const xhoCount = await greeting.getGreetCount(req.params.username, 'xhosa');
		const xhoPlural = await greeting.getGreetCount(req.params.username, 'xhosa') === 1 ? '' : 's';

		res.render('counter', {
			username: username,
			count: count,
			plural: plural,
			english: engCount,
			engPlural: engPlural,
			afrikaans: afrCount,
			afrPlural: afrPlural,
			xhosa: xhoCount,
			xhoPlural: xhoPlural,
			last: last
		});
	};

	async function greetings(req, res) {
		app.setName(req.body.name);
		app.setLanguage(req.body.language);

		if (app.getName() && app.getLanguage()) {
			await greeting.addName();
			app.setLast();
		}

		req.flash('error', app.getErrorMessage());

		res.redirect('/');
	};

	async function reset(req, res) {
		await greeting.resetNames();
		res.redirect('/');
	}

	async function resetGreeted(req, res) {
		await greeting.resetNames();
		res.redirect('/greeted');
	}

	return {
		home,
		greeted,
		counter,
		greetings,
		reset,
		resetGreeted
	}
}