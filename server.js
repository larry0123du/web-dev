var express = require('express');
var exphbs = require('express-handlebars');
var ellipsize = require('ellipsize');
var posts = require('./posts.json');

var app = express();
app.set('port', (process.env.PORT || 8080));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/assets', express.static(_dirname + '/assets'));
app.user('/vendor', express.static(_dirname + '/bower_components'));

app.get('/', function(req, res) {
	res.render('home', {
		title: 'A Punk Programmer',
		posts: posts,
		helpers: {
			ellipsize: wrappedEllipsize
		}
	});
});

app.get('/:postURL', function(req, res) {
	var postURL = req.params.postURL;
	var post = posts[postURL];

	if (post) {
		res.render('post', {
			post: post
		});
	}
	else {
		res.render('404');
	}
});

var server = app.listen(app.get('port'), function() {
	console.log('the server is listening on port %s', app.get('port'));
});

function wrappedEllipsize(body) {
	var maxChars = 240;
	return ellipsize(body, maxChars);
}