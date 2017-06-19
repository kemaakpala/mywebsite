var mywebsiteMessages = require('../models/mywebsiteModel');
var myskills = require('../models/mySkillsModel');
var bodyParser = require('body-parser');

module.exports = function (app){
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.get('/api/mywebsiteMessages/', function(req, res){
    mywebsiteMessages.find({}, function(err, mywebsitemessages){
      if(err){throw err;}
      res.send(mywebsitemessages);
    });
  });

  app.get('/api/myskills/', function(req, res){
    myskills.find({}, function(err, myskills){
      if(err){throw err;}
      res.send(myskills);
    });
  });

  app.get('/api/myskills/:isActive', function(req, res){
    myskills.find({isActive: req.params.isActive} ,
      function(err, myskills){
        if(err){
          throw err;
        }
        res.send(myskills);
      }
    );
  });

  app.get('/api/myskills/:title', function(req, res){
    myskills.find({title: req.params.title} ,
      function(err, myskill){
        if(err){
          throw err;
        }
        res.send(myskill);
      }
    );
  });

  app.get('/api/mywebsitemessages/:email', function(req, res){
    mywebsiteMessages.find({email: req.params.email} ,
      function(err, mywebsitemessages){
        if(err){
          throw err;
        }
        res.send(mywebsitemessages);
      }
    );
  });

  app.get('/api/mywebsitemessage/:id', function(req, res){
    mywebsiteMessages.findById({ _id: req.params.id } ,
      function(err, mywebsitemessage){
        if(err){throw err;}
        res.send(mywebsitemessage);
      }
    );
  });

  app.get('/api/myskills/:id', function(req, res){
    myskills.findById({ _id: req.params.id } ,
      function(err, myskills){
        if(err){throw err;}
        res.send(myskills);
      }
    );
  });

  app.post('/api/mywebsitemessage', function(req, res){

    if(req.body.id){
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
      function(err, mywebsitemessage){
        if(err){ throw err;}

        res.send('Success!');
      }
    );
    }else{
    //insert

    var newMessage = mywebsiteMessages({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
      date: new Date()
    });

    newMessage.save(function(err){
      if (err) {throw err;}
      res.send('Success!');
    });



    }
  });

  app.delete('/api/mywebsitemessage', function(req, res){
    mywebsiteMessages.findByIdAndRemove(req.body.id,
      function(err){
        if (err) {throw err;}
        res.send('Successfully Deleted: ' + req.body.id);
      }
    );
  });

}
