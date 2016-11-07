var mongoose = require('mongoose');
var loggerSchema = new mongoose.Schema({
	ip: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		required: true
	},
	target: {
		type: String,
		required: true
	},
	method: {
		type: String,
		required: true
	}
});

mongoose.model('Logger', loggerSchema);