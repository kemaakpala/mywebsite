var express = require('express');//require express
var app = express();//call express
var bodyParser = require('body-parser');//require node modules bordy-parser
var mongoose = require('mongoose');
var config = require('./config');
var setupController = require('./controllers/setupController');
var apiController = require('./controllers/apiController');
var Port = process.env.Port || 3000; //set default Port value

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.redirect('/index.htm');
});

app.use('/', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

mongoose.connect(config.getDbConnectionString());
setupController(app);
apiController(app);


app.listen(Port);
//used for settingup administrative permissions
// use admin
// db.createUser(
//   {
//     user: "patrick",
//     pwd: "pa77cfkit",
//     roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
//   }
// )

//used for setting up permissions to my website database
//https://docs.mongodb.com/manual/tutorial/enable-authentication/

// use mywebsitedb
// db.createUser({
//   user: 'patrickakpala',
//   pwd: '6Vn2zZ8pK',
//   roles: [
//     {
//       role: "readWrite",
//       db: "mywebsitedb",
//     },
//     {
//       role: "read",
//       db: "reporting"
//     }]
// })
