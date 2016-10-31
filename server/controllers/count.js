var mongoose = require('mongoose');
var Document = mongoose.model('Document');
var Question = mongoose.model('Question');

module.exports.countDocByCategory = function(req, res){
	Document.count({category: req.params.category}, function(err, count){
		if(err)
			return res.send(500, err);
		return res.json(count);
	});
}

module.exports.countQueByCategory = function(req, res){
	Question.count({category: req.params.category}, function(err, count){
		if(err)
			return res.send(500, err);
		return res.json(count);
	});
}