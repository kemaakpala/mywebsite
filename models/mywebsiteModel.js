var mongoose = require('mongoose');//require mongoose

var Schema = mongoose.Schema;

var mywebsiteSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  subject: String,
  message: String,
  date: Date
});

var mywebsiteMessages = mongoose.model('mywebsiteMessages',mywebsiteSchema);

module.exports = mywebsiteMessages;
