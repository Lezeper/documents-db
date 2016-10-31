(function () {
	angular.module('app').directive('listQue', function () {
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

				scope.updateQueList = function(){
					var begin = (scope.currentPage - 1) * scope.numPerPage;
					var end = begin + scope.numPerPage;
					if(scope.questions){
				  		scope.filteredQuestions = scope.questions.slice(begin, end);
					}
				}

			    scope.$watch('currentPage + numPerPage', scope.updateQueList);

			    scope.updateQuestion = function(question, updateQuestion, selRelateds){
			    	if(confirm("Are you sure to update?")){
			    		scope.authentication.currentUser().then(function(res){
				          updateQuestion.author = res.name;
				        });
				        updateQuestion.related = [];
		          		selRelateds.forEach(function(elem){
			            	updateQuestion.related.push(elem);
			          	});
				        
	              		scope.meanData.updateQue(updateQuestion).then(function(res){
							alert(res.data.message);
							// question.answer = updateQuestion.answer;
							question.isUpdateQuestion = false;
						}, function(res){
							alert(res.statusText);
						});
			    	}
				};

				scope.deleteQuestion = function(question){
					if(confirm("Are you sure to delete this question?")){
						scope.meanData.deleteQue(question._id).then(function(res){
							alert(res.data.message);
							scope.getQuesByCategory(question.category);
						},function(res){
							alert(res.statusText);
						});
					}
				};
      		}
    	}
  	})
})();