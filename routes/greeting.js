export default function (greeting, app) {

	async function home(req, res) {
		const message = app.getGreeting();
		const error = req.flash('error')[0];
		const count = await greeting.getUserCount();

		res.render('index', {
			message,
			error,
			count,
		});
	};

	async function greeted(req, res) {
		const users = await greeting.getUsers();
		const count = await greeting.getUserCount();
		const empty = count === 0 ? true : false;

		res.render('greeted', {
			users,
			count,
			empty
		});
	};

	async function counter(req, res) {
		const username = req.params.username;
		const user_data = await greeting.getGreetCount(req.params.username);

		const count = user_data.count;
		const plural = count === 1 ? '' : 's';
		const eng_count = user_data.english;
		const eng_plural = eng_count === 1 ? '' : 's';
		const afr_count = user_data.afrikaans;
		const afr_plural = afr_count === 1 ? '' : 's';
		const xho_count = user_data.xhosa;
		const xho_plural = xho_count === 1 ? '' : 's';

		res.render('counter', {
			username,
			count,
			plural,
			eng_count,
			eng_plural,
			afr_count,
			afr_plural,
			xho_count,
			xho_plural
		});
	};

	async function greetings(req, res) {
		app.setName(req.body.name);
		app.setLanguage(req.body.language);

		if (app.getName() && app.getLanguage()) {
			await greeting.addName();
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