var mongoose = require('mongoose');
var Document = mongoose.model('Document');

module.exports.findDocById = function(req, res){
	Document.findById(req.params.id, function(err, document){
		if(err)
			return res.send(500, err);
		return res.json(document);
	});
};

module.exports.findAllDocCategories = function(req, res){
	var results = [];
	var p = new Promise(function(resolve, reject){
		Document.find().distinct('category', function(err, categories){
			if(err){
				return res.send(500, err);
			}
			resolve(categories);
		});
	});
	p.then(function(categories){
		categories.forEach(function(category){
			Document.count({category: category}, function(err, count){
				if(err){
					return res.send(500, err);
				}
				var object = new Object();
				object.category = category;
				object.count = count;
				results.push(object);
				if(results.length == categories.length){
					return res.json(results);
				}
			});
		});
	});
};

module.exports.findDocByCategory = function(req, res){
	Document.find({category: req.params.category}, function(err, documents){
		if(err){
			return res.send(500, err);
		}
		res.json(documents);
	});
};

module.exports.createDoc = function(req, res){
	var document = new Document();
	document.title = req.body.title.toLowerCase();
	document.description = req.body.description;
	document.usage = req.body.usage;
	document.related = req.body.related;
	document.notes = req.body.notes;
	document.category = req.body.category;
	document.author = req.body.author;
	document.group = "doc";
	document.created = new Date();
	document.save(function(err){
		if(err){
			return res.send(500, err);
		}
		return res.status(201).json({
			"message": "Document Created!"
		});
	});
};

module.exports.updateDoc = function(req, res){
	Document.findById(req.body._id, function(err, document){
		if(!document){
			return res.status(404).json({"message": "Document not found!"});
		}
		document.title = req.body.title.toLowerCase();
		document.description = req.body.description;
		document.usage = req.body.usage;
		document.notes = req.body.notes;
		document.author = req.body.author;
		document.related = req.body.related;
		document.category = req.body.category;
		document.created = new Date();
		console.log(document);
		document.save(function(err){
			if(err){
				return res.send(500, err);
			}
			return res.status(200).json({
				"message": "Document updated!"
			});
		});
	});
};

module.exports.deleteDoc = function(req, res){
	Document.findByIdAndRemove(req.params.id, function(err){
		if(err){
			return res.send(500, err);
		}
		return res.json({								// no status need, or u can't receive message
			"message": "Successful delete document."
		});
	})
};