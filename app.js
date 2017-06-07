var express = require('express');//require express
var app = express();//call express
var bodyParser = require('body-parser');//require node modules bordy-parser
var mongoose = require('mongoose');
var config = require('./config');
var setupController = require('./controllers/setupController');
var apiController = require('./controllers/apiController');


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.redirect('/index.htm');
});

app.use('/', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

mongoose.connect(config.getDbConnectionString());
setupController(app);
apiController(app);


app.listen(config.port);
