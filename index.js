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
// console.log(process.env);

// const pgp = promise();
// const connection_string = "postgres://ntruter42:MTSQTIWwXQK96mcFvVH9UH9i1Zd9Sj2l@dpg-cja4085m2m9c73bnmta0-a.oregon-postgres.render.com/codex42"
// const db = pgp({
// 	host: process.env.DB_HOST,
// 	port: process.env.DB_PORT,
// 	database: process.env.DB_NAME,
// 	user: process.env.DB_USER,
// 	password: process.env.DB_PASSWORD,
// });
// const db = pgp(connection_string);

const greeting = Greeting();

// ---------- Index Route ---------- //
app.get('/', function (req, res) {
	const message = greeting.getGreeting() ? greeting.getGreeting() : req.flash('error')[0];
	const style = greeting.getGreeting() ? 'success' : 'error';
	const count = greeting.getCount();

	res.render('index', {
		message: message,
		hidden: message ? '' : 'hidden',
		style: style,
		count: count
	});
});

// ---------- Greet Route ---------- //
app.post('/greetings', function (req, res) {
	if (!greeting.setName(req.body.name)) {
		req.flash('error', "Enter a name");
	} else if (!greeting.setLanguage(req.body.language)) {
		req.flash('error', "Choose a language");
	} else if (!/^[a-zA-Z]+((-| )[a-zA-Z]+)?$/.test(req.body.name)) {
		req.flash('error', "Name is invalid");
	} else {
		greeting.setGreeting();
	}
	res.redirect('/');
})

// ---------- Reset Route ---------- //
app.post('/reset', function (req, res) {
	greeting.reset();
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