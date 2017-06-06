var mywebsiteMessages = require('../models/mywebsiteModel');

module.exports = function(app){
  app.get('/api/setupMessages', function(req, res){
    // seed database
    var starterMessages = [{
      firstname: "John Doe",
      lastname: "Doe",
      subject: "hello Doe",
      email: "john@doe.com",
      message: "this is a seed message",
      date: new Date()
    },{
      firstname: "Jane Doe",
      lastname: "Doe",
      subject: "hello Miss Doe",
      email: "jane@doe.com",
      message: "this is a seed message2",
      date: new Date()

    },{
      firstname: "Johnny",
      lastname: "Doe",
      subject: "hello Master Johnny  Doe",
      email: "Johnny@doe.com",
      message: "this is a seed message3",
      date: new Date()
    }];

    mywebsiteMessages.create(starterMessages, function(err, results){
      res.send(results);
    });

  });
}
