var mongoose = require('mongoose');
var Question = require('../models/question');
var Document = require('../models/document');

function getAllByKeyword(keyword, category, need){
	var p = new Promise(function(resolve, reject){
		mongoose.model(category).find({
			"$or": [
				{'title' : {$regex: keyword}}
			]
		}, need, function(err, data){
			if(err)
				reject(err);
			resolve(data);
		});
	});
	return p;
};

// require check mongoose model exisit or not if merge those two function.
module.exports.findAllDocsByKeyword = function(req, res){
	getAllByKeyword(req.params.keyword, 'Document', req.query.need).then(function(data){
		res.json(data);
	},function(err){
		res.send(500, err);
	});
};

module.exports.findAllQuesByKeyword = function (req, res) {
  	getAllByKeyword(req.params.keyword, 'Question', req.query.need).then(function(data){
		res.json(data);
	},function(err){
		res.send(500, err);
	});
};