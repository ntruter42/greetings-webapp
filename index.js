import express from "express";
import { engine } from "express-handlebars";
import flash from "express-flash";
import bodyParser from "body-parser";

const app = express();

app.engine('handlebars', engine({
	viewPath: './views',
	layoutsDir: './views/layouts',
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// ---------- Index Route ---------- //
app.get('/', function (req, res) {
	res.render('index');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
	console.log(`App started on PORT: ${PORT}`);
});