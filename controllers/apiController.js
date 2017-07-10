const mywebsiteMessages = require('../models/mywebsiteModel');
const myskills = require('../models/mySkillsModel');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mailConfig = require('../config/mail');

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post('/api/sendEmail/', function (req, res) {
    //create reusable transporter object using the default SMTP transport
    console.log(mailConfig.getMailConnectionObj());
    let transporter = nodemailer.createTransport({
      host: mailConfig.getMailConnectionObj().host,
      port: mailConfig.getMailConnectionObj().emailPort,
      secure: true, // secure:true for port 465, secure:false for port 587
      auth: {
        user: mailConfig.getMailConnectionObj().user,
        pass: mailConfig.getMailConnectionObj().pwd
      }
    });

  
    let mailOptions = {};

    if (!req.body.email) {
      // throw error
      throw 'email failed! due to no email address'
    } else {
      //sendEmail utility
      let emailBody = '<b>firstname: </b>' + req.body.firstname + ' <b>lastname: </b>' + req.body.lastname + '<br>';
      emailBody += '<b>subject: </b>' + req.body.subject + '<br>';
      emailBody += '<p>' + req.body.message + '</p>';

      mailOptions = {
        from: '"' + req.body.firstname + ' ' + req.body.lastname + '" <' + req.body.email + '>',// sender address
        to: mailConfig.getMailConnectionObj().adminEmailList, //list of receivers
        subject: req.body.subject, //Subject line
        html: emailBody//html body
      };

      //send email with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.send('Message %s sent: %s', info.messageId, info.response);
      });

    }

  });

  app.get('/api/mywebsiteMessages/', function (req, res) {
    mywebsiteMessages.find({}, function (err, mywebsitemessages) {
      if (err) { throw err; }
      res.send(mywebsitemessages);
    });
  });

  app.get('/api/myskills/', function (req, res) {
    myskills.find({}, function (err, myskills) {
      if (err) { throw err; }
      res.send(myskills);
    });
  });

  app.get('/api/myskills/:isActive', function (req, res) {
    myskills.find({ isActive: req.params.isActive },
      function (err, myskills) {
        if (err) {
          throw err;
        }
        res.send(myskills);
      }
    );
  });

  app.get('/api/myskills/:title', function (req, res) {
    myskills.find({ title: req.params.title },
      function (err, myskill) {
        if (err) {
          throw err;
        }
        res.send(myskill);
      }
    );
  });

  app.get('/api/mywebsitemessages/:email', function (req, res) {
    mywebsiteMessages.find({ email: req.params.email },
      function (err, mywebsitemessages) {
        if (err) {
          throw err;
        }
        res.send(mywebsitemessages);
      }
    );
  });

  app.get('/api/mywebsitemessage/:id', function (req, res) {
    mywebsiteMessages.findById({ _id: req.params.id },
      function (err, mywebsitemessage) {
        if (err) { throw err; }
        res.send(mywebsitemessage);
      }
    );
  });

  app.get('/api/myskills/:id', function (req, res) {
    myskills.findById({ _id: req.params.id },
      function (err, myskills) {
        if (err) { throw err; }
        res.send(myskills);
      }
    );
  });

  app.post('/api/mywebsitemessage', function (req, res) {

    if (req.body.id) {
      //update
      mywebsiteMessages.findByIdAndUpdate(req.body.id,
        {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          subject: req.body.subject,
          message: req.body.message,
          date: new Date()
        },
        function (err, mywebsitemessage) {
          if (err) { throw err; }

          res.send('Success!');
        }
      );
    } else {
      //insert

      var newMessage = mywebsiteMessages({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
        date: new Date()
      });

      newMessage.save(function (err) {
        if (err) { throw err; }
        res.send('Success!');
      });



    }
  });

  app.post('/api/myskill', function (req, res) {

    if (req.body.id) {
      //update
      myskills.findByIdAndUpdate(req.body.id,
        {
          title: req.body.title,
          image: req.body.image,
          description: req.body.description,
          link: req.body.link,
          isActive: req.body.isActive,
          date: new Date()
        },
        function (err, myskill) {
          if (err) { throw err; }

          res.send('Success!');
        }
      );
    } else {
      //insert

      var newSkill = myskills({
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
        link: req.body.link,
        isActive: req.body.isActive,
        date: new Date()
      });

      newSkill.save(function (err) {
        if (err) { throw err; }
        res.send('Success!');
      });
    }
  });

  app.delete('/api/mywebsitemessage', function (req, res) {
    mywebsiteMessages.findByIdAndRemove(req.body.id,
      function (err) {
        if (err) { throw err; }
        res.send('Successfully Deleted: ' + req.body.id);
      }
    );
  });

}
