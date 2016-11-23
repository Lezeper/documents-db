var mongoose = require('mongoose');

var userReqSchema = new mongoose.Schema({
	contents: {
		type: String
	},
	name: {
		type: String
	},
	link: {
		type: String
	},
	created : {
		type: Date,
		required: true
	}
});

mongoose.model('UserReq', userReqSchema);