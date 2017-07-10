//var configValues = require('./config');

var environmentVariables = {
  env: process.env.NODE_ENV || 'development', //set default environment
  port: process.env.PORT | 3000, //set default Port value
  getDbConnectionString : function(){
    //this requires the relevant json environment needed to connect to te database. it still needs some work!!!.
    var envJson = require('./'+ this.env);
    return 'mongodb://'+envJson.user+':'+envJson.pwd+'@'+envJson.ip+'/'+envJson.db;
  },
  getMailConnectionObj: function(){
    //this requires the relevant json environment needed to connect to te database. it still needs some work!!!.
    var envJson = require('./'+ this.env);
    return email = {
      user: envJson.email.user,
      pwd: envJson.email.pwd
    };
  }
};

module.exports = environmentVariables;
