var mongoose = require('mongoose');
var Question = mongoose.model('Question');

module.exports.createQuestion = function (req, res) {
  var question = new Question();

  question.title = req.body.title.toLowerCase();
  question.answer = req.body.answer;
  question.author = req.body.author;
  question.group = "que";
  question.related = req.body.related;
  question.category = req.body.category;
  question.created = new Date();
  question.save(function (err) {
    if(err){
      return res.status(500).json(err)
    }
    return res.status(201).json({
      "message": "Question Created!"
    });
  })

};

module.exports.findAllQuesCategories = function (req, res) {
  Question.find().distinct('category', function (err, categories) {
    if(err){
      return res.send(500, err);
    }
    resultOut(categories);
  });

  function resultOut(categories){
    var results = [];
    var p = new Promise(function(resolve, reject){
      categories.forEach(function(category, index){
        Question.count({category: category}, function(err, count){
          if(err){
            return res.status(500, err);
          }
          else{
            var result = new Object();
            result.category = category;
            result.count = count;
            results.push(result);
            if(results.length == categories.length){
              resolve(results);
            }
          }
        });
      });
    });

    p.then(function(result){ 
      res.json(result);
    });
  }
};

module.exports.findQuesById = function (req, res) {
  Question.findById(req.params.id, function (err, question) {
    if(err){
      return res.status(500, err);
    }
    res.json(question);
  })
};

module.exports.findQuesByCategory = function (req, res) {
  Question.find({category: req.params.category}, function (err, questions) {
    if(err){
      return res.status(500, err);
    }
    res.json(questions);
  })
};

module.exports.updateQuestion = function (req, res) {
  req.body.created = new Date();
  Question.findOneAndUpdate({_id: req.body._id}, req.body, function(err, document){
    if(err)
      return res.send(500, err);
    res.status(200).json({
      "message": "Question updated!"
    });
  });
};

module.exports.deleteQuestion = function (req, res) {
  Question.findByIdAndRemove(req.params.id, function (err) {
    if(err){
      return res.send(500, err);
    }
    return res.json({
      "message": "Successful delete question."
    })
  })
};