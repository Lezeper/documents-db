var mongoose = require('mongoose');
var category = new mongoose.Schema({
	main: {
		type: String,
		unique: true,
		required: true
	},
	sub: {
		type: Array,
		required: false
	},
	weight: {
		type: Number,
		required:false
	},
	group: {
		type: String,
		required: true
	}
});

mongoose.model('Category', category);