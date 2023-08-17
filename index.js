import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import flash from "express-flash";
import session from "express-session";
import promise from "pg-promise";
import dotenv from "dotenv";
import Greeting from "./greeting.js";

const app = express();

app.engine('handlebars', engine({
	defaultLayout: 'main',
	viewPath: './views',
	layoutsDir: './views/layouts'
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
	secret: "secret42",
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}));
app.use(flash());

dotenv.config({ path: './config.env' });
const pgp = promise();
const config = {
	connectionString: process.env.DB_URL,
	ssl: {
		rejectUnauthorized: false
	}
}
const db = pgp(config);
const greeting = Greeting(db);

// ---------- Index Route ---------- //
app.get('/', async function (req, res) {
	const message = greeting.getGreeting();
	const error = req.flash('error')[0];
	const count = await greeting.getUserCount();
	const last = greeting.getLast();

	res.render('index', {
		message: message,
		error: error,
		count: count,
		last: last
	});
});
// TODO: add a last visited link

// ---------- Greet Route ---------- //
app.post('/greetings', async function (req, res) {
	greeting.setName(req.body.name);
	greeting.setLanguage(req.body.language);

	if (greeting.getName() && greeting.getLanguage()) {
		// await greeting.getUsers();
		await greeting.addName();
		greeting.setLast();
	}

	req.flash('error', greeting.getErrorMessage());

	res.redirect('/');
})

// ---------- Reset Route ---------- //
app.post('/reset', async function (req, res) {
	await greeting.resetNames();
	res.redirect('/');
})

app.post('/reset-greeted', async function (req, res) {
	await greeting.resetNames();
	res.redirect('/greeted');
})

// ---------- Greeted Route ---------- //
app.get('/greeted', async function (req, res) {
	const users = await greeting.getUsers();
	const count = await greeting.getUserCount();
	const empty = await greeting.getUserCount() == 0 ? true : false;
	console.log(await greeting.getUserCount());
	const last = greeting.getLast();

	res.render('greeted', {
		users: users,
		count: count,
		empty: empty,
		last: last
	});
});

// ---------- User Route ---------- //
app.get('/counter/:username', async function (req, res) {
	const username = req.params.username;
	const count = await greeting.getGreetCount(req.params.username);
	const plural = await greeting.getGreetCount(req.params.username) === 1 ? '' : 's';
	const last = greeting.getLast();

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
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
	console.log(`App started on PORT: ${PORT}`);
});