var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  sub_title: {
    type: Array
  },
  answer: {
    type: String,
    required: false
  },
  company: {
    type: String
  },
  position: {
    type: String
  },
  notes: {
    type: String
  },
  links: {
	  type: Array
  },
  author:{
    type: String,
    required: false
  },
  group: {
    type: String,
    required: true
  },
  related: {
    type: Array,
    required: false
  },
  category:{
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true
  }
});

mongoose.model('Question', questionSchema);