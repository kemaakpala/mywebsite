var mongoose = require('mongoose');//require mongoose

var Schema = mongoose.Schema;

var mySkillsSchema = new Schema({
  title: String,
  description: String,
  image: String,
  link: String,
  isActive: Boolean,
  date: Date
});

var mySkills = mongoose.model('mySkills',mySkillsSchema);

module.exports = mySkills;