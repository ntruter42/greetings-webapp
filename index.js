import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import flash from "express-flash";
import session from "express-session";
import Greeting from "./greeting.js";

const app = express();
const greeting = Greeting();

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
	secret: "secret",
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}));
app.use(flash());


// ---------- Index Route ---------- //
app.get('/', function (req, res) {
	res.render('index', {
		greeting: greeting.getGreeting(),
		hidden: greeting.getGreeting() !== '' ? '' : 'hidden',
		message: req.flash('error')[0],
	});
});

// ---------- Greet Route ---------- //
app.post('/greetings', function (req, res) {
	if (greeting.setName(req.body.name)) {
		greeting.setGreeting(req.body.language);
	}
	const message = greeting.getMessage();
	if (message) {
		req.flash('error', message);
	}
	res.redirect('/');
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
	console.log(`App started on PORT: ${PORT}`);
});