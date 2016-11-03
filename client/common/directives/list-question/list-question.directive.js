(function () {
	angular.module('app').directive('listQue', ['meanData', '$stateParams','authentication', '$state',
		function (meanData, $stateParams, authentication, $state) {
		return {
			scope: false,
      		restrict: 'E',
      		templateUrl: '/common/directives/list-question/list-question.view.html',
      		link: function(scope, element, attr){

      			scope.numPerPage = 5;

      			scope.questionId = $stateParams.id;
      			scope.subCategory = $stateParams.category;

      			// receive question id
		        if(scope.questionId){
		    	      meanData.getQuestionById(scope.questionId).then(function(res){
		          		scope.filteredQuestions = [res.data];
		          		scope.showAnswer = !scope.showAnswer;
		          });
		        } else {
		        	meanData.getQuesByCategory(scope.subCategory).then(function (data) {
		                scope.questions = data.data;
		                scope.totalItems = data.data.length;
		                scope.currentPage = 1;
		                scope.updateQueList();
		            });
		        }

		        scope.updateQuePage = function(question){
		        	question.isUpdateQuestion=true;
		        	question.showAnswer=true;
		        	// category directive
		        	scope.showCategories(question.group);
		        	scope.categorySetter(question.category);
		        	// related directive
		        	scope.selRelateds=question.related;

		        	scope.questionBackup = angular.copy(question);
		        }

				scope.updateQueList = function(){
					var begin = (scope.currentPage - 1) * scope.numPerPage;
					var end = begin + scope.numPerPage;
					if(scope.questions){
				  		scope.filteredQuestions = scope.questions.slice(begin, end);
					}
				}

			    scope.$watch('currentPage + numPerPage', scope.updateQueList);

			    scope.updateQuestion = function(question, selRelateds){
			    	if(confirm("Are you sure to update?")){
			    		authentication.currentUser().then(function(res){
				          question.author = res.name;
				        });
				        question.related = [];
		          		selRelateds.forEach(function(elem){
			            	question.related.push(elem);
			          	});
				        
	              		meanData.updateQue(question).then(function(res){
							alert(res.data.message);
							question.isUpdateQuestion = false;
						}, function(res){
							alert(res.statusText);
						});
			    	}
				};

				scope.cancelUpdateQue = function(question){
					if(confirm("Are you sure to discards update?")){
						question.isUpdateQuestion=false;
						Object.keys(question).forEach(function(property){
			          		question[property] = scope.questionBackup[property];
			          	});
					}
				}

				scope.deleteQuestion = function(question){
					if(confirm("Are you sure to delete this question?")){
						meanData.deleteQue(question._id).then(function(res){
							alert(res.data.message);
							$state.reload();
						},function(res){
							alert(res.statusText);
						});
					}
				};
      		}
    	}
  	}]);
})();