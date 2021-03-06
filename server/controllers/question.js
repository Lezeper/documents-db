var mongoose = require('mongoose');
var Question = mongoose.model('Question');

var titleProcessor = function(title){
  if(!title)
    return title;
  if(Array.isArray(title)){
    var result = [];
    title.forEach(function(t){
      result.push(t.split("-").join("").toLowerCase());
    });
    return result;
  }
  return title.split("-").join("").toLowerCase();
}

module.exports.createQuestion = function (req, res) {
  var question = new Question();

  question.title = titleProcessor(req.body.title);
  question.sub_title = titleProcessor(req.body.sub_title);
  question.answer = req.body.answer;
  question.author = req.body.author;
  question.notes = req.body.notes;
  question.links = req.body.links;
  question.company = req.body.company;
  question.position = req.body.position;
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
  Question.find({category: req.params.category}).sort({created: -1})
          .exec(function (err, questions) {
    if(err){
      return res.status(500, err);
    }

    res.json(questions);
  })
};

module.exports.updateQuestion = function (req, res) {
  req.body.created = new Date();
  req.body.title = titleProcessor(req.body.title);
  req.body.sub_title = titleProcessor(req.body.sub_title);
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