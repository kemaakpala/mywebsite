var environmentVariables = {
  env: process.env.NODE_ENV || 'development', //set default environment
  port: process.env.PORT | 3000, //set default Port value
  getMailConnectionObj: function(){
    //this requires the relevant json environment needed to connect to te database. it still needs some work!!!.
    var envJson = require('./'+ this.env);
    return email = {
      user: envJson.email.user,
      pwd: envJson.email.pwd,
      host: envJson.email.host,
      emailPort: envJson.email.emailPort,
      adminEmailList: envJson.email.adminEmailList
    };
  }
};

module.exports = environmentVariables;