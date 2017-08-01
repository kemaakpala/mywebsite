const express = require('express');//require express
const app = express();//call express
const https = require('https');
const http = require('http');
const fs = require('fs');
const OPTIONS = {
  key: fs.readFileSync('./devssl/localhost.key'),
  cert: fs.readFileSync('./devssl/localhost.crt')
};
const bodyParser = require('body-parser');//require node modules bordy-parser
const mongoose = require('mongoose');
const config = require('./config');
const nodemailer = require('nodemailer');
const setupController = require('./controllers/setupController');
const apiController = require('./controllers/apiController');
const Port = process.env.PORT || 3000; //set default Port value
//console.log(process.env);
const smtpPort = 10443;

//console.log(process.env);
//this makes sure you always get to the home page on refresh
app.get('/', function (req, res, next) {
  res.redirect('/index.htm');
  next();
});

//this makes sure you always get to the home page on refresh
app.get('/index', function (req, res, next) {
  res.redirect('/index.htm');
  next();
});

//this makes sure you always get to the home page on refresh
app.get('/admin', function (req, res, next) {
  //console.log(res.render('admin/index.htm'));
//   res.redirect('/admin/index.htm');
//   next();
});

app.use('/', express.static(__dirname + '/public'));
app.use('/admin', express.static(__dirname + '/public/admin'));

app.set('view engine', 'ejs');

mongoose.connect(config.getDbConnectionString());
setupController(app);
apiController(app);

http.createServer(app).listen(Port);
https.createServer(OPTIONS, app).listen(10443);

//app.listen(Port);