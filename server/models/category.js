var mongoose = require('mongoose');
var categorySchema = new mongoose.Schema({
	main: {
		type: String,
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

mongoose.model('Category', categorySchema);