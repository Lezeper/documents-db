var mongoose = require('mongoose');
var UserReq = mongoose.model('UserReq');

module.exports.getAllUserRequests = function(req, res){
	UserReq.find({}, function(err, userReqs){
		if(err)
			return res.status(500).send(err);
		res.json(userReqs);
	});
}

module.exports.createUserRequest = function(req, res){
	var userReq = new UserReq();
	userReq.name = req.body.name;
	userReq.link = req.body.link;
	userReq.contents = req.body.contents;
	userReq.created = new Date();

	userReq.save(function(err){
		if(err)
			return res.status(500).send(err);
		res.status(200).json({
			message: "Thank you for your comment! I will check it latter!"
		});
	});
}

module.exports.deleteUserRequest = function(req, res){
	UserReq.findOneAndRemove(req.params.id, function(err){
		if(err)
			return res.status(500).send(err);
		res.status(200).json({
			message: "Successful Deleted!"
		});
	});
}