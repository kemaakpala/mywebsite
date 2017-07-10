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
const setupController = require('./controllers/setupController');
const apiController = require('./controllers/apiController');
const nodemailer = require('nodemailer');
const Port = process.env.PORT || 3000; //set default Port value
console.log(process.env);
const smtpPort = 10443;

console.log(process.env);
//this makes sure you always get to the home page on refresh
app.get('/', function (req, res) {
  res.redirect('/index.htm');
});

//this makes sure you always get to the home page on refresh
app.get('/index', function (req, res) {
  res.redirect('/index.htm');
});

app.use('/', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

mongoose.connect(config.getDbConnectionString());
setupController(app);
apiController(app);

//create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // secure:true for port 465, secure:false for port 587
  auth: {
    user: config.getMailConnectionObj().user,
    pass: config.getMailConnectionObj().pwd
  }
});

//setup email data with unicode symbols

let mailOptions = {
  from: '"Fred Foo" <patrickakpala@yahoo.co.uk>',// sender address
  to: 'admin@patrickakpala.com, info@patrickakpala.com, iam@patrickakpala.com', //list of receivers
  subject: 'Hello!', //Subject line
  text: 'Plain text Hello world ?',//Plain text body
  html: '<b>Html Hello world ?</b>'//html body
};

//send email with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
  if (error){
    return console.log(error);
  }
  console.log('Message %s sent: %s', info.messageId, info.response);
});

http.createServer(app).listen(Port);
https.createServer(OPTIONS, app).listen(10443);

//app.listen(Port);