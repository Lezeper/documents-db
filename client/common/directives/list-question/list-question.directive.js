(function () {
	angular.module('app').directive('listQuestion', function () {
		return {
			scope: false,
      		restrict: 'E',
      		templateUrl: '/common/directives/list-question/list-question.view.html',
      		link: function(scope, element, attr){
      			scope.numPerPage = 5;

      			// receive question id
		        if(scope.questionId){
		    	      scope.meanData.getQuestionById(scope.questionId).then(function(res){
		          		scope.filteredQuestions = [res.data];
		          		scope.showAnswer = !scope.showAnswer;
		          });
		        }

				scope.updateQuestionList = function(){
					var begin = (scope.currentPage - 1) * scope.numPerPage;
					var end = begin + scope.numPerPage;
					if(scope.questions){
				  		scope.filteredQuestions = scope.questions.slice(begin, end);
					}
				}

			    scope.$watch('currentPage + numPerPage', scope.updateQuestionList);

			    scope.updateQuestion = function(question, updateQuestion){
					if(typeof updateQuestion !== 'undefined'){
						if(updateQuestion.answer.length > 0){
							question.answer = updateQuestion.answer;
						}
						if(updateQuestion.author){
							if(updateQuestion.author.length > 0){
								question.author = updateQuestion.author;
							}
						}	
					}

					scope.meanData.updateQuestion(question).then(function(res){
						alert(res.data.message);
						question.isUpdateQuestion = false;
					}, function(res){
						alert(res.statusText);
					});
				};

				scope.deleteQuestion = function(question){
					if(confirm("Are you sure to delete this question?")){
						scope.meanData.deleteQuestion(question._id).then(function(res){
							alert(res.data.message);
							scope.getQuestionsByCategory(question.category);
						scope.getQuestionCategory();
						},function(res){
							alert(res.statusText);
						});
					}
				};
      		}
    	}
  	})
})();