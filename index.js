import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import session from "express-session";
import flash from "express-flash";
import Database from "./services/database.js";
import Greeting from "./services/greeting.js";
import greetingRoutes from "./routes/greeting.js";

// ---------- Express Instance ---------- //
const app = express();
app.use(express.static('public'));

// ---------- Handlebars Setup ---------- //
app.engine('handlebars', engine({
	defaultLayout: 'main',
	viewPath: './views',
	layoutsDir: './views/layouts'
}));
app.set('view engine', 'handlebars');

// ---------- BodyParser Setup ---------- //
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ---------- Flash Setup ---------- //
app.use(session({
	secret: "secret42",
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}));
app.use(flash());

const database_setup = Database();
const greeting_services = Greeting(database_setup);
const greeting_routes = greetingRoutes(greeting_services);

app.get('/', greeting_routes.home);
app.get('/greeted', greeting_routes.greeted);
app.get('/counter/:username', greeting_routes.counter);

app.post('/greetings', greeting_routes.greetings);
app.post('/reset', greeting_routes.reset);
app.post('/reset-greeted', greeting_routes.resetGreeted);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
	console.log(`App started on PORT: ${PORT}`);
});