var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  answer: {
    type: String,
    required: false
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