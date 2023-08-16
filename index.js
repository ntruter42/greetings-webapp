import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import flash from "express-flash";
import session from "express-session";
// import promise from "pg-promise";
// import dotenv from "dotenv";
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

// dotenv.config({ path: './config.env' });
// const pgp = promise();
// const db = pgp(process.env.DB_URL);

const greeting = Greeting();

// ---------- Index Route ---------- //
app.get('/', function (req, res) {
	const message = greeting.getGreeting();
	const error = req.flash('error')[0];
	const count = greeting.getUserCount();

	res.render('index', {
		message: message,
		error: error,
		count: count
	});
});

// ---------- Greet Route ---------- //
app.post('/greetings', function (req, res) {
	greeting.setName(req.body.name);
	greeting.setLanguage(req.body.language);

	if (greeting.getName() && greeting.getLanguage()) {
		greeting.addName();
	}

	req.flash('error', greeting.getErrorMessage());

	res.redirect('/');
})

// ---------- Reset Route ---------- //
app.post('/reset', function (req, res) {
	greeting.resetNames();
	res.redirect('/');
})

app.post('/reset-greeted', function (req, res) {
	greeting.resetNames();
	res.redirect('/greeted');
})

// ---------- Greeted Route ---------- //
app.get('/greeted', function (req, res) {
	res.render('greeted', {
		users: greeting.getUsers(),
		count: greeting.getUserCount(),
		empty: greeting.getUserCount() < 1 ? true : false
	});
});

// ---------- User Route ---------- //
app.get('/counter/:username', function (req, res) {
	res.render('counter', {
		username: req.params.username,
		count: greeting.getGreetCount(req.params.username),
		plural: greeting.getGreetCount(req.params.username) > 1 ? 's' : '',
	});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
	console.log(`App started on PORT: ${PORT}`);
});