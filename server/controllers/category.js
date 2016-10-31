var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var Document = mongoose.model('Document');

module.exports.findCategoriesByGroup = function(req, res){
	Category.find({group: req.params.group}).sort({weight: 1}).exec(function(err, categories){
		if(err)
			return res.send(500, err);
		res.json(categories);
	});
};

module.exports.createCategory = function(req, res){
	var category = new Category();
	category.main = req.body.main;
	category.sub.push(req.body.sub);
	category.group = req.body.group;
	category.weight = req.body.weight;

	// find whether the category exist
	Category.find({main: req.body.main, group: req.body.group}, function(err, categories){
		if(categories.length > 0)
			return res.status(200).json({"message": "Category Already Exist!"});

		category.save(function(err){
			if(err)
				return res.status(500).send(err);
			res.status(201).json({"message": "Category created!"});
		});
	});
};

module.exports.updateCategory = function(req, res){
	Category.findOneAndUpdate({_id: req.body._id}, req.body, function(err, category){
		if(err)
			return res.send(500, err);
		if(category == null)
			return res.status(200).json({"message": "Can't find this category!"});
		res.status(200).json({"message": "Category updated!"});
	});
};

module.exports.deleteCategory = function(req, res){
	Category.findByIdAndRemove(req.params.id, function(err){
		if(err)
			return res.send(500, err);
		res.json({"message": "Successful delete cateogry."});
	});
}
