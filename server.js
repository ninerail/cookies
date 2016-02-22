//Requirements
var express					= require('express'),
		bodyParser			= require('body-parser'),
		methodOverride	= require('method-override'),
		mongoose				=	require('mongoose')
		port 						= 3000 || process.env.PORT,
		app							= express();

//Create mongodb database
mongoose.connect('mongodb://localhost/cookies');

//Require controllers for my two models
usersController 	= require('./controllers/usersController');
cookiesController = require('./controllers/cookiesController');

//serve images, CSS files, and JavaScript files in public directory
app.use(express.static('public'));

//middleware; for body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//middleware for method override
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

//middleware
app.use('/users', usersController);
app.use('/cookies', cookiesController);

//start at the users page
app.get('/', function(req, res) {
	res.redirect('/users');
})

//Console log that server is running
app.listen(port, function() {
    console.log('=======================');
    console.log('Running on port ' + port);
    console.log('=======================');
});