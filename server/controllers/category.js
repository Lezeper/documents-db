var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var Document = mongoose.model('Document');

module.exports.findCategoriesByGroup = function(req, res){
	Category.find({group: req.params.group}, function(err, categories){
		if(err)
			return res.send(500, err);
		res.json(categories);
	});
};

module.exports.findCatesByMainCateogry = function(req, res){
	Category.find({group: req.params.group, main: req.params.category}, 
						function(err, categories){
		if(err)
			return res.send(500, err);
		res.json(categories);
	});
}

module.exports.createCategory = function(req, res){
	var category = new Category();
	category.main = req.body.main;
	category.sub.push(req.body.sub);
	category.group = req.body.group;

	category.save(function(err){
		if(err){
			// if main dumplicates
			if(err.code == 11000){
				Category.findOne({main: req.body.main}, function(err, category_){
					// check whether sub name duplicate
					if(category_.sub.indexOf(req.body.sub) >= 0)
						return res.status(500).send();
					category_.sub.push(req.body.sub);
					Category.findOneAndUpdate({_id: category_._id}, category_, function(err){
						if(err)
							return res.status(500).send(err);
						res.status(201).json({"message": "Category created!"});
					});
				});
			}else{
				return res.status(500).send(err);
			}
		}else{
			res.status(201).json({"message": "Category created!"});
		}
	});
};

module.exports.updateCategory = function(req, res){
	Category.findOneAndUpdate({_id: req.body._id}, req.body, function(err, category){
		if(err)
			return res.send(500, err);
		return res.status(200).json({
			"message": "Category pdated!"
		});
	});
};

module.exports.deleteCategory = function(req, res){
	Category.findByIdAndRemove(req.params.id, function(err){
		if(err)
			return res.send(500, err);
		return res.json({
			"message": "Successful delete cateogry."
		});
	});
}
