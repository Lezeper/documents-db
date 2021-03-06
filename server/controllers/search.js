var mongoose = require('mongoose');
var Question = require('../models/question');
var Document = require('../models/document');

function getAllByKeyword(keyword, category, need){
	var p = new Promise(function(resolve, reject){
		var lists = [];
		var subLists = [];
		var temp = keyword.split("-").join("")
					.toLowerCase().split(" ");
		for(var i = 0; i < temp.length; i++){
			// deal with $ sign problem
			var t = temp[i].replace("$", "\\$");
			lists.push( { $or: [{'title' : {$regex: t}} , 
								{'sub_title' : {$regex: t}}] } );
			// subLists.push({'sub_title' : {$regex: t}});
		}

		mongoose.model(category).find({
			"$and": lists
		}, need, function(err, data){
			if(err)
				reject(err);
			resolve(data);
		}).limit(5);
		/*
		var p2 = new Promise(function(resolve2, reject2){
			mongoose.model(category).find({
				"$and": lists
			}, need, function(err, data){
				if(err)
					reject2(err);
				resolve2(data);
			}).limit(5);
		});
		p2.then(function(data){
			mongoose.model(category).find({
				"$and": subLists
			}, need, function(err, data2){
				if(err)
					reject(err);
				var result = [];
				result.push.apply(result, data);
				result.push.apply(result, data2);
				resolve(result);
			}).limit(5);
		});*/
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