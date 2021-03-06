var mongoose = require('mongoose');

var documentSchema = new mongoose.Schema({
	title: {
		type: String,
		unique: true,
		required: true
	},
	sub_title: {
	    type: Array
	},
	description: {
		type: String,
		required: false
	},
	usage: {
		type: String,
		required: false
	},
	related: {
		type: Array,
		required:false
	},
	links: {
		type: Array
	},
	notes: {
		type: String,
		required: false
	},
	category: {
		type: String,
		required: true
	},
	group: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: false
	},
	created: {
		type: Date,
		required: true
	}
});

mongoose.model('Document', documentSchema);