//var configValues = require('./config');

var environmentVariables = {
  env: process.env.NODE_ENV || 'development', //set default environment
  port: process.env.PORT | 3000, //set default Port value
  getDbConnectionString : function(){
    //this requires the relevant json environment needed to connect to te database. it still needs some work!!!.
    // var envJson = require('./' + this.env);
    if (this.env !== 'development') {
      var envJson = {
        "user": process.env.DB_USER,
        "pwd": process.env.DB_PASSWORD,
        "ip": process.env.DB_IP,
        "db": process.env.DB_NAME
      };
    }else {
      var envJson = require('./' + this.env);
    }
    return 'mongodb://' + envJson.user + ':' + envJson.pwd + '@' + envJson.ip + '/' + envJson.db;
  },
  getMailConnectionObj: function(){
    //this requires the relevant json environment needed to connect to te database. it still needs some work!!!.
    if (this.env !== 'development') {
      var envJson = { 
        "email": {
          "user": process.env.EMAIL_ADMIN,
          "pwd": process.env.EMAIL_PASSWORD
        }
      };

    } else {
      var envJson = require('./' + this.env);
    }
    return email = {
      user: envJson.email.user,
      pwd: envJson.email.pwd
    };
  }
};

module.exports = environmentVariables;
