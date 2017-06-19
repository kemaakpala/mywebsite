var mywebsiteMessages = require('../models/mywebsiteModel');
var mySkills = require('../models/mySkillsModel');

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

  app.get('/api/setupSkills', function(req, res){
    // seed database
    var starterSkills = [{
      title: 'HTML5',
      image: 'html5.png',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc neque velit, tempor at bibendum non. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc neque velit, tempor at bibendum non.',
      link: 'http://google.com',
      isActive: '{{bool()}}',
      date: new Date()
    },{
      title: 'CSS3',
      image: 'css3.svg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc neque velit, tempor at bibendum non. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc neque velit, tempor at bibendum non.',
      link: 'http://google.com',
      isActive: '{{bool()}}',
      date: new Date()
    },{
      title: 'SASS',
      image: 'Sass-Logo.png',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc neque velit, tempor at bibendum non. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc neque velit, tempor at bibendum non.',
      link: 'http://google.com',
      isActive: '{{bool()}}',
      date: new Date()
    },{
      title: 'JAVASCRIPT',
      image: 'javascript.svg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc neque velit, tempor at bibendum non. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc neque velit, tempor at bibendum non.',
      link: 'http://google.com',
      isActive: '{{bool()}}',
      date: new Date()
    }];

    mySkills.create(starterSkills, function(err, results){
      res.send(results);
    });

  });
}
