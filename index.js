import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
// import flash from "express-flash";
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


// ---------- Index Route ---------- //
app.get('/', function (req, res) {
	res.render('index', {
		class: greeting.getMessage() !== '' ? '' : 'hidden',
		greeting: greeting.getMessage()
	});
});

app.post('/greet', function (req, res) {
	greeting.setName(req.body.name);
	greeting.setMessage(req.body.language);
	res.redirect('/')
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
	console.log(`App started on PORT: ${PORT}`);
});