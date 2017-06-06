var configValues = require('./config');

module.exports = {
  getDbConnectionString : function(){
    return 'mongodb://'+configValues.user+':'+configValues.pwd+'@127.0.0.1:27017/mywebsitedb'
  }
};
