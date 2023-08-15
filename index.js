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
const db = pgp(process.env.DB_URL);

const greeting = Greeting();

// ---------- Index Route ---------- //
app.get('/', function (req, res) {
	const message = greeting.getGreeting();
	const error = req.flash('error')[0];
	const style = greeting.getGreeting() ? 'success' : 'error';
	const count = greeting.getCount();

	res.render('index', {
		message: message,
		error: error,
		style: style,
		count: count
	});
});

// ---------- Greet Route ---------- //
app.post('/greetings', function (req, res) {
	if (!greeting.setName(req.body.name) && !greeting.setLanguage(req.body.language)) {
		req.flash('error', "Enter name & select language");
	} else if (!greeting.getName(req.body.name)) {
		req.flash('error', "Enter a name");
	} else if (!greeting.getLanguage(req.body.language)) {
		req.flash('error', "Select a language");
	} else if (!greeting.isName(req.body.name)) {
		req.flash('error', "Name is invalid");
	} else {
		greeting.setGreeting();
	}
	res.redirect('/');
})

// ---------- Reset Route ---------- //
app.post('/reset', function (req, res) {
	greeting.resetNames();
	res.redirect('/');
})

// ---------- Greeted Route ---------- //
app.get('/greeted', function (req, res) {
	res.render('greeted', {
		users: greeting.getUsers()
	});
});

// ---------- User Route ---------- //
app.get('/counter/:username', function (req, res) {
	res.render('counter', {
		username: req.params.username,
		count: greeting.getUserCount(req.params.username),
		plural: greeting.getUserCount(req.params.username) > 1 ? 's' : ''
	});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
	console.log(`App started on PORT: ${PORT}`);
});